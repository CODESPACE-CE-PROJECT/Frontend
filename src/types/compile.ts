import { LanguageType } from "@/enum/enum";

export type ICompileCode = {
     sourceCode: string;
     language: LanguageType;
     fileName: string;
     input: string;
     username: string;
}