import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import ReplyToolbar from "@/components/Lexical/ReplyToolbar";
import SendIcon from "@mui/icons-material/Send";

const editorConfig = {
  namespace: "Replybox",
  theme: {},
  onError() {
    console.log("editor error");
  },
  nodes: [],
};

export default function ReplyEditor({ onSend }: { onSend: () => void }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="relative w-full">
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="border p-2 min-h-[100px]" />
          }
          placeholder={
            <span className="absolute top-2 left-2 text-gray-400">Reply</span>
          }
          ErrorBoundary={() => <div>Error loading editor</div>}
        />
        <div className="flex flex-row w-full items-center">
          <ReplyToolbar />
          <button
            onClick={onSend}
            className="px-3 py-1 hover:bg-blackground-text rounded-xl"
          >
            <SendIcon fontSize="medium" />
          </button>
        </div>
        <HistoryPlugin />
        <OnChangePlugin onChange={(editorState) => console.log(editorState)} />
      </div>
    </LexicalComposer>
  );
}
