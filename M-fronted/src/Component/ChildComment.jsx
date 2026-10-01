import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { MangaCon } from "../Context/MangaContex.jsx";
import { CommentComposer } from "./CommentComposer.jsx";

const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
  const units = [
    ["y", 31536000], ["mo", 2592000], ["w", 604800],
    ["d", 86400], ["h", 3600], ["m", 60],
  ];
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return "just now";
};

/**
 * comment.text holds sanitized HTML (spoiler spans only — see
 * sanitizeCommentHtml on both client and server). Rendered via
 * dangerouslySetInnerHTML since it's already been through the server-side
 * sanitizer in commentController.js before it was ever saved.
 */
const CommentBody = ({ text }) => {
  const ref = useRef(null);
  const handleClick = (e) => {
    const spoiler = e.target.closest(".spoiler");
    if (spoiler && ref.current?.contains(spoiler)) spoiler.classList.toggle("revealed");
  };
  return (
    <div
      ref={ref}
      onClick={handleClick}
      className="comment-body text-[#c9bcdb] text-sm leading-relaxed mt-1 mb-2"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

const Comment = ({ comment, depth = 0, mangaId, setRefreshComments }) => {
  const { backendUrl, token, currentUserId } = useContext(MangaCon);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(depth === 0);

  const userVote = comment.likes?.includes(currentUserId)
    ? "like"
    : comment.dislikes?.includes(currentUserId)
      ? "dislike"
      : null;

  // comment.user is populated (see getComments' .populate("user", "name profileImg")),
  // so comment.user._id is the author's real id — compare as strings since
  // currentUserId is a plain string decoded from the JWT.
  const isOwnComment = comment.user?._id && String(comment.user._id) === currentUserId;

  const replies = comment.replies || [];

  const handleVote = async (type) => {
    if (!token) return toast.error("Login to vote");
    try {
      const response = await axios.post(
        `${backendUrl}/api/comment/vote/${comment._id}`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setRefreshComments((prev) => !prev);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    if (!token) return toast.error("Login to delete");
    if (!window.confirm("Delete this comment?")) return;

    try {
      const response = await axios.delete(
        `${backendUrl}/api/comment/delete/${comment._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setRefreshComments((prev) => !prev);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  // const submitReply = async ({ html, imageUrl }) => {
  //   if (!token) return toast.error("Login to reply");
  //   const textContent = html?.replace(/<[^>]*>/g, "").trim();
  //   if (!textContent && !imageUrl) return;

  //   try {
  //     const response = await axios.post(
  //       `${backendUrl}/api/comment/add`,
  //       { text: html, imageUrl, contentTypeId: mangaId, parentCommentId: comment._id },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     if (response.data.success) {
  //       setShowReplyBox(false);
  //       setShowReplies(true);
  //       setRefreshComments((prev) => !prev);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

// ChildComment.jsx
const submitReply = async ({ html, imageFile }) => {
  if (!token) return toast.error("Login to reply");

  const formData = new FormData();
  formData.append("text", html);
  formData.append("contentTypeId", mangaId);
  formData.append("parentCommentId", comment._id);
  if (imageFile) formData.append("image", imageFile);

  try {
    const response = await axios.post(`${backendUrl}/api/comment/add`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.data.success) {
      setShowReplyBox(false);
      setShowReplies(true);
      setRefreshComments((prev) => !prev);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  return (
    <div className={depth > 0 ? "pl-3.5 border-l-2 border-[#241834]" : ""}>
      <div className="flex gap-2.5">
        <img
          className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-full flex-shrink-0 bg-[#1a0f26] border border-[#3d2456]"
          src={comment.user?.profileImg}
          alt=""
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[#e6d9f7] text-sm font-semibold">{comment.user?.name}</span>
            <span className="text-[#6b5a80] text-xs">{timeAgo(comment.createdAt)}</span>
            {comment.isEdited && <span className="text-[#6b5a80] text-xs italic">(edited)</span>}
          </div>

          <CommentBody text={comment.text} />

          {comment.imageUrl && (
            <img
              src={comment.imageUrl}
              alt="comment attachment"
              className="max-w-[240px] rounded-lg border border-[#3d2456] mt-1 mb-2"
            />
          )}

          {/*
            Deleted comments (isDeleted, text becomes "[deleted]" server-side)
            keep their position so reply threads don't collapse, but lose
            their action row — nothing left to vote on, reply to a ghost, or
            delete twice.
          */}
          {!comment.isDeleted && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleVote("like")}
                  className={`flex items-center gap-1 text-xs ${userVote === "like" ? "text-[#b98bff]" : "text-[#8a7a9c]"}`}
                >
                  <ThumbsUp size={14} className={userVote === "like" ? "fill-[#b98bff]" : ""} />
                  {comment.likes?.length || 0}
                </button>
                <button
                  onClick={() => handleVote("dislike")}
                  className={`flex items-center gap-1 text-xs ${userVote === "dislike" ? "text-[#e08a8a]" : "text-[#8a7a9c]"}`}
                >
                  <ThumbsDown size={14} className={userVote === "dislike" ? "fill-[#e08a8a]" : ""} />
                  {comment.dislikes?.length || 0}
                </button>
              </div>

              <button onClick={() => setShowReplyBox((v) => !v)} className="text-xs text-[#8a7a9c]">
                Reply
              </button>

              {replies.length > 0 && (
                <button onClick={() => setShowReplies((v) => !v)} className="flex items-center gap-1 text-xs text-[#8a7a9c]">
                  {showReplies ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </button>
              )}

              {isOwnComment && (
                <button
                  onClick={handleDelete}
                  className="ml-auto flex items-center gap-1 text-xs text-[#8a7a9c] active:text-[#e08a8a] sm:hover:text-[#e08a8a] transition-colors"
                  title="Delete comment"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          )}

          {showReplyBox && (
            <div className="mt-2.5">
              <CommentComposer
                onSubmit={submitReply}
                placeholder={`Reply to ${comment.user?.name}...`}
              />
            </div>
          )}
        </div>
      </div>

      {showReplies && replies.length > 0 && (
        <div className="mt-2.5 flex flex-col gap-2.5">
          {replies.map((reply) => (
            <Comment
              key={reply._id}
              comment={reply}
              depth={depth + 1}
              mangaId={mangaId}
              setRefreshComments={setRefreshComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;