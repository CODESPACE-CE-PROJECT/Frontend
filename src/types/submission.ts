import { LanguageType, StateSubmission } from "@/enum/enum"

export type ISubmission = {
     submissionId: string;
     problemId: string;
     username: string;
     sourceCode: string;
     no: number;
     result: ISubmissionResult[];
     stateSubmission: StateSubmission;
     createdAt: string;
}

export type ISubmissionResult = {
     output: string;
     isPass: boolean;
};

export type ISubmitCode = {
  problemId: string;
  sourceCode?: string;
  language: LanguageType;
  fileName?: string;
}