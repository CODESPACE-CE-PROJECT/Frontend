import {
  createEditor,
  DecoratorNode,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  LexicalEditor,
  NodeKey,
  SerializedEditor,
  SerializedLexicalNode,
  Spread
} from "lexical";

export const $createImageNode = ({
  altText,
  height,
  maxWidth = 400,
  src,
  width,
  editor
}: {
  altText: string;
  height?: number;
  maxWidth?: number;
  src: string;
  width?: number;
  editor?: LexicalEditor
}) => {
  return new ImageNode({ altText, height, maxWidth, src, width, editor});
};


export type SerializedImageNode = Spread<
  {
    altText: string;
    height?: number;
    maxWidth?: number;
    src: string;
    width?: number;
    editor: SerializedEditor
  },
  SerializedLexicalNode
>;

const $convertImageElement = (domNode: Node): DOMConversionOutput | null => {
  if (domNode instanceof HTMLImageElement) {
    const { src, alt } = domNode;
    const node = $createImageNode({ src, altText: alt });
    return { node };
  }
  return null;
};

export class ImageNode extends DecoratorNode<JSX.Element> {
  __src: string;
  __altText: string;
  __height: "inherit" | number;
  __width: "inherit" | number;
  __maxWidth: number;
  __editor: LexicalEditor

  constructor({
    src,
    altText,
    maxWidth,
    width,
    height,
    editor,
    key,
  }: {
    src: string;
    altText: string;
    maxWidth: number;
    width?: "inherit" | number;
    height?: "inherit" | number;
    editor?: LexicalEditor
    key?: NodeKey;
  }) {
    super(key);
    this.__altText = altText;
    this.__width = width || "inherit";
    this.__height = height || "inherit";
    this.__maxWidth = maxWidth;
    this.__src = src;
    this.__editor = editor || createEditor({
      nodes: [],
    });
  }

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({
      altText: node.__altText,
      src: node.__src,
      height: node.__height,
      width: node.__width,
      maxWidth: node.__maxWidth,
      key: node.__key,
      editor: node.__editor
    });
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const {altText, height, width, maxWidth, src, editor} =
      serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      src,
      width,
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
      <img
        className="mt-2"
        src={this.__src}
        alt={this.__altText}
        style={{
          width: this.__width,
          height: this.__height,
          maxWidth: this.__maxWidth,
        }}
      />
    );
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const image = document.createElement("img");
    image.setAttribute("src", this.__src);
    image.setAttribute("alt", this.__altText);
    image.setAttribute("width", this.__width.toString());
    image.setAttribute("height", this.__height.toString());

    return { element: image };
  }

  updateDOM(_prevNode: this): boolean {
    return this.__src !== _prevNode.__src  
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_node: Node) => {
        return { conversion: $convertImageElement, priority: 0 };
      },
    };
  }
}