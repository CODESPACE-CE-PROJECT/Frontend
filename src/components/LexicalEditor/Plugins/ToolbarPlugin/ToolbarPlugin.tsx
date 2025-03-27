import {
     Redo,
     Undo,
     Heading1,
     Heading2,
     Heading3,
     Pilcrow,
     List,
     ListOrderedIcon,
     SquareCheck,
     Quote,
     SquareDashedBottomCode,
     Code2,
     BoldIcon,
     UnderlineIcon,
     StrikethroughIcon,
     ItalicIcon,
} from "lucide-react";
import {
     CiTextAlignLeft,
     CiTextAlignCenter,
     CiTextAlignRight,
     CiTextAlignJustify,
} from "react-icons/ci";
import { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
     $getNodeByKey,
     $getSelection,
     $isElementNode,
     $isRangeSelection,
     $isRootOrShadowRoot,
     CAN_REDO_COMMAND,
     CAN_UNDO_COMMAND,
     COMMAND_PRIORITY_CRITICAL,
     ElementFormatType,
     FORMAT_ELEMENT_COMMAND,
     FORMAT_TEXT_COMMAND,
     NodeKey,
     REDO_COMMAND,
     SELECTION_CHANGE_COMMAND,
     UNDO_COMMAND
} from 'lexical';
import { $findMatchingParent, $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { getSelectedNode } from '@/components/LexicalEditor/Plugins/utils';
import { $isListNode, ListNode } from '@lexical/list';
import { $isCodeNode, CODE_LANGUAGE_MAP, registerCodeHighlighting } from '@lexical/code';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { blockTypeToBlockName, rootTypeToRootName } from '../type';
import { FontSizePlugin } from '@/components/LexicalEditor/Plugins/FontSizePlugin/FontSizePlugin';
import { Button } from '@/components/LexicalEditor/ui/Button';
import { BlockFormatDropDown } from '@/components/LexicalEditor/Plugins/ToolbarPlugin/BlockFormatDropDown';
import CodeBlockPlugin from '@/components/LexicalEditor/Plugins/CodeBlockPlugin/CodeBlockPlugin';
import { ImagePlugin } from "@/components/LexicalEditor/Plugins/ImagePlugin/ImagePlugin";
import { YoututbePlugin } from "@/components/LexicalEditor/Plugins/YoutubePlugin/YoutubePlugin";
import { EquationPlugin } from "@/components/LexicalEditor/Plugins/EquationPlugin/EquationPlugin";
import { FilePlugin } from "@/components/LexicalEditor/Plugins/FilePlugin/FilePlugin";

export const getIcon = ({
     blockType
}: { blockType: keyof typeof blockTypeToBlockName | string }) => {
     switch (blockType) {
          case "paragraph":
               return <Pilcrow className="w-5 h-5" />;
          case "h1":
               return <Heading1 className="w-5 h-5" />;
          case "h2":
               return <Heading2 className="w-5 h-5" />;
          case "h3":
               return <Heading3 className="w-5 h-5" />;
          case "bullet":
               return <List className="w-5 h-5" />;
          case "list":
               return <List className="w-5 h-5" />;
          case "number":
               return <ListOrderedIcon className="w-5 h-5" />;
          case "check":
               return <SquareCheck className="w-5 h-5" />;
          case "quote":
               return <Quote className="w-5 h-5" />;
          case "code":
               return <SquareDashedBottomCode className="w-5 h-5" />;
          default:
               return <Pilcrow className="w-5 h-5" />
     }
}

export const ToolbarPlugin = () => {
     const [editor] = useLexicalComposerContext();
     const [activeEditor, setActiveEditor] = useState(editor)
     const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph")
     const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>("root")
     const [selectedElementKey, setSelectElementKey] = useState<NodeKey | null>(null);

     const [fontSize, setFontSize] = useState<string>("15px")
     const [elementFormat, setElementFormat] = useState<ElementFormatType>("left")
     const [isBold, setIsBold] = useState(false)
     const [isItalic, setIsItalic] = useState(false)
     const [isUnderline, setIsUnderline] = useState(false)
     const [isStrikethrough, setIsStrikethrough] = useState(false)
     const [isCode, setIsCode] = useState(false)
     const [canUndo, setCanUndo] = useState(false)
     const [canRedo, setCanRedo] = useState(false)
     const [codeLanguage, setCodeLanguage] = useState<string>("python")
     const [isEditable, setIsEditable] = useState(() => editor.isEditable())

     const $updateToolbar = useCallback(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
               const anchorNode = selection.anchor.getNode()
               let element = anchorNode.getKey() === "root"
                    ? anchorNode
                    : $findMatchingParent(anchorNode, (e) => {
                         const parent = e.getParent()
                         return parent !== null && $isRootOrShadowRoot(parent)
                    })
               if (element === null) {
                    element = anchorNode.getTopLevelElementOrThrow()
               }

               const elementKey = element.getKey()
               const elementDOM = activeEditor.getElementByKey(elementKey)

               // Upate Text Format
               setIsBold(selection.hasFormat("bold"));
               setIsItalic(selection.hasFormat("italic"));
               setIsUnderline(selection.hasFormat("underline"));
               setIsStrikethrough(selection.hasFormat("strikethrough"));
               setIsCode(selection.hasFormat("code"));

               // Update Links
               const node = getSelectedNode(selection)
               const parent = node.getParent()

               if (elementDOM !== null) {
                    setSelectElementKey(elementKey)
                    if ($isListNode(element)) {
                         const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)

                         const type = parentList ? parentList.getListType() : element.getListType()
                         setBlockType(type)
                    } else {
                         const type = $isHeadingNode(element) ? element.getTag() : element.getType()
                         if (type in blockTypeToBlockName) {
                              setBlockType(type as keyof typeof blockTypeToBlockName)
                         }
                         if ($isCodeNode(element)) {
                              const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
                              setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '')
                              return;
                         }
                    }
               }
               let matchingParent;
               if ($isListNode(parent)) {
                    matchingParent = $findMatchingParent(node, (parentNode) => $isElementNode(parentNode) && !parentNode.isInline())
               }

               setElementFormat(
                    $isElementNode(matchingParent)
                         ? matchingParent.getFormatType()
                         : $isElementNode(node)
                              ? node.getFormatType()
                              : parent?.getFormatType() || 'left'
               );
               if ($isRangeSelection(selection)) {
                    setFontSize(
                         $getSelectionStyleValueForProperty(selection, "font-size", "15px")
                    )
               }
          }
     }, [activeEditor])

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

     const onCodeLanguageSelect = useCallback(
          (value: string) => {
               activeEditor.update(() => {
                    if (selectedElementKey !== null) {
                         const node = $getNodeByKey(selectedElementKey);
                         if ($isCodeNode(node)) {
                              node.setLanguage(value);
                         }
                    }
               });
          },
          [activeEditor, selectedElementKey]
     );

     return (<div className="flex flex-wrap items-center border-b-[1px] border-b-gray-600 px-2 py-2 gap-x-3">
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

          {/* block control */}
          <div className='flex flex-row items-center border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <BlockFormatDropDown
                    ActiveBlockName={
                         blockTypeToBlockName[blockType] as string
                    }
                    ActiveBlockIcon={getIcon({ blockType })}
                    blockType={blockType}
                    rootType={rootType}
                    editor={editor}
               />
          </div>

          {
               blockType === 'code' && <div className='flex flex-row items-center border-r-[1px] pr-3 border-r-gray-600 h-10'>
                    <CodeBlockPlugin
                         isEditable={isEditable}
                         codeLanguage={codeLanguage}
                         onCodeLanguageSelect={onCodeLanguageSelect}
                    />
               </div>
          }

          {/* resize font */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <FontSizePlugin
                    selectionFontSize={fontSize.slice(0, -2)}
                    editor={activeEditor}
                    disabled={!isEditable}
               />
          </div>

          {/* Font format */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
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


          {/* align text */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button
                    isActive={elementFormat === 'left'}
                    onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left') }}
               >
                    <CiTextAlignLeft className='text-xl' />
               </Button>

               <Button
                    isActive={elementFormat === 'center'}
                    onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center') }}
               >
                    <CiTextAlignCenter className='text-xl' />
               </Button>

               <Button
                    isActive={elementFormat === 'right'}
                    onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right') }}
               >
                    <CiTextAlignRight className='text-xl' />
               </Button>

               <Button
                    isActive={elementFormat === 'justify'}
                    onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify') }}
               >
                    <CiTextAlignJustify className='text-xl' />
               </Button>
          </div>

          {/* attach file and image */}
          <div className='flex flex-row items-center gap-x-2'>
               <FilePlugin />
               <ImagePlugin />
               <YoututbePlugin />
               <EquationPlugin />
          </div>
     </div>
     )
}