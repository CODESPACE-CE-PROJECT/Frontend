import { StateSubmission } from "@/enum/enum";

export interface IProblems {
  problemId: string;
  title?: string,
  score?: number;
  stateSubmission: StateSubmission;
}