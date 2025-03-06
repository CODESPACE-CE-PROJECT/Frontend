import { AssignmentType } from "@/enum/enum";
import { AnnounceAssignmentType } from "@/enum/enum";
import { StateSubmission } from "@/enum/enum";

export type IAssignment = {
  assignment: {
    assignmentId: string;
    username: string;
    title: string;
    type: AssignmentType;
    isLock: boolean;
    startAt: Date;
    expireAt: Date;
    announceType: AnnounceAssignmentType;
    announceDate: Date;
    createdAt: Date;
    updatedAt: Date;
    courseId: string;
    problem: [
      {
        problemId: string;
        score: number;
        stateSubmission: StateSubmission;
      }
    ];
    totalScore: number;
  }[];
  
};

export type ICreateAssignment = {
  courseId: string;
  title: string;
  type: AssignmentType;
  announceDate: Date;
  startAt: Date;
  expireAt: Date;
};

export type IUpdateLock = {
  assignmentId: string;
  isLock: boolean;
};

export type IScoreRange = {
  range: string;
  count: number;
};

export type IDashboard = {
  maxScore: number;
  minScore: number;
  averageScore: number;
  totalStudent: number;
  range: IScoreRange[];
};

export type IAssignmentScore = {
  data: {
    assignmentId: string;
    title: string;
    type: AssignmentType;
    scores: {
      username: string;
      firstName: string;
      lastName: string;
      problems: {
        problemId: string;
        score: number;
        status: string;
      }[];
      totalScore: number;
    }[];
  }[];
};
