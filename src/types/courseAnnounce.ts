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
  replyAnnounce: any[];
  user: IUser;
};
