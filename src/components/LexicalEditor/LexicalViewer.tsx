import { CodeNode, CodeHighlightNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { EquationNode } from "@/components/LexicalEditor/node/EquationNode";
import { FileNode } from "../LexicalEditor/node/FileNode";
import { ImageNode } from "../LexicalEditor/node/ImageNode";
import { YoutubeNode } from "../LexicalEditor/node/YoutubeNode";
import { theme } from "../LexicalEditor/theme";
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import 'katex/dist/katex.css';
 
interface Props {
     value?: string,
     className?: string,
     namespace: string,
     children?: React.ReactNode
}

const PlaygroundNodes = [
     HeadingNode,
     QuoteNode,
     ListNode,
     ListItemNode,
     CodeNode,
     CodeHighlightNode,
     ImageNode,
     YoutubeNode,
     EquationNode,
     FileNode
]

export const LexicalViewer: React.FC<Props> = ({value, className, namespace, children}) => {
     const initialConfig = {
          namespace: namespace,
          nodes: [...PlaygroundNodes],
          editable: false,
          editorState: value,
          theme: theme,
          onError: (error: Error) => {
               throw error;
          },
     };

     return <div className="relative">
          <LexicalComposer initialConfig={initialConfig}>
               <div className={`${className} bg-hover-navbar gap-y-6 outline-0 overflow-x-auto`}>
                    {children}
                    <RichTextPlugin
                         contentEditable={
                              <div className="relative">
                                   <ContentEditable className="outline-0" />
                              </div>
                         }
                         ErrorBoundary={LexicalErrorBoundary}
                    />
               </div>
               <ListPlugin />
               <AutoFocusPlugin />
          </LexicalComposer>
     </div>
}
