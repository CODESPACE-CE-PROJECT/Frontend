"use client";

import { CplusplusOriginal } from "devicons-react";
import ClearIcon from "@mui/icons-material/Clear";

import { Editor, Monaco } from "@monaco-editor/react";

export default function WorkSpaceEditor() {
  // const options = {
  //   autoIndent: "full",
  //   contextmenu: true,
  //   fontFamily: "JetBrains Mono",
  //   fontSize: 16,
  //   lineHeight: 24,
  //   hideCursorInOverviewRuler: true,
  //   matchBrackets: "always",
  //   minimap: {
  //     enabled: false,
  //   },
  //   scrollbar: {
  //     horizontalSliderSize: 4,
  //     verticalSliderSize: 18,
  //   },
  //   selectOnLineNumbers: true,
  //   roundedSelection: false,
  //   readOnly: false,
  //   cursorStyle: "line",
  //   automaticLayout: true,

  //   LineNumber: "on",
  //   padding: {
  //     top: 5,
  //   },
  // };

  // Handle defining the custom theme before the editor mounts
  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("custom-vs-dark", {
      base: "vs-dark", // Base theme
      inherit: true, // Inherit the base theme's rules
      rules: [],
      colors: {
        "editor.background": "#0B111B",
      },
    });
  };

  // Apply the theme after the editor mounts
  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    monaco.editor.setTheme("custom-vs-dark");
  };

  return (
    <>
      <div className="pt-2 w-[45vw] h-screen">
        {/* Text Editor */}
        <div className="flex h-auto border-b-[0.5px] border-b-[#2A3A50]">
          <div className="flex flex-row bg-[#0B111B] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
            <CplusplusOriginal size="24" />
            <p className="text-[#C2C8CC] min-w-32">main.cpp</p>
          </div>
        </div>
        <div className="max-h-fit">
          <Editor
            className="h-[90vh] resize-x overflow-auto"
            height="auto"
            width="auto"
            defaultLanguage="cpp"
            defaultValue={`#include <iostream>
            using namespace std;
            
            int main() {
              
            int first_number, second_number, sum;
            
            cout << "Enter two integers: ";
            cin >> first_number >> second_number;
            
            // sum of two numbers in stored in variable sumOfTwoNumbers
            sum = first_number + second_number;
            
            // prints sum 
            cout << first_number << " + " <<  second_number << " = " << sum;     
            
            return 0;
            }`}
            theme="vs-dark"
            options={{ fontSize: 16, fontFamily: "JetBrains Mono" }}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
      </div>
    </>
  );
}
