import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import {
    decodeHtmlEntities,
    htmlTagPattern,
    normalizeEditorContent,
} from "@/utils/editorContent";

const exitEmptyListItem = Extension.create({
    name: "exitEmptyListItem",

    addKeyboardShortcuts() {
        return {
            Enter: () => {
                const { $from, empty } = this.editor.state.selection;
                const isEmptyListItem =
                    empty &&
                    this.editor.isActive("listItem") &&
                    $from.parent.type.name === "paragraph" &&
                    $from.parent.textContent.length === 0;

                if (!isEmptyListItem) return false;

                return this.editor.commands.liftListItem("listItem");
            },
        };
    },
});

const interpretPastedHtmlText = Extension.create({
    name: "interpretPastedHtmlText",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                props: {
                    handlePaste: (_view, event) => {
                        const plainText = event.clipboardData?.getData("text/plain");

                        if (
                            !plainText ||
                            !htmlTagPattern.test(decodeHtmlEntities(plainText))
                        ) {
                            return false;
                        }

                        event.preventDefault();
                        this.editor.commands.insertContent(
                            normalizeEditorContent(plainText)
                        );
                        return true;
                    },
                },
            }),
        ];
    },
});

const exitHeadingOnEnter = Extension.create({
    name: "exitHeadingOnEnter",

    addKeyboardShortcuts() {
        return {
            Enter: () => {
                const { empty, $from } = this.editor.state.selection;

                if (!empty || $from.parent.type.name !== "heading") return false;

                return this.editor.chain().splitBlock().setParagraph().run();
            },
        };
    },
});

export const editorExtensions = [
    StarterKit,
    TextStyleKit,
    exitEmptyListItem,
    interpretPastedHtmlText,
    exitHeadingOnEnter,
];
