import { useState, useContext } from "react";
import { assets } from "../assets/fronted/assets.js";
import {
  format,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
} from "date-fns";
import axios from "axios";
import { MangaCon } from "../Context/MangaContex.jsx";
import { toast } from "react-toastify";

const pluralize = (value, unit) => `${value} ${unit}${value !== 1 ? "s" : ""} ago`;

function Comment({ comment, depth = 0, mangaId, setRefreshComments }) {
  const [showReply, setShowReply] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replytText, setReplyText] = useState("");
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const [isEditingCommentId, setIsEditingCommentId] = useState(null);

  const { backendUrl, token } = useContext(MangaCon);

  const getDate = (releaseDate) => {
    if (!releaseDate) return "";
    const release = new Date(releaseDate);
    const now = new Date();

    const seconds = differenceInSeconds(now, release);
    const minutes = differenceInMinutes(now, release);
    const hours = differenceInHours(now, release);
    const days = differenceInDays(now, release);
    const weeks = differenceInWeeks(now, release);

    if (seconds < 60) return pluralize(seconds, "sec");
    if (minutes < 60) return pluralize(minutes, "min");
    if (hours < 24) return pluralize(hours, "hour");
    if (days < 7) return pluralize(days, "day");
    if (weeks < 4) return pluralize(weeks, "week");

    return format(release, "d MMM yyyy");
  };

  const handleReplyClick = () => {
    setShowReply(!showReply);
    setParentCommentId(comment._id);
  };

  const handleReply = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error("Login to reply");
    }

    if (!replytText.trim()) {
      return toast.error("Reply cannot be empty");
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/comment/add",
        {
          text: replytText,
          contentTypeId: mangaId,
          parentCommentId: parentCommentId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setReplyText("");
        setShowReply(false);
        setRefreshComments((prev) => !prev);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleCommentEdit = async () => {
    try {
      const response = await axios.patch(
        backendUrl + `/api/comment/upate/${isEditingCommentId}`,
        {
          text: updatedText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditingCommentId(null);
        setRefreshComments((prev) => !prev);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const handleDeleteComment = async () => {
    try {
      const response = await axios.delete(
        backendUrl + `/api/comment/delete/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setRefreshComments((prev) => !prev);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const visibleReplies = showAllReplies
    ? comment.replies
    : comment.replies.slice(0, 1);

  return (
    <div className="mt-4">
      <div className="flex gap-2 sm:gap-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#241834] border border-[#3d2456] flex items-center justify-center text-white font-semibold overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={
                comment.user.profileImg
                  ? comment.user.profileImg
                  : assets.luffy
              }
              alt="profile"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bg-[#1a0f26] border border-[#3d2456] rounded-xl p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm text-white break-words">
                {comment.user.name}
              </h4>

              <div className="flex items-center gap-2 text-xs text-[#6b5a80] flex-wrap">
                <span>{getDate(comment.createdAt)}</span>
                {comment.isEdited && (
                  <span className="italic">(edited)</span>
                )}
              </div>
            </div>

            <div className="text-sm text-[#c9bcdb] leading-relaxed break-words">
              {isEditingCommentId === comment._id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="bg-[#0f0a14] border border-[#3d2456] rounded-lg p-2 outline-none focus:ring-1 focus:ring-[#8b3fd6] resize-none w-full text-[#e6d9f7]"
                    rows={3}
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleCommentEdit}
                      className="bg-[#8b3fd6] text-white px-3 py-1.5 rounded-lg text-xs font-semibold active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6] transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingCommentId(null);
                        setUpdatedText("");
                      }}
                      className="border border-[#3d2456] text-[#c9bcdb] px-3 py-1.5 rounded-lg text-xs font-semibold active:bg-[#241834] sm:hover:bg-[#241834] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                comment.text
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3">
              <button className="text-xs font-medium text-[#8a7a9c] active:text-white sm:hover:text-white transition-colors">
                Like
              </button>
              <button
                onClick={handleReplyClick}
                className="text-xs font-medium text-[#8a7a9c] active:text-white sm:hover:text-white transition-colors"
              >
                Reply
              </button>
              <button
                onClick={() => {
                  setIsEditingCommentId(comment._id);
                  setUpdatedText(comment.text);
                }}
                className="text-xs font-medium text-[#8a7a9c] active:text-white sm:hover:text-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteComment}
                className="text-xs font-medium text-[#e0708a] active:text-[#ff8fa8] sm:hover:text-[#ff8fa8] transition-colors"
              >
                Delete
              </button>
            </div>

            {showReply && (
              <div className="mt-4">
                <textarea
                  rows={3}
                  value={replytText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-[#0f0a14] border border-[#3d2456] rounded-lg p-2.5 text-sm text-[#e6d9f7] placeholder-[#6b5a80] outline-none focus:ring-1 focus:ring-[#8b3fd6] resize-none"
                />
                <button
                  onClick={handleReply}
                  className="mt-2 bg-[#8b3fd6] text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6] transition-colors"
                >
                  Post Reply
                </button>
              </div>
            )}
          </div>

          {comment.replies.length > 0 && (
            <div className="mt-3 pl-3 border-l border-[#3d2456]">
              {visibleReplies.map((reply) => (
                <Comment
                  key={reply._id}
                  comment={reply}
                  depth={depth + 1}
                  mangaId={mangaId}
                  setRefreshComments={setRefreshComments}
                />
              ))}
              {comment.replies.length > 1 && (
                <button
                  onClick={() => setShowAllReplies(!showAllReplies)}
                  className="text-xs sm:text-sm font-medium text-[#b98bff] active:text-white sm:hover:text-white transition-colors mt-3"
                >
                  {showAllReplies
                    ? "Show less replies"
                    : `Show more replies (${comment.replies.length - 1})`}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;