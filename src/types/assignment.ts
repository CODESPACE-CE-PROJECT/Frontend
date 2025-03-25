import { AssignmentType, LanguageType } from "@/enum/enum";
import { AnnounceAssignmentType } from "@/enum/enum";
import { StateSubmission } from "@/enum/enum"
import { ITestCase, IConstraint } from "./problem";

export type IProblem = {
  problemId?: string;
  title: string;
  description: string;
  hint: string;
  language: LanguageType;
  revaleCode: string;
  score: number;
  isRegex: boolean;
  isExpire?: boolean;
  createdAt?: string;
  updatedAt?: string;
  assignmentId?: string;
  testCases: ITestCase[],
  constraint: IConstraint[],
  stateSubmission?: StateSubmission;
}

export type IAssignment = {
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
  checkOutside: boolean;
  courseId: string;
  problem: IProblem[];
  totalScore: number;
}

export type IAssignmentStudent = {
  assignment: IAssignment[];
  dashboard: IDashboard
}

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
    assignmentId: string;
    title: string;
    type: AssignmentType;
    isLock: boolean;
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
    totalScoreProblem?: number;
};

export type IUpdateAssignment = {
  title: string;
  type?: AssignmentType;
  announceDate: Date;
  startAt: Date;
  expireAt: Date;
}