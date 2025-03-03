import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot, $createParagraphNode } from "lexical";
import { forwardRef, useImperativeHandle } from "react";

export const ClearEditorPlugin = forwardRef((_, ref) => {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    clearEditor: () => {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        root.append($createParagraphNode()); // Ensure editor is not empty
      });
    },
  }));

  return null;
});

ClearEditorPlugin.displayName = "ClearEditorPlugin";