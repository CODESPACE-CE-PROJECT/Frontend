import { StateSubmission } from "@/enum/enum";
import { LanguageType } from "@/enum/enum";
import { ConstraintType } from "@/enum/enum";
export interface IProblems {
  problemId: string;
  title?: string,
  score?: number;
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
    testcase: {
      input: string;
      output: string;
      isHidden: boolean;
    }[];
    constraint: {
      type: ConstraintType; 
      keyword: string;
      quantities: number;
    }[];
  }[];
};
