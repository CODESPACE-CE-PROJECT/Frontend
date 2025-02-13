"use client";

import { CplusplusOriginal } from "devicons-react";
import { Editor, Monaco } from "@monaco-editor/react";

export default function WorkSpaceEditor() {
  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "JetBrains Mono",
    fontSize: 16,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: false,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,

    LineNumber: "on",
    padding: {
      top: 5,
    },
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("custom-vs-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0B111B",
      },
    });
  };

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monaco.editor.setTheme("custom-vs-dark");
  };

  return (
    <div className="pt-2 w-5/12 h-screen flex flex-col">
      {/* Text Editor Header */}
      <div className="flex h-auto border-b-[0.5px] border-b-[#2A3A50]">
        <div className="flex flex-row bg-[#0B111B] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
          <CplusplusOriginal size="24" />
          <p className="text-[#C2C8CC] min-w-32">main.cpp</p>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <Editor
          className="w-full h-full"
          defaultLanguage="cpp"
          defaultValue={`#include <iostream>
  using namespace std;
  
  int main() {
      int first_number, second_number, sum;
      
      cout << "Enter two integers: ";
      cin >> first_number >> second_number;
      
      sum = first_number + second_number;
      
      cout << first_number << " + " <<  second_number << " = " << sum;     
      
      return 0;
  }`}
          options={{
            ...options,
          }}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
}
