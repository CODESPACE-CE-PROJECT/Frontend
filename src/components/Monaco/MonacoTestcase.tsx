import { Editor, Monaco } from "@monaco-editor/react"
import { Loading } from "@/components/Loading/Loading";

interface Props {
     value?: string,
     onChange?: (value: string | undefined) => void,
     readOnly: boolean
}

export const MonacoTestCase: React.FC<Props> = ({ value, onChange, readOnly }) => {
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
                    "editor.forefround": "#161D2D",
                    "editor.background": "#161D2D",
                    "editorCursor.foreground": "#F8F8F0",
                    "editorWhitespace.foreground": "#3B3A32",
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
               top: 10,
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
          className="h-36 bg-[#16233A] border border-transparent overflow-hidden"
          onChange={onChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorOnMount}
     />
}