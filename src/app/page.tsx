"use client";

import Editor from "@monaco-editor/react";

const onChange = (value: string, ev: any[]) => {
  console.log(value);
};

const handleOnClick = () => {
  console.log("Button clicked");
};

const options = {
  autoIndent: "full",
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 16,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  minimap: {
    enabled: true,
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

export default function Home() {
  return (
    <>
      <div className="flex-row">
        <div className="grid justify-items-end m-1 mr-5 ">
          <button
            onClick={handleOnClick}
            className="px-5 py-2 bg-green-600 rounded-md"
          >
            Run▸
          </button>
        </div>
        <Editor
          height="60vh"
          defaultLanguage="c"
          defaultValue="// some comment"
          onChange={onChange}
          theme="vs-dark"
          options={options}
        />
      </div>
    </>
  );
}
