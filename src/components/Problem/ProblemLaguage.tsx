import { LanguageType } from "@/enum/enum";
import { 
     COriginal, 
     CplusplusOriginal, 
     JavaOriginal, 
     PythonOriginal, 
} from "devicons-react";

export const ProblemLanguage = () => {
     const getLanguageIcon = (language: LanguageType | undefined) => {
          switch (language) {
               case LanguageType.C:
                    return <COriginal size="24" />;
               case LanguageType.CPP:
                    return <CplusplusOriginal size="24" />;
               case LanguageType.JAVA:
                    return <JavaOriginal size="24" />;
               case LanguageType.PYTHON:
                    return <PythonOriginal size="24" />;
          }
     };

     return <div className="flex flex-row items-center justify-center max-w-28 gap-x-4 p-3 bg-table-header rounded-md">
          <p>{getLanguageIcon(LanguageType.PYTHON)}</p>
          <p className="text-lg">Code</p>
     </div>
}