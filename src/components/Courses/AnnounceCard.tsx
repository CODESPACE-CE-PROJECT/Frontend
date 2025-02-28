import React, { useState } from "react";
import Image from "next/image";
import Divider from "@/components/Courses/Divider";
import ReplyBox from "@/components/Courses/ReplyBox";
import ReplyEditorBox from "@/components/Courses/ReplyEditorBox";
import { ICourseAnnounce } from "@/types/courseAnnounce";
import { getAvatar } from "@/utils/gender.util";

interface AnnounceProps {
  announce: ICourseAnnounce;
  profilePicture: string;
  handleReply: (message: string, courseAnnounceId: string) => void;
}

const AnnounceCard: React.FC<AnnounceProps> = ({
  announce,
  profilePicture,
  handleReply,
}) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div className="bg-[#16233A] rounded-md w-full">
      <div className="px-8">
        <div className="flex flex-row items-center space-x-5 font-light text-lg my-4">
          <Image
            src={announce.user.pictureUrl || getAvatar(announce.user.gender)}
            width={100}
            height={100}
            alt="Teacher Profile"
            className="h-12 w-12"
          />
          <div className="flex flex-row space-x-2">
            <p className="text-xl">{announce?.user?.firstName}</p>
            <p className="text-xl">{announce?.user?.lastName}</p>
          </div>
          <p className="text-sm">
            {new Date(announce.createdAt).toLocaleString("th")}
          </p>
        </div>

        <div className="my-6">{announce.description}</div>
        <Divider />
        {/* Reply Box */}
        <ReplyBox
          replies={announce.replyAnnounce}
          courseAnnounceId={announce.courseAnnounceId}
        />

        {announce.replyAnnounce.length > 0 && <Divider />}

        {/* Reply Editor Box */}
        <ReplyEditorBox
          profilePicture={profilePicture}
          activeReplyId={activeReplyId}
          setActiveReplyId={setActiveReplyId}
          courseAnnounceId={announce.courseAnnounceId}
          handleReply={handleReply}
        />
      </div>


    </div>
  );
};

export default AnnounceCard;
