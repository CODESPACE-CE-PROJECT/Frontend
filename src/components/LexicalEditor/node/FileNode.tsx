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
  Spread
} from "lexical";
import { FileEmbed } from "../ui/FileEmbed";

export const $createFileNode = ({
  file,
  src,
  editor
}: {
  file?: File,
  src: string
  editor?: LexicalEditor
}) => {
  return new FileNode({ file, src, editor});
};


export type SerializedFileNode = Spread<
  {
    file: File,
    src: string,
    editor: SerializedEditor
  },
  SerializedLexicalNode
>;

const $convertFileElement = (domNode: HTMLElement): DOMConversionOutput | null => {
    const src = domNode.getAttribute("data-lexical-src-file")
    if(!src) return null
    const node = $createFileNode({src});
    return { node };
};

export class FileNode extends DecoratorNode<JSX.Element> {
  __file: File | undefined
  __src: string
  __editor: LexicalEditor

  constructor({
    file,
    src,
    editor,
    key,
  }: {
    file?: File,
    src: string;
    editor?: LexicalEditor
    key?: NodeKey;
  }) {
    super(key);
    this.__src = src;
    this.__file = file;
    this.__editor = editor || createEditor({
      nodes: [],
    });
  }

  static getType(): string {
    return "file";
  }

  static clone(node: FileNode): FileNode {
    return new FileNode({
      file: node.__file,
      src: node.__src,
      key: node.__key,
      editor: node.__editor
    });
  }

  static importJSON(serializedNode: SerializedFileNode): FileNode {
    const {file,src, editor} =
      serializedNode;
    const node = $createFileNode({
      file,
      src,
    });
    const nestedEditor = node.__editor;
    const editorState = nestedEditor.parseEditorState(editor.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  decorate(): JSX.Element {
    return (
     <FileEmbed
        src={this.__src}
        file={this.__file}
     />
    );
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("div");
    element.setAttribute('data-lexical-src-file', this.__src)

    return { element };
  }

  updateDOM(_prevNode: this): boolean {
    return this.__src !== _prevNode.__src  
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_node: Node) => {
        return { conversion: $convertFileElement, priority: 0 };
      },
    };
  }
}

export function $isFileNode(
  node: LexicalNode | null | undefined
): node is FileNode {
  return node instanceof FileNode
}