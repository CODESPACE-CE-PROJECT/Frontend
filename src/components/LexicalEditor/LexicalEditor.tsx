import { $getRoot, $getSelection } from "lexical"
import { useEffect } from "react"

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { theme } from "@/components/LexicalEditor/config"
import { ToolbarPlugin } from "@/components/LexicalEditor/Plugins/ToolbarPlugin";

export const LexicalEditor = () => {
     function onError(error: any) {
          console.error(error);
     }

     const initialConfig = {
          namespace: 'Lexical Editor',
          theme,
          onError,
     };

     const placeholder = 'พิมพ์ที่นี่ .....';

     return <LexicalComposer initialConfig={initialConfig}>
          <div className="relative rounded-md bg-blackground-text">
               <ToolbarPlugin />
               <div className="relative p-4">
                    <RichTextPlugin
                         contentEditable={
                              <ContentEditable
                                   className="relative h-64 overflow-y-auto bg-blackground-text outline-0"
                                   aria-placeholder={placeholder}
                                   placeholder={
                                        <div className="absolute top-[16px] left-[15px] inline-block text-ellipsis overflow-hidden text-gray-400">{placeholder}</div>
                                   }
                              />
                         }
                         ErrorBoundary={LexicalErrorBoundary}
                    />
               </div>
          </div>
          <HistoryPlugin />
          <AutoFocusPlugin />
     </LexicalComposer>
}