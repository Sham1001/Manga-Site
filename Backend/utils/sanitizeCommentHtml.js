// npm i sanitize-html
import sanitizeHtml from "sanitize-html"

/**
 * The actual security boundary. Your current addComment/updateComment save
 * req.body.text straight to the DB — if a request skips your frontend and
 * POSTs a <script> tag directly to /api/comment/add, it gets stored as-is
 * and runs in every other visitor's browser the moment that comment renders.
 * This whitelists only the spoiler span + line breaks; everything else
 * (script tags, onclick attributes, iframes, anything) is stripped.
 */
export function sanitizeCommentHtml(html) {
    return sanitizeHtml(html || "", {
        allowedTags: ["span", "br"],
        allowedAttributes: {
            span: ["class"]
        },
        allowedClasses: {
            span: ["spoiler"]
        }
    })
}