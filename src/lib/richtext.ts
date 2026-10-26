import "server-only";
import sanitizeHtml from "sanitize-html";

// What the admin editor can produce: headings, paragraphs, bold, underline,
// links, lists, quotes and alignment. Anything else (scripts, styles, other
// tags) is dropped, so stored text is safe to put on the page.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ["h2", "h3", "p", "br", "strong", "b", "u", "s", "a", "ul", "ol", "li", "blockquote"],
  allowedAttributes: { a: ["href", "target", "rel"] },
  allowedClasses: { "*": ["ql-align-center", "ql-align-right", "ql-align-justify"] },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  transformTags: { a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noreferrer" }) },
};

export function cleanHtml(html: string) {
  // Quill writes every space as a non-breaking one, which stops lines wrapping.
  return sanitizeHtml(html.replace(/&nbsp;|\u00a0/g, " "), OPTIONS).trim();
}

// Plain text for previews and descriptions.
export function excerpt(html: string, length = 160) {
  // Block ends become spaces so paragraphs do not run together.
  const spaced = html.replace(/<\/(p|h2|h3|li|blockquote)>|<br\s*\/?>/gi, "$& ");
  const text = sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
  if (text.length <= length) return text;
  // Cut at the limit, dropping a word only when the cut falls inside it.
  const cut = text.slice(0, length);
  return `${/\s/.test(text[length]) ? cut : cut.replace(/\s+\S*$/, "")}…`;
}

// True when the editor holds no words (Quill leaves "<p><br></p>" when empty).
export const isEmptyHtml = (html: string) => excerpt(html, 1).length === 0;
