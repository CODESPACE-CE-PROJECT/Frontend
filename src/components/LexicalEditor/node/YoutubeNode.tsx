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

export const $createYoutubeNode = ({
     id,
     editor
}: {
     id: string,
     editor?: LexicalEditor
}) => {
     return new YoutubeNode({ id, editor });
};

export type SerializedImageNode = Spread<
     {
          id: string,
          editor: SerializedEditor
     },
     SerializedLexicalNode
>;

const ID_ATTR = "data-lexical-youtube";

const $convertYoutubeElement = (domNode: HTMLElement): DOMConversionOutput | null => {
     const id = domNode?.getAttribute(ID_ATTR)
     if (!id) return null
     const node = $createYoutubeNode({ id })
     return { node };
};

const HEIGHT = "315px";
const WIDTH = "560px";
const getYoutubeLink = (id: string) =>
     `https://www.youtube-nocookie.com/embed/${id}`;

export class YoutubeNode extends DecoratorNode<JSX.Element> {
     __id: string;
     __editor: LexicalEditor;

     constructor({
          id,
          editor,
          key,
     }: {
          id: string;
          editor?: LexicalEditor
          key?: NodeKey;
     }) {
          super(key);
          this.__id = id;
          this.__editor = editor || createEditor({
               nodes: [],
          });
     }

     static getType(): string {
          return "youtube";
     }

     static clone(node: YoutubeNode): YoutubeNode {
          return new YoutubeNode({
               id: node.__id,
               editor: node.__editor,
               key: node.__key
          });
     }

     static importJSON(serializedNode: SerializedImageNode): YoutubeNode {
          const { id, editor } = serializedNode;
          const node = $createYoutubeNode({
               id
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
               <iframe
                    className="mt-2"
                    height={HEIGHT}
                    width={WIDTH}
                    src={getYoutubeLink(this.__id)}
               />
          );
     }

     createDOM(): HTMLElement {
          const div = document.createElement("div");
          return div;
     }

     exportDOM(): DOMExportOutput {
          const iframe = document.createElement("iframe");
          iframe.setAttribute(ID_ATTR, this.__id)
          iframe.setAttribute("height", HEIGHT)
          iframe.setAttribute("width", WIDTH)
          iframe.setAttribute("src", getYoutubeLink(this.__id))

          return { element: iframe };
     }


     updateDOM(_prevNode: this): boolean {
          return this.__id !== _prevNode.__id
     }

     static importDOM(): DOMConversionMap | null {
          return {
               iframe: (_node: Node) => {
                    return { conversion: $convertYoutubeElement, priority: 0 };
               },
          };
     }
}