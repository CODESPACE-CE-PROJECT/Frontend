import {
     Redo,
     Undo,
     Code2,
     BoldIcon,
     UnderlineIcon,
     StrikethroughIcon,
     ItalicIcon,
} from "lucide-react";
import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
     $getSelection,
     $isRangeSelection,
     CAN_REDO_COMMAND,
     CAN_UNDO_COMMAND,
     COMMAND_PRIORITY_CRITICAL,
     FORMAT_TEXT_COMMAND,
     REDO_COMMAND,
     SELECTION_CHANGE_COMMAND,
     UNDO_COMMAND
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { registerCodeHighlighting } from '@lexical/code';
import { Button } from '@/components/LexicalEditor/ui/Button';

interface Props {
     isFocus: boolean
}

export const ReplyToolbarPlugin:React.FC<Props> = ({isFocus}) => {
     const [editor] = useLexicalComposerContext();
     const [activeEditor, setActiveEditor] = useState(editor)
     const [isBold, setIsBold] = useState(false)
     const [isItalic, setIsItalic] = useState(false)
     const [isUnderline, setIsUnderline] = useState(false)
     const [isStrikethrough, setIsStrikethrough] = useState(false)
     const [isCode, setIsCode] = useState(false)
     const [canUndo, setCanUndo] = useState(false)
     const [canRedo, setCanRedo] = useState(false)
     const [isEditable, setIsEditable] = useState(() => editor.isEditable())

     const $updateToolbar = useCallback(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {

               // Upate Text Format
               setIsBold(selection.hasFormat("bold"));
               setIsItalic(selection.hasFormat("italic"));
               setIsUnderline(selection.hasFormat("underline"));
               setIsStrikethrough(selection.hasFormat("strikethrough"));
               setIsCode(selection.hasFormat("code"));
          }
     }, [])

     useEffect(() => {
          return editor.registerCommand(
               SELECTION_CHANGE_COMMAND,
               (_payload, newEditor) => {
                    setActiveEditor(newEditor);
                    $updateToolbar();
                    return false;
               },
               COMMAND_PRIORITY_CRITICAL
          );
     }, [activeEditor, editor, $updateToolbar]);

     useEffect(() => {
          activeEditor.getEditorState().read(() => {
               $updateToolbar();
          });
     }, [activeEditor, editor, $updateToolbar]);

     useEffect(() => {
          return mergeRegister(
               editor.registerEditableListener((editable) => {
                    setIsEditable(editable);
               }),
               activeEditor.registerUpdateListener(({ editorState }) => {
                    editorState.read(() => {
                         $updateToolbar();
                    });
               }),
               activeEditor.registerCommand<boolean>(
                    CAN_UNDO_COMMAND,
                    (payload) => {
                         setCanUndo(payload);
                         return false;
                    },
                    COMMAND_PRIORITY_CRITICAL
               ),
               activeEditor.registerCommand<boolean>(
                    CAN_REDO_COMMAND,
                    (payload) => {
                         setCanRedo(payload);
                         return false;
                    },
                    COMMAND_PRIORITY_CRITICAL
               ),
               registerCodeHighlighting(editor)
          );
     }, [$updateToolbar, activeEditor, editor]);

     return isFocus && (<div className="flex flex-wrap items-center px-2 py-2 gap-x-3">
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button
                    disabled={!canUndo}
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
               >
                    <Undo className='text-xl' />
               </Button>
               <Button
                    disabled={!canRedo}
                    onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
               >
                    <Redo className='text-xl' />
               </Button>
          </div>

          {/* Font format */}
          <div className='flex flex-row items-center gap-x-2 h-10'>
               <Button
                    isActive={isBold}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                    }>
                    <BoldIcon className='text-xl' />
               </Button>

               <Button
                    isActive={isItalic}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
               >
                    <ItalicIcon className='text-xl' />
               </Button>

               <Button
                    isActive={isUnderline}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
               >
                    <UnderlineIcon className='text-xl' />
               </Button>

               <Button
                    isActive={isStrikethrough}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
               >
                    <StrikethroughIcon className='text-xl' />
               </Button>

               <Button
                    isActive={isCode}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
               >
                    <Code2 className='text-xl' />
               </Button>
          </div>
     </div>
     )
}