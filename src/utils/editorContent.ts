import type { JSONContent } from "@tiptap/core";
import type { PostDescription } from "@/types/editor";

export const emptyEditorContent: JSONContent = {
    type: "doc",
    content: [{ type: "paragraph" }],
};

export const htmlTagPattern =
    /<\/?(h[1-6]|p|ul|ol|li|blockquote|pre|code|strong|em|s|br|hr)\b[^>]*>/i;

export const decodeHtmlEntities = (value: string) =>
    value
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");

const stripHtmlCodeFence = (value: string) =>
    value.replace(/^```(?:html)?\s*/i, "").replace(/\s*```$/i, "");

const unwrapCodeBlock = (value: string) => {
    const match = value.match(
        /^<pre><code(?:\s+class="[^"]*")?>([\s\S]*)<\/code><\/pre>$/i
    );

    return match?.[1] ?? value;
};

const unwrapHtmlCodeBlocks = (value: string) =>
    value.replace(
        /<pre><code(?:\s+class="[^"]*")?>([\s\S]*?)<\/code><\/pre>/gi,
        (codeBlock, innerContent: string) => {
            const decoded = decodeHtmlEntities(innerContent);

            return htmlTagPattern.test(decoded) ? decoded : codeBlock;
        }
    );

const isJsonContent = (value: unknown): value is JSONContent =>
    typeof value === "object" && value !== null && "type" in value;

export const normalizeEditorContent = (
    value?: PostDescription | null
): JSONContent | string => {
    if (isJsonContent(value)) {
        return value;
    }

    if (typeof value !== "string") {
        return emptyEditorContent;
    }

    const raw = value.trim();

    if (!raw) return emptyEditorContent;

    if (raw.startsWith("{") || raw.startsWith("[")) {
        try {
            const parsed = JSON.parse(raw) as unknown;

            if (isJsonContent(parsed)) {
                return parsed;
            }
        } catch {
            // Keep handling it as legacy text or HTML content.
        }
    }

    const withoutFence = stripHtmlCodeFence(raw);
    const withoutCodeBlock = unwrapCodeBlock(withoutFence);
    const withoutHtmlCodeBlocks = unwrapHtmlCodeBlocks(withoutCodeBlock);
    const decoded = decodeHtmlEntities(withoutHtmlCodeBlocks);

    return htmlTagPattern.test(decoded) ? decoded : raw;
};

export const createDocumentFromText = (value: string): JSONContent => {
    const text = value.trim();

    if (!text) {
        return emptyEditorContent;
    }

    return {
        type: "doc",
        content: [
            {
                type: "paragraph",
                content: [{ type: "text", text }],
            },
        ],
    };
};

export const serializeDescription = (value?: PostDescription | null) =>
    JSON.stringify(value ?? null);
