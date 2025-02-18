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
import { useState } from 'react';

interface Props {
     value: string,
     onChange: (value: string) => void
}

const PlaygroundNodes = [
     HeadingNode,
     QuoteNode,
     ListNode,
     ListItemNode,
     CodeNode,
     CodeHighlightNode,
]

export const ReplyEditor:React.FC<Props> = ({onChange, value}) => {
     const [isActive, setIsActive] = useState(false);
     const [valueChange, setValueChange] = useState<string>()

     const initialConfig = {
          namespace: 'Lexical Reply Editor',
          nodes: [...PlaygroundNodes],
          editable: true,
          theme: theme,
          onError: (error: Error) => {
               throw error;
          },
     };

     const onFocus = () => setIsActive(true);
     const onBlur = () => setIsActive(false);
     const onValueChange = (value: string) => {
          if(value !== `<p class="editor-paragraph"><br></p>`){
               setValueChange(value)
               onChange(value)
          }else {
               setValueChange(undefined)
          }
     }
     
     const placeholder = 'พิมพ์ที่นี่ .....';

     return <LexicalComposer initialConfig={initialConfig}>
          <div className="relative rounded-md bg-blackground-text focus-within:border-[1px] focus-within:border-primary"
               onFocus={onFocus} 
               onBlur={onBlur}
          >
               <div className="relative p-4">
                    <RichTextPlugin
                         contentEditable={
                              <ContentEditable
                              className={`relative ${isActive || valueChange !== undefined ? 'h-24': 'h-8'} overflow-y-auto bg-blackground-text outline-0`}
                              aria-placeholder={placeholder}
                              placeholder={
                                   <div className="absolute top-[16px] left-[15px] inline-block text-ellipsis overflow-hidden text-gray-400">{placeholder}</div>
                              }
                              />
                         }
                         ErrorBoundary={LexicalErrorBoundary}
                    />
               </div>
               <ReplyToolbarPlugin isActive={isActive || valueChange !== undefined}/>
          </div>
          <HistoryPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <AutoFocusPlugin />
          <MyOnChangePlugin value={value} onChange={onValueChange}/>
     </LexicalComposer>
}