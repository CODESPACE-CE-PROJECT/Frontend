/* eslint-disable @next/next/no-img-element */
import {
  $applyNodeReplacement,
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
import { Suspense } from "react";

export const $createImageNode = ({
  altText,
  height,
  maxWidth = 400,
  src,
  width,
  editor,
  key
}: {
  altText: string;
  height?: number;
  maxWidth?: number;
  src: string;
  width?: number;
  editor?: LexicalEditor,
  key?: NodeKey
}) => {
  return $applyNodeReplacement(new ImageNode({ altText, height, maxWidth, src, width, editor, key }));
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
  __width: "inherit" | number;
  __height: "inherit" | number;
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
    super(key)
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
    const { altText, height, width, maxWidth, src, editor } =
      serializedNode;
    const node = $createImageNode({
      altText,
      height,
      maxWidth,
      src,
      width,
    });
    const nestedEditor = node.__editor;
    const editorState = nestedEditor.parseEditorState(editor?.editorState);
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState);
    }
    return node;
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      height: this.__height === 'inherit' ? 0 : this.__height,
      width: this.__width === 'inherit' ? 0 : this.__width,
      maxWidth: this.__maxWidth,
      src: this.getSrc(),
      type: 'image',
      version: 1,
      editor: this.__editor.toJSON(),
    };
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <img
          className="mt-1"
          src={this.__src}
          alt={this.__altText}
          width={100}
          height={100}
          style={{
            width: this.__width,
            height: this.__height,
            maxWidth: this.__maxWidth,
          }}
        />
      </Suspense>
    );
  }

  updateDOM(): false {
    return false
  }

  getSrc(): string {
    return this.__src;
  }

  getAltText(): string {
    return this.__altText;
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    return span;
  }

  exportDOM(): DOMExportOutput {
    const image = document.createElement("img");
    image.setAttribute("src", this.__src);
    image.setAttribute("alt", this.__altText);
    image.setAttribute('width', this.__width.toString());
    image.setAttribute('height', this.__height.toString());

    return { element: image };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: (node: Node) => ({
        conversion: $convertImageElement,
        priority: 0
      }),
    };
  }
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode;
}