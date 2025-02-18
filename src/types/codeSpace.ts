import { LanguageType } from "@/enum/enum";

export type ICodeSpace = {
  codeSpaceId: string;
  language: LanguageType;
  sourceCode: string;
  fileName: string;
  username: string;
};

export type ICreateCodeSpace = {
  language: LanguageType;
  sourceCode: string;
  filename: string;
};

export type IUpdateCodeSpace = {
  language?: LanguageType;
  sourceCode?: string;
  filename?: string;
};
