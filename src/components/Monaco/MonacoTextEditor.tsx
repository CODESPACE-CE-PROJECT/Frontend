import { LanguageType } from "@/enum/enum";
import { Editor, Monaco } from "@monaco-editor/react"
import { Loading } from "@/components/Loading/Loading";

interface Props {
     language: LanguageType,
     sourceCode: string,
     onChange: (value: string) => void
}


export const MonacoTextEditor = () => {
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

     const handleEditorOnMount = (_editor: any, monaco: Monaco) => {
          monaco.editor.setTheme("custom");
     };

     return <Editor
          options={{ fontSize: 16, fontFamily: "JetBrains Mono" }}
          language="cpp"
          value=""
          loading={<Loading />}
          className="rounded-md h-screen md:h-full  bg-[#16233A] border border-transparent p-1 py-3"
          onChange={(value) => console.log(value)}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorOnMount}
     />
}