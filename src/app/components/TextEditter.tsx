import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadIcon from "@mui/icons-material/Upload";
import { LanguageType } from "../enum/enum";
import { 
  CplusplusOriginal, 
  PythonOriginal, 
  COriginal, 
  JavascriptOriginal, 
  JavaOriginal 
} from "devicons-react";

interface Props {
  sourceCode?: string;
  language?: LanguageType;
}

export default function TextEditor({ sourceCode, language }: Props) {
  const [code, setCode] = useState(sourceCode || "");

  // ✅ ฟังก์ชันเลือกภาษาให้ตรงกับ Editor
  const languageEditor = (language: LanguageType) => {
    switch (language) {
      case LanguageType.C:
        return "c";
      case LanguageType.CPP:
        return "cpp";
      case LanguageType.JAVA:
        return "java";
      default:
        return "python";
    }
  };

  // ✅ ฟังก์ชันเลือกไอคอนภาษา
  const getLanguageIcon = (language: LanguageType | undefined) => {
    switch (language) {
      case LanguageType.C:
        return <COriginal size="24" />;
      case LanguageType.CPP:
        return <CplusplusOriginal size="24" />;
      case LanguageType.JAVA:
        return <JavaOriginal size="24" />;
      case LanguageType.PYTHON:
        return <PythonOriginal size="24" />;
      default:
        return <JavascriptOriginal size="24" />;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCode(e.target.result as string);
        } else {
          console.log("ไม่สามารถอ่านไฟล์ได้");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        {/* 🔹 ปุ่ม Code พร้อมแสดงไอคอนภาษา */}
        <div className="flex items-center space-x-2 bg-[#161f2e] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1d2738] w-28 text-center">
          {getLanguageIcon(language)}
          <span>Code</span>
        </div>

        {/* 🔹 ปุ่มอัปโค้ด & บันทึก */}
        <div className="flex space-x-4">
          <label className="border border-[#2A3A50] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#2A3A50] flex items-center justify-center space-x-2 cursor-pointer">
            <UploadIcon className="w-6 h-6" />
            <span>อัพโค้ด</span>
            <input
              type="file"
              accept=".c,.cpp,.java,.py,.txt"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>

          <button className="bg-[#5572FA] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3a59d7] w-24 flex items-center justify-center space-x-2">
            <CloudUploadIcon className="w-6 h-6" />
            <span>บันทึก</span>
          </button>
        </div>
      </div>

      {/* 🔹 Editor */}
      <Editor
        height="50vw"
        width="50vw"
        defaultLanguage={language ? languageEditor(language) : "cpp"}
        value={code}
        onChange={(newValue) => setCode(newValue || "")}
        theme="vs-dark"
      />
    </div>
  );
}
