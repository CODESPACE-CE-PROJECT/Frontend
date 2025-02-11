import React, { useState } from "react";
import Image from "next/image";
import Divider from "@/components/Courses/Divider";
import TeacherProfile from "@/assets/CoursesAssets/TeacherIcon.svg";
import ReplyBox from "@/components/Courses/ReplyBox";
import ReplyEditorBox from "@/components/Courses/ReplyEditorBox";
import { ICourseAnnounce } from "@/types/courseAnnounce";

interface AnnounceProps {
  announce: ICourseAnnounce;
  profilePicture: string;
  handleReply: (message: string, courseAnnounceId: string) => void;
}

const AnnounceCard: React.FC<AnnounceProps> = ({ announce, profilePicture, handleReply }) => {
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  return (
    <div className="bg-[#16233A] rounded-md w-full">
      <div className="mx-8">        
        <div className="flex flex-row items-center space-x-5 font-light text-lg my-4">
          <Image
            src={announce.user.pictureUrl || TeacherProfile}
            width={100}
            height={100}
            alt="Teacher Profile"
            className="h-12 w-12"
          />
          <div className="flex flex-row space-x-2">
            <p className="text-xl">{announce?.user?.firstName}</p>
            <p className="text-xl">{announce?.user?.lastName}</p>
          </div>
          <h2 className="text-sm">{new Date(announce.createdAt).toLocaleString()}</h2>
        </div>

        {announce.description.split("\r\n").map((line, index) => (
          <div key={index} className={index === 0 ? "font-bold pb-3" : "font-normal pb-3"}>
            {line}
          </div>
        ))}
      </div>
      
      <Divider />
      
      {/* Reply Box */}
      <ReplyBox replies={announce.replyAnnounce} courseAnnounceId={announce.courseAnnounceId} />
      
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
  );
};

export default AnnounceCard;
