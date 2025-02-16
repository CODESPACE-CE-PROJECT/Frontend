import React, { useState } from "react";
import Image from "next/image";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserProfileIcon from "@/assets/CoursesAssets/UserProfileIcon.svg";
import { IReplyAnnounce } from "@/types/courseAnnounce";

interface ReplyBoxProps {
  replies: IReplyAnnounce[];
  courseAnnounceId: string;
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ replies, courseAnnounceId }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (replies.length === 0) return null;

  return (
    <div className="flex flex-col items-start space-y-2 mx-8 my-3">
      {replies.length > 1 && (
        <button
          className="text-sm px-2 py-1 rounded hover:bg-table-header bg-blackground-text space-x-1"
          onClick={() => setExpanded(!expanded)}
        >
          <span>มีการตอบกลับ</span>
          <span>{replies.length}</span>
          <span>ครั้ง</span>
          {expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
        </button>
      )}

      {/* Display replies */}
      {(expanded ? replies.slice(0).reverse() : replies.slice(0, 1)).map((reply) => (
        <div key={reply.replyAnnounceId} className="flex items-center space-x-3">
          <Image
            src={reply.user.pictureUrl || UserProfileIcon}
            width={100}
            height={100}
            alt="User Profile"
            className="h-10 w-10 border rounded-full border-blackground-text"
          />
          <div className="flex flex-col">
            <div className="flex flex-row items-center space-x-5">
              <p className="font-semibold">{reply.user.firstName} {reply.user.lastName}</p>
              <p className="text-sm font-light text-gray-400">
                {new Date(reply.createAt).toLocaleString("th")}
              </p>
            </div>
            <p className="text-sm text-wrap">{reply.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyBox;
