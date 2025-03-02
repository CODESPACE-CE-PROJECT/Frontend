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
import { TreeViewPlugin } from "@/components/LexicalEditor/Plugins/TreeViewPlugin";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { MyOnChangePlugin } from '@/components/LexicalEditor/Plugins/MyOnChangePlugin/MyOnChangePlugin';
import { ReplyToolbarPlugin } from '@/components/LexicalEditor/Plugins/ReplyToolbarPlugin/ReplyToolbarPlugin';
import { useEffect, useRef } from 'react';
interface Props {
     value?: string,
     onChange: (value: string) => void,
     isFocus: boolean,
     onFocus?: (isFocus: boolean) => void
}

const PlaygroundNodes = [
     HeadingNode,
     QuoteNode,
     ListNode,
     ListItemNode,
     CodeNode,
     CodeHighlightNode,
]

export const ReplyEditor: React.FC<Props> = ({ onChange, value, isFocus, onFocus }) => {
     const replyRef = useRef<HTMLDivElement>(null)

     useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
               if (replyRef.current && !replyRef.current.contains(event.target as Node) && onFocus) {
                    onFocus(false)
               }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, [onFocus])

     const initialConfig = {
          namespace: 'Lexical Reply Editor',
          nodes: [...PlaygroundNodes],
          editorState: value,
          editable: true,
          theme: theme,
          onError: (error: Error) => {
               throw error;
          },
     };

     const placeholder = 'พิมพ์ที่นี่ .....';

     return <LexicalComposer initialConfig={initialConfig}>
          <div className="relative rounded-md bg-blackground-text focus-within:border-[1px] focus-within:border-primary"
               ref={replyRef}
               onClick={() => onFocus && onFocus(true)}
          >
               <div className="relative py-2 px-4">
                    <RichTextPlugin
                         contentEditable={
                              <ContentEditable
                                   className={`relative overflow-y-auto z-0 bg-blackground-text outline-0`}
                                   aria-placeholder={placeholder}
                                   placeholder={
                                        <div className="absolute top-[10px] z-10 left-[15px] inline-block text-ellipsis overflow-hidden text-gray-400">{placeholder}</div>
                                   }
                              />
                         }
                         ErrorBoundary={LexicalErrorBoundary}
                    />
               </div>
               <ReplyToolbarPlugin isFocus={isFocus} />
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <AutoFocusPlugin />
          <MyOnChangePlugin onChange={(editorState) => onChange(JSON.stringify(editorState))} />
     </LexicalComposer>
}