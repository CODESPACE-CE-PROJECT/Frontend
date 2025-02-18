import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { EditorState } from "lexical";
import { useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';

export function MyOnChangePlugin({ onChange }: { onChange: (val: EditorState) => void }) {
  const [editor] = useLexicalComposerContext();

  const debouncedOnChange = useDebouncedCallback((editorState: EditorState) => {
    onChange(editorState);
  }, 1000); 

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      debouncedOnChange(editorState);
    });
  }, [editor, debouncedOnChange]);

  return null;
}