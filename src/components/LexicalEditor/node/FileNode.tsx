import {
  createEditor,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { FileEmbed } from "@/components/LexicalEditor/ui/FileEmbed";

export const $createFileNode = ({
  fileName,
  size,
  src,
  editor,
}: {
  fileName: string,
  size: number,
  src: string;
  editor?: LexicalEditor;
}) => {
  return new FileNode({ fileName, size,src, editor });
};

export type SerializedFileNode = Spread<
  {
    fileName: string,
    size: number,
    src: string;
    editor: SerializedEditor;
  },
  SerializedLexicalNode
>;

const $convertFileElement = (domNode: HTMLElement): DOMConversionOutput | null => {
  const src = domNode.getAttribute("data-lexical-src-file");
  const fileName = domNode.getAttribute("data-lexical-fileName")
  const size = domNode.getAttribute("data-lexical-file-size")
  if (!src || !fileName || !size) return null;
  return { node: $createFileNode({ src, fileName, size: parseInt(size, 10) }) };
};

export class FileNode extends DecoratorNode<JSX.Element> {
  __fileName: string;
  __size: number;
  __src: string;
  __editor: LexicalEditor;

  constructor({
    fileName,
    size,
    src,
    editor,
    key,
  }: {
    fileName: string,
    size: number,
    src: string;
    editor?: LexicalEditor;
    key?: NodeKey;
  }) {
    super(key)
    this.__src = src;
    this.__fileName = fileName;
    this.__size = size;
    this.__editor =
      editor ||
      createEditor({
        nodes: [],
      });
  }

  static getType(): string {
    return "file";
  }

  static clone(node: FileNode): FileNode {
    return new FileNode({
      fileName: node.__fileName,
      size: node.__size,
      src: node.__src,
      key: node.__key,
      editor: node.__editor,
    });
  }

  static importJSON(serializedNode: SerializedFileNode): FileNode {
    const { src, editor, fileName, size } = serializedNode;
    const node = $createFileNode({ src, fileName, size });

    if (editor) {
      const nestedEditor = node.__editor;
      const editorState = nestedEditor.parseEditorState(editor.editorState);
      if (!editorState.isEmpty()) {
        nestedEditor.setEditorState(editorState);
      }
    }
    return node;
  }

  exportJSON(): SerializedFileNode {
    return {
      fileName: this.__fileName,
      size: this.__size,
      src: this.__src,
      editor: this.__editor.toJSON(),
      type: this.getType(),
      version: 1,
    };
  }

  decorate(): JSX.Element {
    return <FileEmbed src={this.__src} fileName={this.__fileName} size={this.__size} />;
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute("data-lexical-src-file", this.__src);
    element.setAttribute("data-lexical-fileName", this.__fileName)
    element.setAttribute("data-lexical-file-size", this.__size.toString())
    return { element };
  }

  updateDOM(): false {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      "div[data-lexical-src-file]":(node: Node) => ({
        conversion: $convertFileElement,
        priority: 0,
      }),
    };
  }
}

export function $isFileNode(node: LexicalNode | null | undefined): node is FileNode {
  return node instanceof FileNode;
}