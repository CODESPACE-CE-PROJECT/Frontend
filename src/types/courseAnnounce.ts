import { IProfile } from "./user";

export type ICourseAnnounce = {
  courseAnnounceId: string;
  username: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  replyAnnounce: IReplyAnnounce[];
  user: IProfile;
};

export type IReplyAnnounce = {
  replyAnnounceId: string;
  message: string;
  username: string;
  createAt: Date;
  updateAt: Date;
  courseAnnounceId: string;
  user: IProfile;
};

export type ICreateReply = {
  courseAnnounceId: string;
  message: string;
};
