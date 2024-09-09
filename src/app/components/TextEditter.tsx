import Codeicon from "../../../src/app/assets/HomeworkAssets/CodeIcon.svg"
import Image from 'next/image'
import Editor from "@monaco-editor/react";

export default function TextEditter() {

    return (
        <>
            <div>
                <div className="bg-[#161e2e] rounded-t-lg text-[#a2a5ab] flex flex-row pt-1 pb-1 pl-2 ">
                    <Image src={Codeicon} alt="" className="w-4" />
                    <div className="pl-2">Code</div>
                </div>
                <Editor
                    height="50vh"
                    width="50vw"
                    defaultLanguage="cpp"
                    defaultValue={`#include <iostream>
using namespace std;

int main() {

  int first_number, second_number, sum;
    
  cout << "Enter two integers: ";
  cin >> first_number >> second_number;

  // sum of two numbers in stored in variable sumOfTwoNumbers
  sum = first_number + second_number;

  // prints sum 
  cout << first_number << " + " <<  second_number << " = " << sum;     

  return 0;
}`}


                    theme="vs-dark"
                />
            </div>

        </>




    )


}
