"use client";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import ExampleTheme from "@/app/components/Lexical/ExampleTheme";
import ReplyToolbar from "@/app/components/Lexical/ReplyToolbar";

const placeholder = "Reply...";

const editorConfig = {
  namespace: "React.js Demo",
  nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  theme: ExampleTheme,
};

export default function Reply() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="max-w-2xl mx-auto my-4 rounded-lg bg-white shadow-lg">
        <div className="relative bg-white rounded-lg">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="min-h-[65px] resize-none text-base p-4 caret-[#444] outline-none"
                aria-placeholder={placeholder}
                placeholder={
                  <div className="absolute text-[#999] top-4 left-4 pointer-events-none">
                    {placeholder}
                  </div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <ReplyToolbar />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
