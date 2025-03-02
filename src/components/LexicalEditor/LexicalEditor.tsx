"use client"

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { theme } from "@/components/LexicalEditor/theme"
import { ToolbarPlugin } from "@/components/LexicalEditor/Plugins/ToolbarPlugin/ToolbarPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ImageNode } from "@/components/LexicalEditor/node/ImageNode";
import { YoutubeNode } from "@/components/LexicalEditor/node/YoutubeNode";
import { EquationNode } from "@/components/LexicalEditor/node/EquationNode";
import { FileNode } from "@/components/LexicalEditor/node/FileNode";
import { MyOnChangePlugin } from '@/components/LexicalEditor/Plugins/MyOnChangePlugin/MyOnChangePlugin';

interface Props {
     value?: string,
     onChange: (editorState: string) => void,
     className?: string,
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

export const LexicalEditor:React.FC<Props> = ({onChange, value, className, children}) => {

     const initialConfig = {
          namespace: 'Lexical Editor',
          nodes: [...PlaygroundNodes],
          editable: true,
          editorState: value,
          theme: theme,
          onError: (error: Error) => {
               throw error;
          },
     };
     
     const placeholder = 'พิมพ์ที่นี่ .....';

     return <LexicalComposer initialConfig={initialConfig}>
          <div className="relative rounded-md bg-blackground-text w-full">
               <ToolbarPlugin />
               <div className="relative p-4">
                    <RichTextPlugin
                         contentEditable={
                              <ContentEditable
                                   className={`relative ${className} bg-blackground-text outline-0`}
                                   aria-placeholder={placeholder}
                                   placeholder={
                                        <div className="absolute top-[16px] left-[15px] inline-block text-ellipsis overflow-hidden text-gray-400">{placeholder}</div>
                                   }
                              />
                         }
                         ErrorBoundary={LexicalErrorBoundary}
                    />
                    {children}
               </div>
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <AutoFocusPlugin />
          <MyOnChangePlugin onChange={(editorState) => onChange(JSON.stringify(editorState))}/>
     </LexicalComposer>
}