import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IReplyAnnounce } from "@/types/courseAnnounce";
import { LexicalViewer } from "@/components/LexicalEditor/LexicalViewer";
import { getAvatar } from "@/utils/gender.util";

interface ReplyBoxProps {
  replies: IReplyAnnounce[];
}

const ReplyBox: React.FC<ReplyBoxProps> = ({ replies }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const replyBoxRef = useRef<HTMLDivElement>(null);
  const hanedleClickOutside = (e: MouseEvent) => {
    if (replyBoxRef.current && !replyBoxRef.current.contains(e.target as Node)) {
      setExpanded(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", hanedleClickOutside);
    return () => document.removeEventListener("mousedown", hanedleClickOutside);
  }, [])

  if (replies.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-y-4 my-3" ref={replyBoxRef}>
      {replies.length > 1 && (
        <button
          className="text-sm py-1 rounded hover:underline hover:text-primary"
          onClick={() => setExpanded(!expanded)}
        >
          <p>มีการตอบกลับ {replies.length} ครั้ง</p>
        </button>
      )}

      {/* Display replies */}
      {(expanded ? replies.slice(0).reverse() : replies.slice(0, 1)).map((reply) => (
        <div key={reply.replyAnnounceId} className="flex items-center space-x-3">
          <Image
            src={reply.user.pictureUrl || getAvatar(reply.user.gender)}
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
            <LexicalViewer value={reply.message} namespace="Reply Lexical" className="w-full"/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyBox;
