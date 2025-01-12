"use client";

import { CplusplusOriginal } from "devicons-react";
import ClearIcon from "@mui/icons-material/Clear";
import { Editor } from "@monaco-editor/react";

export default function WorkSpaceEditor() {
  return (
    <>
      {/* Text Editor */}
      <div className="flex ">
        <div className="flex flex-row bg-[#161D2D ] rounded-t-lg border-t-[#5572FA] border-t-2 border-x-[#2A3A50] border-x-[0.5px] space-x-3 p-2 ">
          <CplusplusOriginal size="24" />
          <p className="text-[#C2C8CC]">main.cpp</p>
          <ClearIcon className="text-[#2A3A50]" />
        </div>
      </div>

      <Editor
        height="40vw"
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
        options={{
          fontSize: 16,
          fontFamily: "JetBrains Mono",
        }}
      />
    </>
  );
}
