import { StateSubmission } from "@/enum/enum";

export interface IProblems {
  problemId: string;
  score: number;
  stateSubmission: StateSubmission;
}
