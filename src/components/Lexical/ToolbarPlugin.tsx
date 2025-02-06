import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useRef, useState } from "react";

// MUI Icons
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

function Divider() {
  return <div className="w-px bg-gray-200 mx-2" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <div ref={toolbarRef} className="flex bg-white p-2 rounded-t-lg mb-px">
      <button
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="flex items-center justify-center p-2 rounded-lg mr-1 bg-transparent disabled:cursor-not-allowed hover:bg-gray-200"
        aria-label="Undo"
      >
        <UndoIcon className="text-gray-600" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="flex items-center justify-center p-2 rounded-lg bg-transparent hover:bg-gray-200 disabled:cursor-not-allowed"
        aria-label="Redo"
      >
        <RedoIcon className="text-gray-600" />
      </button>
      <Divider />
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
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={`flex items-center justify-center p-2 rounded-lg ${
          isStrikethrough ? "bg-blue-100" : "hover:bg-gray-200"
        }`}
        aria-label="Strikethrough"
      >
        <StrikethroughSIcon className="text-gray-600" />
      </button>
      <Divider />
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        className="flex items-center justify-center p-2 rounded-lg mr-1 hover:bg-gray-200"
        aria-label="Left Align"
      >
        <FormatAlignLeftIcon className="text-gray-600" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        className="flex items-center justify-center p-2 rounded-lg mr-1 hover:bg-gray-200"
        aria-label="Center Align"
      >
        <FormatAlignCenterIcon className="text-gray-600" />
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        className="flex items-center justify-center p-2 rounded-lg mr-1 hover:bg-gray-200"
        aria-label="Right Align"
      >
        <FormatAlignRightIcon className="text-gray-600" />
      </button>
      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-200"
        aria-label="Justify Align"
      >
        <FormatAlignJustifyIcon className="text-gray-600" />
      </button>
    </div>
  );
}
