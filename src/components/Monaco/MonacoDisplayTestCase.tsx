import { Editor, Monaco } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Loading } from "@/components/Loading/Loading";

interface Props {
     value?: string;
     onChange?: (value: string | undefined) => void;
     readOnly: boolean;
}

export const MonacoDisplayTestCase: React.FC<Props> = ({ value, onChange, readOnly }) => {
     const [editorHeight, setEditorHeight] = useState(100);

     const options = {
          contextmenu: false,
          fontFamily: "JetBrains Mono",
          fontSize: 16,
          lineHeight: 24,
          hideCursorInOverviewRuler: false,
          roundedSelection: false,
          readOnly: readOnly,
          cursorStyle: "line",
          automaticLayout: true,
          lineNumbers: "off",
          lineNumbersMinChars: 0,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 0, bottom: 0, left: 0, },
          scrollbar: {
               vertical: "hidden",
               horizontal: "hidden",
          },
          overviewRulerLanes: 0,
          renderLineHighlight: "none",
          glyphMargin: false,
          folding: false,
     };

     const handleEditorOnMount = (editor: any, monaco: Monaco) => {
          monaco.editor.setTheme("custom");
          const updateHeight = () => {
               const contentHeight = editor.getContentHeight();
               setEditorHeight(contentHeight);
               console.log(contentHeight)
               editor.layout();
          };

          updateHeight();
          editor.onDidChangeModelContent(updateHeight);
     };

     return (
          <Editor
               key={"displayTestCase"}
               options={options}
               value={value}
               loading={<Loading />}
               className="bg-transparent border border-transparent overflow-hidden"
               onChange={onChange}
               onMount={handleEditorOnMount}
               height={editorHeight}
          />
     );
};
