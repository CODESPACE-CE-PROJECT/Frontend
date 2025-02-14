import { DropDown } from '@/components/LexicalEditor/ui/DropDown';
import { DropDownItem } from '@/components/LexicalEditor/ui/DropDownItem';
import {
     BsTypeH1,
     BsTypeH2,
     BsTypeH3,
     BsChatSquareQuote
} from "react-icons/bs";
import { HiListBullet, HiNumberedList } from "react-icons/hi2";
import { BsTextParagraph, BsTypeStrikethrough } from "react-icons/bs";
import { LuUndo2, LuRedo2, LuMinus } from "react-icons/lu";
import { Button } from '@/components/LexicalEditor/ui/Button';
import { MdAttachFile } from "react-icons/md";
import { FiItalic, FiUnderline, FiBold } from "react-icons/fi";
import { IoCodeOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { TbPlusEqual } from "react-icons/tb";
import {
     CiTextAlignLeft,
     CiTextAlignCenter,
     CiTextAlignRight,
     CiTextAlignJustify,
     CiImageOn,
} from "react-icons/ci";
import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
     $getSelection,
     $isRangeSelection,
     CAN_REDO_COMMAND,
     CAN_UNDO_COMMAND,
     FORMAT_ELEMENT_COMMAND,
     FORMAT_TEXT_COMMAND,
     REDO_COMMAND,
     SELECTION_CHANGE_COMMAND,
     UNDO_COMMAND
} from 'lexical';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { BlockType, formatParagraph, formatHeading, formatBulletList, formatNumberedList, formatCheckList, formatQuote, formatCode } from '@/components/LexicalEditor/Plugins/util';
import { $isListNode, ListNode } from '@lexical/list';
import { $isCodeNode } from '@lexical/code';
import { $isHeadingNode } from '@lexical/rich-text';
import { $isParentElementRTL } from '@lexical/selection';

const LowPriority = 1

enum AlignElement {
     LEFT,
     CENTER,
     RIGHT,
     JUSTIFY
}

export const ToolbarPlugin = () => {
     const [editor] = useLexicalComposerContext()
     const toolbarRef = useRef(null)
     const [canUndo, setCanUndo] = useState(false);
     const [canRedo, setCanRedo] = useState(false);
     const [isBold, setIsBold] = useState(false);
     const [isItalic, setIsItalic] = useState(false);
     const [isUnderline, setIsUnderline] = useState(false);
     const [isEditable, setEditable] = useState(false);
     const [blocktpye, setBlockType] = useState<BlockType>(BlockType.PARAGRAPH)
     const [alignElement, setAlignElement] = useState<AlignElement>(AlignElement.LEFT)
     const [isStrikethrough, setIsStrikethrough] = useState(false);
     const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)
     const [dropdownValue, setDropdownValue] = useState<ReactNode>(<>
          <BsTextParagraph />
          <p>Normal</p>
     </>)


     const $updateToolbar = useCallback(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
               const anchorNode = selection.anchor.getNode()
               const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow()
               const elementKey = element.getKey()
               const elementDom = editor.getElementByKey(elementKey)

               if (elementDom !== null) {
                    console.log(element)
                    if ($isListNode(element)) {
                         const parentList = $getNearestNodeOfType(anchorNode, ListNode)
                         const type = parentList ? parentList.getTag() : element.getTag()
                         if (type === 'ul') {
                              setBlockType(BlockType.BULLET)
                              setDropdownValue(<>
                                   <HiListBullet className='text-xl' />
                                   <p>Bullet List</p>
                              </>)
                         } else if (type === 'ol') {
                              setBlockType(BlockType.NUMBER)
                              setDropdownValue(<>
                                   <HiNumberedList className='text-xl' />
                                   <p>Numbered List</p>
                              </>)
                         }
                    } else {
                         const type = $isHeadingNode(element) ? element.getTag() : element.getType()
                         if (type === 'h1') {
                              setBlockType(BlockType.H1)
                              setDropdownValue(<>
                                   <BsTypeH1 className='text-xl' />
                                   <p>Heading 1</p>
                              </>)
                         } else if (type === 'h2') {
                              setBlockType(BlockType.H2)
                              setDropdownValue(<>
                                   <BsTypeH2 className='text-xl' />
                                   <p>Heading 2</p>
                              </>)
                         } else if (type === 'h3') {
                              setBlockType(BlockType.H3)
                              setDropdownValue(<>
                                   <BsTypeH3 className='text-xl' />
                                   <p>Heading 3</p>
                              </>)
                         } else if (type === 'paragraph') {
                              setBlockType(BlockType.PARAGRAPH)
                              setDropdownValue(<>
                                   <BsTextParagraph className='text-xl' />
                                   <p>Normal</p>
                              </>)
                         } else if (type === 'quote') {
                              setBlockType(BlockType.QUOTE)
                              setDropdownValue(<>
                                   <BsChatSquareQuote className='text-lg' />
                                   <p>Quote</p>
                              </>)
                         }
                    }
               }

               setIsBold(selection.hasFormat('bold'));
               setIsItalic(selection.hasFormat('italic'));
               setIsUnderline(selection.hasFormat('underline'));
               setIsStrikethrough(selection.hasFormat('strikethrough'));
               setEditable(selection.hasFormat('code'));
          }
     }, [editor]);

     useEffect(() => {
          return mergeRegister(
               editor.registerUpdateListener(({ editorState }) => {
                    editorState.read(() => {
                         $updateToolbar();
                    });
               }),
               editor.registerCommand(
                    SELECTION_CHANGE_COMMAND,
                    (_payload, _newEditor) => {
                         $updateToolbar();
                         return false;
                    },
                    LowPriority,
               ),
               editor.registerCommand(
                    CAN_UNDO_COMMAND,
                    (payload) => {
                         setCanUndo(payload);
                         return false;
                    },
                    LowPriority,
               ),
               editor.registerCommand(
                    CAN_REDO_COMMAND,
                    (payload) => {
                         setCanRedo(payload);
                         return false;
                    },
                    LowPriority,
               ),
          );
     }, [editor, $updateToolbar]);

     const handleDropdownSelect = (children: ReactNode, blockTypeComming: BlockType) => {

          if (blockTypeComming === BlockType.PARAGRAPH) {
               formatParagraph(editor)
          } else if (blockTypeComming === BlockType.H1) {
               formatHeading(editor, blockTypeComming, 'h1')
          } else if (blockTypeComming === BlockType.H2) {
               formatHeading(editor, blockTypeComming, 'h2')
          } else if (blockTypeComming === BlockType.H3) {
               formatHeading(editor, blockTypeComming, 'h3')
          } else if (blockTypeComming === BlockType.BULLET) {
               formatBulletList(editor, blockTypeComming)
          } else if (blockTypeComming === BlockType.NUMBER) {
               formatNumberedList(editor, blockTypeComming)
          } else if (blockTypeComming === BlockType.QUOTE) {
               formatQuote(editor, blockTypeComming)
          } else if (blockTypeComming === BlockType.CODE) {
               formatCode(editor, blockTypeComming)
          }
          setBlockType(blockTypeComming)
          setDropdownValue(children)
          setIsOpenDropdown(prev => !prev)
     }

     return <div className="flex flex-wrap items-center border-b-[1px] border-b-gray-600 px-2 py-2 gap-x-3" ref={toolbarRef}>
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button
                    disable={!canUndo}
                    onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
               >
                    <LuUndo2 className='text-xl' />
               </Button>
               <Button
                    disable={!canRedo}
                    onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
               >
                    <LuRedo2 className='text-xl' />
               </Button>
          </div>

          {/* block control */}
          <div className='border-r-[1px] border-r-gray-600 h-10'>
               <DropDown value={dropdownValue} isOpen={isOpenDropdown} onClick={(isOPen) => setIsOpenDropdown(isOPen)}>
                    <DropDownItem selected={blocktpye === BlockType.PARAGRAPH} onClick={(children) => handleDropdownSelect(children, BlockType.PARAGRAPH)}>
                         <BsTextParagraph className='text-xl' />
                         <p>Normal</p>
                    </DropDownItem>

                    <DropDownItem selected={blocktpye === BlockType.H1} onClick={(children) => handleDropdownSelect(children, BlockType.H1)}>
                         <BsTypeH1 className='text-xl' />
                         <p>Heading 1</p>
                    </DropDownItem>

                    <DropDownItem selected={blocktpye === BlockType.H2} onClick={(children) => handleDropdownSelect(children, BlockType.H2)}>
                         <BsTypeH2 className='text-xl' />
                         <p>Heading 2</p>
                    </DropDownItem>

                    <DropDownItem selected={blocktpye === BlockType.H3} onClick={(children) => handleDropdownSelect(children, BlockType.H3)}>
                         <BsTypeH3 className='text-xl' />
                         <p>Heading 3</p>
                    </DropDownItem>

                    <DropDownItem selected={blocktpye === BlockType.BULLET} onClick={(children) => handleDropdownSelect(children, BlockType.BULLET)}>
                         <HiListBullet className='text-xl' />
                         <p>Bullet List</p>
                    </DropDownItem>

                    <DropDownItem selected={blocktpye === BlockType.NUMBER} onClick={(children) => handleDropdownSelect(children, BlockType.NUMBER)}>
                         <HiNumberedList className='text-xl' />
                         <p>Numbered List</p>
                    </DropDownItem>

                    <DropDownItem selected={blocktpye === BlockType.QUOTE} onClick={(children) => handleDropdownSelect(children, BlockType.QUOTE)}>
                         <BsChatSquareQuote className='text-lg' />
                         <p>Quote</p>
                    </DropDownItem>
               </DropDown>
          </div>

          {/* Font format */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button
                    isActive={isBold}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
                    }>
                    <FiBold className='text-xl' />
               </Button>

               <Button
                    isActive={isItalic}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
               >
                    <FiItalic className='text-xl' />
               </Button>

               <Button
                    isActive={isUnderline}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
               >
                    <FiUnderline className='text-xl' />
               </Button>

               <Button
                    isActive={isStrikethrough}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
               >
                    <BsTypeStrikethrough className='text-xl' />
               </Button>

               <Button
                    isActive={isEditable}
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
               >
                    <IoCodeOutline className='text-xl' />
               </Button>
          </div>

          {/* resize font */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button>
                    <GoPlus className='text-xl' />
               </Button>

               <input type="text" className='border-gray-600 bg-transparent w-10 p-0 text-center rounded' value={"85"} onChange={(e) => { }} />

               <Button>
                    <LuMinus className='text-xl' />
               </Button>
          </div>

          {/* align text */}
          <div className='flex flex-row items-center gap-x-2 border-r-[1px] pr-3 border-r-gray-600 h-10'>
               <Button isActive={alignElement === AlignElement.LEFT} onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'); setAlignElement(AlignElement.LEFT) }}>
                    <CiTextAlignLeft className='text-xl' />
               </Button>

               <Button isActive={alignElement === AlignElement.CENTER} onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'); setAlignElement(AlignElement.CENTER) }}>
                    <CiTextAlignCenter className='text-xl' />
               </Button>

               <Button isActive={alignElement === AlignElement.RIGHT} onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'); setAlignElement(AlignElement.RIGHT) }}>
                    <CiTextAlignRight className='text-xl' />
               </Button>

               <Button isActive={alignElement === AlignElement.JUSTIFY} onClick={() => { editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify'); setAlignElement(AlignElement.JUSTIFY) }}>
                    <CiTextAlignJustify className='text-xl' />
               </Button>
          </div>

          {/* attach file and image */}
          <div className='flex flex-row items-center gap-x-2'>
               <Button>
                    <MdAttachFile className='text-xl' />
               </Button>

               <Button>
                    <CiImageOn className='text-2xl' />
               </Button>
          </div>
     </div>
}