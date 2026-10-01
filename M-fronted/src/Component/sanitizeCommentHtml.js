/**
 * Whitelist sanitizer, reduced scope: only spoiler spans + line breaks
 * survive. Same walk-the-tree approach as before — anything not on the
 * list gets unwrapped (text kept, tag dropped), never silently deleted.
 */
const ALLOWED_TAGS = new Set(["SPAN", "BR"]);

export function sanitizeCommentHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const clean = document.createElement("div");

  function walk(node, parent) {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        parent.appendChild(document.createTextNode(child.textContent));
        continue;
      }
      if (child.nodeType !== Node.ELEMENT_NODE) continue;

      if (!ALLOWED_TAGS.has(child.tagName)) {
        walk(child, parent);
        continue;
      }

      let el;
      if (child.tagName === "SPAN" && child.classList.contains("spoiler")) {
        el = document.createElement("span");
        el.className = "spoiler";
      } else if (child.tagName === "BR") {
        el = document.createElement("br");
      } else {
        walk(child, parent); // a span without the spoiler class — unwrap it
        continue;
      }

      parent.appendChild(el);
      walk(child, el);
    }
  }

  walk(doc.body, clean);
  return clean.innerHTML;
}

/**
 * Server-side (Node) — the ACTUAL security boundary, run this in your
 * POST /add route before saving, not just the client-side pass above.
 *
 * npm i sanitize-html
 *
 * const sanitizeHtml = require('sanitize-html');
 * function sanitizeCommentHtmlServer(html) {
 *   return sanitizeHtml(html, {
 *     allowedTags: ['span', 'br'],
 *     allowedAttributes: { span: ['class'] },
 *     allowedClasses: { span: ['spoiler'] },
 *   });
 * }
 */