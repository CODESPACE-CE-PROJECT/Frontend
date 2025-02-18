import { LanguageType, StateSubmission } from "@/enum/enum";
import { ISubmission } from "./submission";

export type IProblem = {
  problemId: string;
  title: string;
  description: string;
  hint: string;
  language: LanguageType;
  revaleCode: string;
  score: number;
  isRegex: boolean;
  createdAt: string;
  updatedAt: string;
  assignmentTitle: string;
  courseTitle: string;
  assignmentId: string;
  testCases: ITestCase[],
  constraint: IConstraint[],
  submission: ISubmission[],
  other: IOtherProblem[]
}

export type ITestCase = {
  testCaseId: string;
  input: string;
  output: string;
  isHidden: boolean;
  problemId: string;
};

export type IConstraint = {
  constraintId: string;
  type: string;
  keyword: string;
  quantities: number;
  problemId: string;
};

export type IOtherProblem = {
  problemId: string;
  title: string;
  stateSubmission: StateSubmission;
}