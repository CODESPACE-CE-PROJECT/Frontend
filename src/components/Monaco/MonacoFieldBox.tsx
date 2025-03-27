import { Editor, Monaco } from "@monaco-editor/react"
import { Loading } from "@/components/Loading/Loading";

interface Props {
     value?: string,
     onChange?: (value: string | undefined) => void,
     readOnly: boolean
}

export const MonacoFieldBox: React.FC<Props> = ({ value, onChange, readOnly }) => {
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
          readOnly: readOnly,
          cursorStyle: "line",
          automaticLayout: true,
          lineNumbers: "on",
          lineNumbersMinChars: 3,
          padding: {
               top: 16,
          },
          minimap: {
               enabled: false,
          },
     };

     const handleEditorOnMount = (_editor: any, monaco: Monaco) => {
          monaco.editor.setTheme("custom");
     };

     return <Editor
          options={options}
          value={value}
          loading={<Loading />}
          className="rounded-md h-screen md:h-full  bg-[#16233A] border border-transparent"
          onChange={onChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorOnMount}
     />
}