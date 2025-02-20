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
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
interface Props {
     title?: string,
     value?: string
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

export const ProblemDescription: React.FC<Props> = ({ title, value }) => {
     const initialConfig = {
          namespace: 'Prblem Description',
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
               <div className="bg-hover-navbar gap-y-6 outline-0 p-4 rounded-xl border-[1px] border-gray-700">
                    <RichTextPlugin
                         contentEditable={
                              <div className="relative">
                                   <ContentEditable className="outline-0" />
                              </div>
                         }
                         ErrorBoundary={LexicalErrorBoundary}
                    />
               </div>
               <HistoryPlugin />
               <ListPlugin />
               <CheckListPlugin />
               <AutoFocusPlugin />
          </LexicalComposer>
     </div>

}
