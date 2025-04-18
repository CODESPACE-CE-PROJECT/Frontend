import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  createCommand,
  LexicalEditor,
} from "lexical";
import { blockTypeToBlockName, rootTypeToRootName } from "@/components/LexicalEditor/Plugins/type";
import { $setBlocksType } from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { $createCodeNode } from "@lexical/code";
import DropDown, { DropDownItem } from "@/components/LexicalEditor/ui/DropDown";
import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrderedIcon,
  Pilcrow,
  Quote,
} from 'lucide-react';

export const INSERT_COLLAPSIBLE_COMMAND = createCommand<void>()

export function BlockFormatDropDown({
  editor,
  blockType,
  ActiveBlockIcon,
  ActiveBlockName,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  ActiveBlockIcon: React.ReactNode,
  ActiveBlockName: keyof typeof blockTypeToBlockName | string
  disabled?: boolean;
  style?: string;
}): JSX.Element {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };


  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      formatParagraph();
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        $setBlocksType(selection, () => $createQuoteNode());
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (selection !== null) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
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
      });
    }
  };

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="flex flex-row  gap-x-3  items-center h-[32px]"
      buttonIconClassName={ActiveBlockIcon}
      buttonLabel={ActiveBlockName}
    >
      <DropDownItem className={"item "} onClick={formatParagraph}>
        <Pilcrow className="w-4 h-4" />
        <span className="text">Normal</span>
      </DropDownItem>
      <DropDownItem onClick={() => formatHeading("h1")}>
        <Heading1 className="h-4 w-4" />
        <span className="text">Heading 1</span>
      </DropDownItem>
      <DropDownItem onClick={() => formatHeading("h2")}>
        <Heading2 className="w-4 h-4" />
        <span className="text">Heading 2</span>
      </DropDownItem>
      <DropDownItem onClick={() => formatHeading("h3")}>
        <Heading3 className="w-4 h-4" />
        <span className="text">Heading 3</span>
      </DropDownItem>
      <DropDownItem onClick={formatBulletList}>
        <List className="w-4 h-4" />
        <span className="text">Bullet List</span>
      </DropDownItem>
      <DropDownItem onClick={formatNumberedList}>
        <ListOrderedIcon className="w-4 h-4" />
        <span className="text">Numbered List</span>
      </DropDownItem>
      <DropDownItem onClick={formatQuote}>
        <Quote className="w-4 h-4" />
        <span className="text">Quote</span>
      </DropDownItem>
      <DropDownItem onClick={formatCode}>
        <Code2 className="w-4 h-4" />
        <span className="text">Code Block</span>
      </DropDownItem>
    </DropDown>
  );
}