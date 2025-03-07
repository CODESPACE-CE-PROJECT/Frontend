import { StateSubmission } from "@/enum/enum";
import { LanguageType } from "@/enum/enum";
import { ConstraintType } from "@/enum/enum";
import { ISubmission } from "@/types/submission";

export type IProblem = {
  problemId: string;
  title: string;
  description: string;
  hint: string;
  language: LanguageType;
  revaleCode: string;
  score: number;
  isRegex: boolean;
  isExpire: boolean;
  createdAt: string;
  updatedAt: string;
  assignmentTitle: string;
  courseTitle: string;
  assignmentId: string;
  testCases: ITestCase[],
  constraint: IConstraint[],
  submission?: ISubmission[],
  other?: IOtherProblem[]
}

export type ITestCase = {
  testCaseId?: string;
  input: string;
  output: string;
  isHidden: boolean;
  problemId?: string;
};

export type IConstraint = {
  constraintId?: string;
  type: ConstraintType;
  keyword: string;
  quantities: number;
  problemId?: string;
};

export type IOtherProblem = {
  problemId: string;
  title: string;
  stateSubmission: StateSubmission;
}

export type ICreateProblems = {
  assignmentId: string;
  problem: {
    title: string;
    description: string;
    hint: string;
    language: LanguageType;
    revaleCode: string;
    isRegex: boolean;
    score: number;
    testCases: ITestCase[];
    constraint: IConstraint[];
  }[];
};

export type IUpdateProblem = {
  problemId?:string;
  title: string;
  description: string;
  hint: string;
  language: LanguageType;
  revaleCode: string;
  isRegex: boolean;
  score: number;
  testCases: ITestCase[];
  constraint: IConstraint[];
}
