import {
     getLanguageFriendlyName,
} from '@lexical/code';
import DropDown, { DropDownItem } from '@/components/LexicalEditor/ui/DropDown';
import { 
     COriginal, 
     CplusplusOriginal, 
     JavaOriginal, 
     PythonOriginal, 
} from "devicons-react";

type Props = {
     codeLanguage: string,
     isEditable: boolean,
     onCodeLanguageSelect: (val: string) => void
}

export const LANGUAGE_ICONS: { [key: string]: JSX.Element } = {
     'py': (
          <PythonOriginal size="24"/>
     ),
     "c": (
         <COriginal size="24"/>
     ),
     "cpp": (
          <CplusplusOriginal size="24"/>
     ),
     "java": (
         <JavaOriginal size="24"/>
     ),
};

export default function CodeBlockPlugin({ codeLanguage, isEditable, onCodeLanguageSelect }: Props) {
     const CODE_LANGUAGE_OPTIONS = [
          ['c', 'C'],
          ['cpp', 'C++'],
          ['py', 'Python'],
          ['java', 'Java']
     ];

     return (
          <DropDown
               disabled={!isEditable}
               buttonClassName="flex flex-row gap-x-3 items-center"
               buttonLabel={getLanguageFriendlyName(codeLanguage)}
               LabeClassName={"max-sm:hidden"}
               buttonIconClassName={LANGUAGE_ICONS[codeLanguage]}
               buttonAriaLabel="Select language"
          >
               {CODE_LANGUAGE_OPTIONS.map(([value, name]) => (
                    <DropDownItem
                         onClick={() => onCodeLanguageSelect(value)}
                         key={value}
                         className="flex items-center justify-start gap-x-2"
                    >
                         {LANGUAGE_ICONS[value] || null}
                         <span>{name}</span>
                    </DropDownItem>
               ))}
          </DropDown>    
     );
};