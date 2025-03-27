"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import {
  CplusplusOriginal,
  PythonOriginal,
  COriginal,
  JavaOriginal,
} from "devicons-react";
import DescriptionIcon from "@mui/icons-material/Description";
import { Loading } from "@/components/Loading/Loading";
import { ICodeSpace } from "@/types/codeSpace";

interface WorkSpaceEditorProps {
  codeFile?: ICodeSpace;
  onChange: (value:string) => void
}

const fileIcons: Record<string, JSX.Element> = {
  ".cpp": <CplusplusOriginal size="24" />,
  ".py": <PythonOriginal size="24" />,
  ".c": <COriginal size="24" />,
  ".java": <JavaOriginal size="24" />,
  "": <DescriptionIcon fontSize="medium" />,
};

export default function WorkSpaceEditor({ codeFile, onChange }: WorkSpaceEditorProps) {
  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "JetBrains Mono",
    fontSize: 16,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    scrollbar: {
      horizontalSliderSize: 18,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
    lineNumbers: "on",
    lineNumbersMinChars: 3,
    padding: {
      top: 16,
    },
  };

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.editor.defineTheme("custom", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          background: "#0B111B",
          token: "",
        },
      ],
      colors: {
        "editor.forefround": "#16233A",
        "editor.background": "#16233A",
        "editor.selectionBackground": "#2A3A50",
        "editor.lineHighlightBackground": "#2A3A50",
        "editorCursor.foreground": "#F8F8F0",
        "editorWhitespace.foreground": "#3B3A32",
        "editorIndentGuide.activeBackground": "#9D550FB0",
      },
    });
  };

  const handleEditorOnMount = (_editor: any, monaco: Monaco) => {
    monaco.editor.setTheme("custom");
  };

  const getFileIcon = (file: string) => {
    const extension = file?.slice(file.lastIndexOf("."));
    return fileIcons[extension] || <DescriptionIcon />;
  };

  return (
    <div className="pt-2 w-5/12 h-screen flex flex-col">
      <div className="flex h-auto border-b-[0.5px] border-b-[#2A3A50]">
        <div className="flex flex-row bg-[#0B111B] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
        
          {codeFile?.fileName && getFileIcon(codeFile?.fileName)}
          <p className="text-[#C2C8CC] truncate min-w-32 max-w-96 ">{codeFile?.fileName}</p>
        </div>
      </div>

      {/* Editor */}
      <div className="w-full h-full">
        <Editor
          options={{
            ...options,
          }}
          loading={<Loading />}
          language={codeFile?.language?.toLowerCase()}
          value={codeFile?.sourceCode}
          onChange={(value) => value && onChange(value)}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorOnMount}
        />
      </div>
    </div>
  );
}
