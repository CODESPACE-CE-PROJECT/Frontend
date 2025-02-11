interface IUser {
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

export type ICourseAnnounce = {
  courseAnnounceId: string;
  username: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  replyAnnounce: IReplyAnnounce[];
  user: IUser;
};

export type IReplyAnnounce = {
  replyAnnounceId: string;
  message: string;
  username: string;
  createAt: Date;
  updateAt: Date;
  courseAnnounceId: string;
  user: IUser;
};

export type ICreateReply = {
  courseAnnounceId: string;
  message: string;
};
