import { IProfile } from "@/types/user";
import { IReplyAnnounce } from "./courseAnnounce";
import { AssignmentType } from "@/enum/enum";
import { AnnounceAssignmentType } from "@/enum/enum";


interface ICourseAnnounce {
  courseAnnounceId: string;
  username: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  replyAnnounce: IReplyAnnounce[];
  user: IProfile;
}

export type IAssignment = {
  assignmentId: string;
  username: string;
  title: string;
  type: AssignmentType;
  isLock: boolean;
  startAt: string;
  expireAt: string;
  announceType: AnnounceAssignmentType;
  announceDate: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  user: IProfile;
};

export type ICourse = {
  courseId: string;
  title: string;
  description: string;
  backgroundUrl: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string;
  courseAnnounce: ICourseAnnounce[];
  assignment: IAssignment[];
  user: IProfile,
};

export type IPeople = {
  courseStudent: {
    courseStudentId: string;
    user: IProfile;
  }[];
  courseTeacher: {
    courseTeacherId: string;
    user: IProfile;
  }[];
};
