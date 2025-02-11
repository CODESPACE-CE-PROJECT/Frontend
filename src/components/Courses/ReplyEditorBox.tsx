import React from "react";
import Image from "next/image";
import UserProfileIcon from "@/assets/CoursesAssets/UserProfileIcon.svg";
import ReplyEditor from "@/components/Courses/ReplyEditor";

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
  return (
    <div className="flex flex-row items-start space-x-2 mx-8 my-4">
      <Image
        src={profilePicture || UserProfileIcon}
        width={100}
        height={100}
        alt="User Profile"
        className="h-10 w-10 border rounded-full border-blackground-text"
      />
      {activeReplyId !== courseAnnounceId ? (
        <button
          className="text-sm px-2 py-1 self-center hover:bg-blackground-text rounded"
          onClick={() => setActiveReplyId(courseAnnounceId)}
        >
          Reply
        </button>
      ) : (
        <ReplyEditor onSend={(message) => handleReply(message, courseAnnounceId)} />
      )}
    </div>
  );
};

export default ReplyEditorBox;
