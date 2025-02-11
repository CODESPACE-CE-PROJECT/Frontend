import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

// MUI Icons
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

function Divider() {
  return <div className="w-px bg-gray-200 mx-2" />;
}

export default function ReplyToolbar() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
    );
  }, [editor, $updateToolbar]);

  return (
    <div ref={toolbarRef} className="flex bg-white p-2 rounded-lg mb-px w-full">
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={`flex items-center justify-center p-2 rounded-lg mr-1 ${
          isBold ? "bg-blue-100" : "hover:bg-gray-200"
        }`}
        aria-label="Bold"
      >
        <FormatBoldIcon className="text-gray-600" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={`flex items-center justify-center p-2 rounded-lg mr-1 ${
          isItalic ? "bg-blue-100" : "hover:bg-gray-200"
        }`}
        aria-label="Italic"
      >
        <FormatItalicIcon className="text-gray-600" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={`flex items-center justify-center p-2 rounded-lg mr-1 ${
          isUnderline ? "bg-blue-100" : "hover:bg-gray-200"
        }`}
        aria-label="Underline"
      >
        <FormatUnderlinedIcon className="text-gray-600" />
      </button>
      {/* <Divider /> */}
    </div>
  );
}
