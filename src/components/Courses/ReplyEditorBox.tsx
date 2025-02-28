import React, { useState } from "react";
import Image from "next/image";
import UserProfileIcon from "@/assets/CoursesAssets/UserProfileIcon.svg";
import SendIcon from '@mui/icons-material/Send';
import { ReplyEditor } from "../LexicalEditor/ReplyEditor";

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
  activeReplyId,
  setActiveReplyId,
  handleReply,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  return (
    <div className="flex flex-row items-center justify-start gap-x-2 my-4 w-full">
      <Image
        src={profilePicture || UserProfileIcon}
        width={100}
        height={100}
        alt="User Profile"
        className={`size-8 ${isFocus ? 'mt-1 self-start': ''} border rounded-full border-blackground-text`}
      />
      <div className="w-full h-full">
        <ReplyEditor isFocus={isFocus} onFocus={(value) => setIsFocus(value)} onChange={(value) => setMessage(value)}/>
      </div>
      <button className={`${isFocus ? 'mt-2 self-start' : ''} hover:text-gray-400`} onClick={() => handleReply(message, courseAnnounceId)}>
        <SendIcon fontSize="medium"/>
      </button>
    </div>
  );
};

export default ReplyEditorBox;
