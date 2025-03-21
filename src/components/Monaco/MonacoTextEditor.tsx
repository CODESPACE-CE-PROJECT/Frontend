import { LanguageType } from "@/enum/enum";
import { Editor, Monaco } from "@monaco-editor/react"
import { Loading } from "@/components/Loading/Loading";

interface Props {
     language?: LanguageType,
     sourceCode?: string,
     onChange?: (value: string | undefined) => void
}

export const MonacoTextEditor: React.FC<Props> = ({ language, sourceCode, onChange }) => {
     const handleEditorWillMount = (monaco: Monaco) => {
          monaco.editor.defineTheme("custom", {
               base: "vs-dark",
               inherit: true,
               rules: [
                    {
                         "background": "#0B111B",
                         "token": ""
                    },
               ],
               colors: {
                    "editor.foreground": "#ffffff",
                    "editor.background": "#16233A",
                    "editor.selectionBackground": "#2A3A50",
                    "editor.lineHighlightBackground": "#2A3A50",
                    "editorCursor.foreground": "#F8F8F0",
                    "editorWhitespace.foreground": "#3B3A32",
                    "editorIndentGuide.activeBackground": "#9D550FB0",
               },
          });
     };

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


     const handleEditorOnMount = (_editor: any, monaco: Monaco) => {
          monaco.editor.setTheme("custom");
     };

     return <Editor
          options={options}
          language={language === LanguageType.C || language === LanguageType.CPP ? 'cpp' : language?.toLowerCase()}
          value={sourceCode}
          loading={<Loading />}
          className="rounded-md h-screen md:h-full  bg-[#16233A] border border-transparent p-1 py-3"
          onChange={onChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorOnMount}
     />
}