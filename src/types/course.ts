interface IUser {
  firstName: string;
  lastName: string;
  pictureUrl: string;
}

interface ICourseAnnounce {
  courseAnnounceId: string;
  username: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  replyAnnounce: any[];
  user: IUser;
}

interface IAssignment {
  assignmentId: string;
  username: string;
  title: string;
  type: "EXERCISE" | "EXAMONSITE";
  isLock: boolean;
  startAt: string;
  expireAt: string;
  announceType: "ANNOUNCED";
  announceDate: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  user: IUser;
}

export type ICourse = {
  courseId: string;
  title: string;
  description: string;
  backgroundUrl: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  schoolId: string;
  courseAnnounce: ICourseAnnounce[];
  assignment: IAssignment[];
}
