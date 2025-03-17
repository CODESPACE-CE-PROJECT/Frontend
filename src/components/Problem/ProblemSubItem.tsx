import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CodeIcon from "@mui/icons-material/Code";
import { MonacoTextEditor } from "@/components/Monaco/MonacoTextEditor";
import { ProblemCreateConstraint } from "@/components/Problem/ProblemCreateConstraint";
import { CancelButton } from "@/components/Button/CancelButton";
import { Label } from "@/components/Input/Label";
import { TextField } from "@/components/Input/TextField/TextField";
import { Dropdown } from "@/components/Input/Dropdown";
import { LexicalEditor } from "@/components/LexicalEditor/LexicalEditor";
import { IProblem } from "@/types/assignment";
import { convertEnumLanguage, textLanguage } from "@/utils/text.util";
import { ProblemCreateTestCase } from "@/components/Problem/ProblemCreateTestCase";
import { IConstraint, ITestCase } from "@/types/problem";

interface Props {
  updateData?: IProblem[],
  createData?: IProblem[],
  onChange: (value: string | number | boolean, name: string, type: "create" | "update", index: number) => void,
  deleteSubItem: (index: number, type: "create" | "update", problemId: string | undefined) => void,
  onConstraintChange: (item: IConstraint[], type: "create" | "update", index: number) => void,
  onTestCaseChange: (item: ITestCase[], type: "create" | "update", index: number) => void,
}

export const ProblemSubItem: React.FC<Props> = ({ updateData, createData, deleteSubItem, onChange, onConstraintChange, onTestCaseChange }) => {
  const [expanded, setExpanded] = useState<{
    index: number,
    type: "update" | "create",
    isOpen: boolean
  }>();
  const toggleForm = (index: number, type: "create" | "update") => {
    setExpanded((prev) => ({
      index: index,
      type: type,
      isOpen: prev?.index === index || prev?.type === type ? !prev?.isOpen : true
    }));
  };
  return (
    <>
      {Array.isArray(updateData) && updateData?.map((item, index) => (
        <div key={index} className="flex flex-col py-4">
          <div className="flex justify-between items-center border-b border-[#2A3A50] p-5">
            <div>{`ข้อย่อยข้อที่ ${index + 1}`}</div>
            <div className="flex flex-row items-center gap-x-4">
              <CancelButton
                className="px-12 py-2 border-red-l text-red-l hover:bg-red-600 hover:text-pure-white"
                onClick={() => deleteSubItem(index, "update", item.problemId)}
              >
                <p>ลบ</p>
              </CancelButton>
              <KeyboardArrowDownIcon
                onClick={() => toggleForm(index, "update")}
                className={`cursor-pointer ${expanded?.isOpen && expanded?.index === index && expanded.type === "update" ? 'rotate-180' : ''} hover:text-primary`}
              />
            </div>
          </div>

          {expanded?.isOpen && expanded?.type === "update" && expanded?.index === index && (
            <>
              <div className="text-white font-sans flex justify-between my-5 gap-x-6">
                <div className="flex flex-col items-start flex-1">
                  <Label text="หัวข้อ" isRequired={true} />
                  <TextField
                    name="title"
                    value={item?.title}
                    className="mt-2 py-2 px-3 text-white rounded-md"
                    placeholder="หัวข้อ"
                    onChange={(value, name) => onChange(value, name, "update", index)}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-y-2">
                    <Label text="ภาษาโปรแกรมมิ่ง" isRequired={true} />
                    <Dropdown
                      name="language"
                      value={textLanguage(item.language)}
                      options={["Python", "Java", "C", "Cpp"]}
                      className="z-50"
                      onChange={(value, name) => onChange(convertEnumLanguage(value), name, "update", index)}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <Label text="คะแนน" isRequired={true} />
                    <TextField
                      name="score"
                      value={item.score?.toString()}
                      className="bg-[#2A3A50] mt-2 py-2 px-4 text-white rounded-md w-[160px]"
                      isNumberic={true}
                      onChange={(value, name) => onChange(value, name, "update", index)}
                    />
                  </div>
                </div>
              </div>

              <LexicalEditor
                value={item.description}
                onChange={(editorState) => onChange(editorState, "description", "update", index)}
              />

              <div className="mb-4 mt-9 flex items-center rounded-lg justify-between">
                <div className="flex flex-row items-center gap-x-2">
                  <CodeIcon />
                  <p className="font-medium">Source Code:</p>
                </div>
              </div>

              <div className="w-full h-[400px]">
                <MonacoTextEditor
                  sourceCode={item.revaleCode}
                  language={item.language}
                  onChange={(value) => value && onChange(value, "revaleCode", "update", index)}
                />
              </div>

              <ProblemCreateConstraint
                data={item.constraint}
                onChange={(item) => onConstraintChange(item, "update", index)}
              />

              <ProblemCreateTestCase
                data={item.testCases}
                onChange={(item) => onTestCaseChange(item, "update", index)}
                onChangeRegex={() => onChange(!item.isRegex, "isRegex", "update", index)}
                isRegex={item.isRegex}
              />

            </>
          )}
        </div>
      ))}

      {Array.isArray(createData) && createData?.map((item, index) => (
        <div key={index} className="flex flex-col py-4">
          <div className="flex justify-between items-center border-b border-[#2A3A50] p-5">
            <div>{`ข้อย่อยข้อที่ ${index + 1 + (updateData?.length ?? 0)}`}</div>
            <div className="flex flex-row items-center gap-x-4">
              <CancelButton
                className="px-12 py-2 border-red-l text-red-l hover:bg-red-600 hover:text-pure-white"
                onClick={() => deleteSubItem(index, "create", item.problemId)}
              >
                <p>ลบ</p>
              </CancelButton>
              <KeyboardArrowDownIcon
                onClick={() => toggleForm(index, "create")}
                className={`cursor-pointer ${expanded?.isOpen && expanded?.index === index && expanded.type === "create" ? 'rotate-180' : ''} hover:text-primary`}
              />
            </div>
          </div>

          {expanded?.isOpen && expanded?.type === "create" && expanded?.index === index && (
            <>
              <div className="text-white font-sans flex justify-between my-5 gap-x-6">
                <div className="flex flex-col items-start flex-1">
                  <Label text="หัวข้อ" isRequired={true} />
                  <TextField
                    name="title"
                    value={item?.title}
                    className="mt-2 py-2 px-3 text-white rounded-md"
                    placeholder="หัวข้อ"
                    onChange={(value, name) => onChange(value, name, "create", index)}
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col gap-y-2">
                    <Label text="ภาษาโปรแกรมมิ่ง" isRequired={true} />
                    <Dropdown
                      value={textLanguage(item.language)}
                      name="language"
                      options={["Python", "Java", "C", "Cpp"]}
                      className="z-50"
                      onChange={(value, name) => onChange(convertEnumLanguage(value), name, "create", index)}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <Label text="คะแนน" isRequired={true} />
                    <TextField
                      name="score"
                      value={item.score?.toString()}
                      className="bg-[#2A3A50] mt-2 py-2 px-4 text-white rounded-md w-[160px]"
                      isNumberic={true}
                      onChange={(value, name) => onChange(value, name, "create", index)}
                    />
                  </div>
                </div>
              </div>

              <LexicalEditor
                value={item.description}
                onChange={(editorState) => onChange(editorState, "description", "create", index)}
              />

              <div className="mb-4 mt-9 flex items-center rounded-lg justify-between">
                <div className="flex flex-row items-center gap-x-2">
                  <CodeIcon />
                  <p className="font-medium">Source Code:</p>
                </div>
              </div>

              <div className="w-full h-[400px]">
                <MonacoTextEditor
                  sourceCode={item.revaleCode}
                  language={item.language}
                  onChange={(value) => value && onChange(value, "revaleCode", "create", index)}
                />
              </div>

              <ProblemCreateConstraint
                data={item.constraint}
                onChange={(item) => onConstraintChange(item, "create", index)}
              />

              <ProblemCreateTestCase
                data={item.testCases}
                onChange={(item) => onTestCaseChange(item, "create", index)}
                onChangeRegex={() => onChange(!item.isRegex, "isRegex", "create", index)}
                isRegex={item.isRegex}
              />
            </>
          )}
        </div>
      ))}
    </>
  );
};
