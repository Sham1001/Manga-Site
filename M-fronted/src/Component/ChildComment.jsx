import { useState, useContext } from "react";
import { assets } from "../assets/fronted/assets.js";
import {
  format,
  differenceInDays,
  formatDistanceToNow,
} from "date-fns";
import axios from "axios";
import { MangaCon } from "../Context/MangaContex.jsx";
import { toast } from "react-toastify";

function Comment({ comment, depth = 0, mangaId, setRefreshComments }) {
  const [showReply, setShowReply] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);
  const [replytText, setReplyText] = useState("");
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const [isEditingCommentId, setIsEditingCommentId] = useState(null);

  const { backendUrl, token } = useContext(MangaCon);

  const getDate = (releaseDate) => {
    const release = new Date(releaseDate);
    const inDays = differenceInDays(new Date(), release);
    const getDateDiff = formatDistanceToNow(release, {
      addSuffix: true,
    });
    return inDays > 7 ? format(release, "d MMM yyyy") : getDateDiff;
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
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold overflow-hidden flex-shrink-0">
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
          <div className="bg-white border border-gray-300 rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="font-semibold text-sm text-black break-words">
                {comment.user.name}
              </h4>

              <div className="flex items-center gap-2 text-xs text-gray-500 flex-wrap">
                <span>{getDate(comment.createdAt)}</span>
                {comment.isEdited && (
                  <span className="italic">(edited)</span>
                )}
              </div>
            </div>

            <div className="text-sm text-black leading-relaxed break-words">
              {isEditingCommentId === comment._id ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={updatedText}
                    onChange={(e) => setUpdatedText(e.target.value)}
                    className="border border-gray-300 rounded-lg p-2 outline-none resize-none w-full"
                    rows={3}
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={handleCommentEdit}
                      className="bg-black text-white px-3 py-1 rounded-lg text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingCommentId(null);
                        setUpdatedText("");
                      }}
                      className="border border-gray-300 px-3 py-1 rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                comment.text
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <button className="text-xs text-gray-500 hover:text-black transition">
                Like
              </button>
              <button
                onClick={handleReplyClick}
                className="text-xs text-gray-500 hover:text-black transition"
              >
                Reply
              </button>
              <button
                onClick={() => {
                  setIsEditingCommentId(comment._id);
                  setUpdatedText(comment.text);
                }}
                className="text-xs text-gray-500 hover:text-black transition"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteComment}
                className="text-xs text-red-400 hover:text-red-600 transition"
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
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                />
                <button
                  onClick={handleReply}
                  className="mt-2 bg-black text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm"
                >
                  Post Reply
                </button>
              </div>
            )}
          </div>

          {comment.replies.length > 0 && (
            <div className="mt-3 pl-3 border-l border-gray-300">
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
                  className="text-xs sm:text-sm text-gray-500 hover:text-black mt-3"
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