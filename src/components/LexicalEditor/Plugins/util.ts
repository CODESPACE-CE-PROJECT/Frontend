import { $createCodeNode } from '@lexical/code';
import {
     INSERT_CHECK_LIST_COMMAND,
     INSERT_ORDERED_LIST_COMMAND,
     INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list';
import { $isDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode';
import { $patchStyleText, $setBlocksType } from '@lexical/selection';
import {
     $createHeadingNode,
     $createQuoteNode,
     $isHeadingNode,
     $isQuoteNode,
     HeadingTagType,
} from '@lexical/rich-text';
import { $isTableSelection } from '@lexical/table';
import { $getNearestBlockElementAncestorOrThrow } from '@lexical/utils';
import {
     $createParagraphNode,
     $getSelection,
     $isRangeSelection,
     $isTextNode,
     LexicalEditor,
} from 'lexical';


export enum BlockType {
     BULLET = "BULLET",
     CHECK = "CHECK",
     CODE = "CODE",
     H1 = "H1",
     H2 = "H2",
     H3 = "H3",
     NUMBER = "NUMBER",
     PARAGRAPH = "PARAGRAPH",
     QUOTE = "QUOTE",
};

export enum UpdateFontSizeType {
     increment = 1,
     decrement,
}

export const MAX_ALLOWED_FONT_SIZE = 72;
export const MIN_ALLOWED_FONT_SIZE = 10;
export const DEFAULT_FONT_SIZE = 16

export const calculateNextFontSize = (
     currentFontSize: number,
     updateType: UpdateFontSizeType | null,
) => {
     if (!updateType) {
          return currentFontSize;
     }

     let updatedFontSize: number = currentFontSize;
     switch (updateType) {
          case UpdateFontSizeType.decrement:
               switch (true) {
                    case currentFontSize > MAX_ALLOWED_FONT_SIZE:
                         updatedFontSize = MAX_ALLOWED_FONT_SIZE;
                         break;
                    case currentFontSize >= 48:
                         updatedFontSize -= 12;
                         break;
                    case currentFontSize >= 24:
                         updatedFontSize -= 4;
                         break;
                    case currentFontSize >= 14:
                         updatedFontSize -= 2;
                         break;
                    case currentFontSize >= 9:
                         updatedFontSize -= 1;
                         break;
                    default:
                         updatedFontSize = MIN_ALLOWED_FONT_SIZE;
                         break;
               }
               break;

          case UpdateFontSizeType.increment:
               switch (true) {
                    case currentFontSize < MIN_ALLOWED_FONT_SIZE:
                         updatedFontSize = MIN_ALLOWED_FONT_SIZE;
                         break;
                    case currentFontSize < 12:
                         updatedFontSize += 1;
                         break;
                    case currentFontSize < 20:
                         updatedFontSize += 2;
                         break;
                    case currentFontSize < 36:
                         updatedFontSize += 4;
                         break;
                    case currentFontSize <= 60:
                         updatedFontSize += 12;
                         break;
                    default:
                         updatedFontSize = MAX_ALLOWED_FONT_SIZE;
                         break;
               }
               break;

          default:
               break;
     }
     return updatedFontSize;
};


export const updateFontSizeInSelection = (
     editor: LexicalEditor,
     newFontSize: string | null,
     updateType: UpdateFontSizeType | null,
) => {
     const getNextFontSize = (prevFontSize: string | null): string => {
          if (!prevFontSize) {
               prevFontSize = `${DEFAULT_FONT_SIZE}px`;
          }
          prevFontSize = prevFontSize.slice(0, -2);
          const nextFontSize = calculateNextFontSize(
               Number(prevFontSize),
               updateType,
          );
          return `${nextFontSize}px`;
     };

     editor.update(() => {
          if (editor.isEditable()) {
               const selection = $getSelection();
               if (selection !== null) {
                    $patchStyleText(selection, {
                         'font-size': newFontSize || getNextFontSize,
                    });
               }
          }
     });
};


export const updateFontSize = (
     editor: LexicalEditor,
     updateType: UpdateFontSizeType,
     inputValue: string,
) => {
     if (inputValue !== '') {
          const nextFontSize = calculateNextFontSize(Number(inputValue), updateType);
          updateFontSizeInSelection(editor, String(nextFontSize) + 'px', null);
     } else {
          updateFontSizeInSelection(editor, null, updateType);
     }
};


export const formatParagraph = (editor: LexicalEditor) => {
     editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
               $setBlocksType(selection, () => $createParagraphNode());
          }
     });
};

export const formatHeading = (
     editor: LexicalEditor,
     blockType: BlockType,
     headingSize: HeadingTagType,
) => {
     if (blockType === BlockType.H1 || blockType === BlockType.H2 || blockType === BlockType.H3) {
          editor.update(() => {
               const selection = $getSelection();
               $setBlocksType(selection, () => $createHeadingNode(headingSize));
          });
     }
};

export const formatBulletList = (
     editor: LexicalEditor,
     blockType: BlockType,
) => {
     if (blockType === BlockType.BULLET) {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
     } else {
          formatParagraph(editor)
     }
}

export const formatCheckList = (
     editor: LexicalEditor,
     blockType: BlockType
) => {
     if (blockType === BlockType.CHECK) {
          editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
     } else {
          formatParagraph(editor)
     }
}

export const formatNumberedList = (
     editor: LexicalEditor,
     blockType: BlockType
) => {
     if (blockType === BlockType.NUMBER) {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
     } else {
          formatParagraph(editor)
     }
}

export const formatQuote = (
     editor: LexicalEditor,
     blockType: BlockType
) => {
     if (blockType === BlockType.QUOTE) {
          editor.update(() => {
               const selection = $getSelection()
               $setBlocksType(selection, () => $createQuoteNode())
          })
     }
}

export const formatCode = (
     editor: LexicalEditor,
     blockType: BlockType
) => {
     if (blockType === BlockType.CODE) {
          editor.update(() => {
               let selection = $getSelection()

               if (selection !== null) {
                    if (selection.isCollapsed()) {
                         $setBlocksType(selection, () => $createCodeNode())
                    } else {
                         const textContent = selection.getTextContent();
                         const codeNode = $createCodeNode();
                         selection.insertNodes([codeNode]);
                         selection = $getSelection();
                         if ($isRangeSelection(selection)) {
                              selection.insertRawText(textContent);
                         }
                    }
               }
          })
     }
}