import React, { useState } from "react";
import Codeicon from "../../../src/app/assets/HomeworkAssets/CodeIcon.svg";
import Image from "next/image";
import Editor from "@monaco-editor/react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIcon from '@mui/icons-material/Upload';
import { LanguageType } from "../enum/enum";

interface Props {
  sourceCode?: string,
  language?: LanguageType
}

export default function TextEditter({sourceCode, language}:Props){

  const languageEditor = (language: LanguageType) => {
    if (language === LanguageType.C){
      return "c";
    }else if (language === LanguageType.CPP){
      return "cpp"
    } else if (language === LanguageType.JAVA){
      return "java"
    } else {
      return "python"
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-3">
          {/* ปุ่ม Code ด้านซ้าย */}
          <div className="bg-[#161f2e] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1d2738] w-24 text-center">
            Code
          </div>

          {/* ปุ่ม อัพโค้ด และ บันทึก ด้านขวา */}
          <div className="flex space-x-4">
            <button className="border border-[#2A3A50] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2A3A50] flex items-center justify-center space-x-2">
              <UploadIcon className="w-5 h-5" />
              <span>อัพโค้ด</span>
            </button>
            <button className="bg-[#5572FA] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a59d7] w-24 flex items-center justify-center space-x-2">
              <CloudUploadIcon className="w-5 h-5" />
              <span>บันทึก</span>
            </button>
          </div>

        </div>



        <Editor
          height="50vw"
          width="50vw"
          defaultLanguage={language ? languageEditor(language): 'cpp'}
          value={sourceCode}
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
        />
      </div>
    </>
  );
}
