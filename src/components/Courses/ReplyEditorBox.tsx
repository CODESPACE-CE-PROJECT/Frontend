import React, { useState } from "react";
import Image from "next/image";
import SendIcon from '@mui/icons-material/Send';
import { ReplyEditor } from "../LexicalEditor/ReplyEditor";
import { checkValidMessage } from "@/utils/text.util";

interface ReplyEditorBoxProps {
  courseAnnounceId: string;
  profilePicture: string;
  activeReplyId: string | null;
  setActiveReplyId: React.Dispatch<React.SetStateAction<string | null>>;
  handleReply: (message: string, courseAnnounceId: string) => void;
}

const ReplyEditorBox: React.FC<ReplyEditorBoxProps> = ({    
  courseAnnounceId,
  profilePicture,
  handleReply,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [message, setMessage] = useState<string>(`{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`)
  
  const handleReplyMessage = () => {
    handleReply(message, courseAnnounceId)
    setMessage(`{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`)
  }

  return (
    <div className="flex flex-row items-center justify-start gap-x-2 my-4 w-full">
      <Image
        src={profilePicture}
        width={100}
        height={100}
        alt="User Profile"
        className={`size-8 ${isFocus ? 'mt-1 self-start': ''} border rounded-full border-blackground-text`}
      />
      <div className="w-full h-full">
        <ReplyEditor isFocus={isFocus} value={message} onFocus={(value) => setIsFocus(value)} onChange={(value) => setMessage(value)}/>
      </div>
      <button className={`${isFocus ? 'mt-2 self-start' : ''} hover:text-gray-400 disabled:text-gray-600`} onClick={() => handleReplyMessage()} disabled={!checkValidMessage(message)}>
        <SendIcon fontSize="medium"/>
      </button>
    </div>
  );
};

export default ReplyEditorBox;
