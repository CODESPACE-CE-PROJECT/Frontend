"use client";

import Editor from "@monaco-editor/react";

const onChange = (value: string, ev: any[]) => {
  console.log(value);
};

const options = {
  autoIndent: "full",
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 13,
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
  cursorStyle: "underline-thin",
  automaticLayout: true,
};

export default function Home() {
  return (
    <Editor
      height="100vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      onChange={onChange}
      theme="vs-dark"
      options={options}
    />
  );
}
