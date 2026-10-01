import React, { useRef, useState } from "react";
import { EyeOff, Image as ImageIcon } from "lucide-react";
import { sanitizeCommentHtml } from "./sanitizeCommentHtml";

/**
 * Spoiler-on-selection + image/GIF attach.
 *
 * The image is NOT uploaded from here. The composer just holds the chosen
 * File plus a local preview URL, and hands the File to onSubmit. The parent
 * sends it to your backend (multipart), and the backend uploads it to
 * Cloudinary. The blob: URL below is only for the preview thumbnail and is
 * never sent anywhere.
 *
 * onSubmit should return a promise resolving to false on failure so the
 * text isn't wiped when a post fails (anything else counts as success).
 */
export const CommentComposer = ({ onSubmit, placeholder = "Write a comment..." }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [image, setImage] = useState(null); // { file, previewUrl }
  const [posting, setPosting] = useState(false);

  const updateEmptyState = (hasImage = !!image) => {
    const text = editorRef.current?.textContent.trim() || "";
    setIsEmpty(text.length === 0 && !hasImage);
  };

  const applySpoiler = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return;

    const span = document.createElement("span");
    span.className = "spoiler";
    span.style.textDecoration = "underline dashed #b98bff";
    span.style.textUnderlineOffset = "3px";

    range.surroundContents(span);
    selection.removeAllRanges();
    updateEmptyState();
  };

  const handleImagePick = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      e.target.value = "";
      return alert("Please choose an image or GIF file.");
    }
    if (file.size > 8 * 1024 * 1024) {
      e.target.value = "";
      return alert("File must be under 8MB.");
    }

    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setImage({ file, previewUrl: URL.createObjectURL(file) });
    setIsEmpty(false);
    e.target.value = ""; // lets the same file be picked again after removing it
  };

  const removeImage = () => {
    if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
    setImage(null);
    updateEmptyState(false);
  };

  const handlePost = async () => {
    if (posting) return;

    const cleanHtml = sanitizeCommentHtml(editorRef.current?.innerHTML || "");
    const textContent = editorRef.current?.textContent.trim() || "";
    if (!textContent && !image) return;

    setPosting(true);
    try {
      const ok = await onSubmit?.({ html: cleanHtml, imageFile: image?.file || null });
      if (ok !== false) {
        if (editorRef.current) editorRef.current.innerHTML = "";
        if (image?.previewUrl) URL.revokeObjectURL(image.previewUrl);
        setImage(null);
        setIsEmpty(true);
      }
    } finally {
      setPosting(false);
    }
  };

  const disabled = isEmpty || posting;

  return (
    <div className="mb-6">
      <div className="rounded-xl bg-[#1a0f26] border border-[#3d2456] focus-within:ring-1 focus-within:ring-[#8b3fd6] overflow-hidden">
        <div className="relative px-4 pt-3 pb-1">
          {isEmpty && (
            <span className="absolute left-4 top-3 text-[#6b5a80] text-sm pointer-events-none">
              {placeholder}
            </span>
          )}
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={() => updateEmptyState()}
            className="min-h-[24px] max-h-28 overflow-y-auto text-[#e6d9f7] text-sm leading-relaxed outline-none whitespace-pre-wrap break-words"
          />
        </div>

        {image && (
          <div className="px-4 pb-2">
            <div className="relative inline-block">
              <img
                src={image.previewUrl}
                alt="attachment preview"
                className="w-20 h-20 rounded-lg object-cover border border-[#3d2456]"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-black border border-[#3d2456] flex items-center justify-center text-[#c9bcdb] text-[10px] leading-none"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between px-3 py-2 border-t border-[#241834]">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={applySpoiler}
              title="Mark selected text as spoiler"
              className="flex items-center gap-1 h-7 px-2 rounded-md text-xs font-semibold text-[#8a7a9c] active:bg-[#241834] sm:hover:bg-[#241834] sm:hover:text-[#e6d9f7] transition-colors"
            >
              <EyeOff size={13} /> Spoiler
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Add image or GIF"
              className="w-7 h-7 rounded-md flex items-center justify-center text-[#8a7a9c] active:bg-[#241834] sm:hover:bg-[#241834] sm:hover:text-[#e6d9f7] transition-colors"
            >
              <ImageIcon size={14} />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImagePick} className="hidden" />
          </div>

          <button
            type="button"
            onClick={handlePost}
            disabled={disabled}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
              disabled
                ? "bg-[#241834] text-[#4a4152] cursor-not-allowed"
                : "bg-[#8b3fd6] text-white active:bg-[#7a3fd6] sm:hover:bg-[#7a3fd6]"
            }`}
          >
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};