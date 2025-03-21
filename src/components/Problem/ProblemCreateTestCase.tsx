import { ITestCase } from "@/types/problem"
import ToggleButton from "@/components/Button/ToggleButton"
import { MonacoTestCase } from "@/components/Monaco/MonacoTestcase"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { CancelButton } from "../Button/CancelButton";
import { useState } from "react";

interface TestCaseProps {
  data: ITestCase[],
  onChange: (item: ITestCase[]) => void,
  isRegex: boolean,
  onChangeRegex: () => void,
}

export const ProblemCreateTestCase: React.FC<TestCaseProps> = ({ data, onChange, isRegex, onChangeRegex }) => {
  const [testCase, setTestCase] = useState<ITestCase[]>(data);

  const handleChange = (index: number, value: string | undefined, name: string) => {
    const updatedItems = [...testCase];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setTestCase(updatedItems);
    onChange(updatedItems);
  };

  const handleHiddenTestCase = (index: number) => {
    const updatedItems = [...testCase];
    updatedItems[index] = { ...updatedItems[index], isHidden: !updatedItems[index].isHidden };
    setTestCase(updatedItems);
    onChange(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = testCase.filter((_, i) => i !== index);
    setTestCase(updatedItems);
    onChange(updatedItems);
  };

  const handleAddItem = () => {
    const newItem: ITestCase = {
      input: "",
      output: "",
      isHidden: false
    };
    const updatedItems = [...testCase, newItem];
    setTestCase(updatedItems);
    onChange(updatedItems);
  };

  return (
    <>
      <div className="my-4 flex items-center rounded-lg justify-between">
        <span className="text-white font-medium text-lg">ตัวอย่าง</span>
        <div className="space-x-3 flex">
          <CancelButton className="py-2 px-4 hover:bg-gray-600" onClick={handleAddItem}>
            เพิ่มตัวอย่าง
          </CancelButton>
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        {testCase.map((item, index) => (
          <div className="w-full" key={index}>
            <div className="flex flex-row items-center bg-blackground-text w-full justify-between px-4 py-2">
              <p>ตัวอย่าง {index + 1}</p>
              <div className="flex flex-row items-center gap-x-2">
                <div className="flex flex-row items-center gap-x-2">
                  <ToggleButton onToggle={() => onChangeRegex()} isChecked={isRegex} />
                  <p>วิเคราะห์ช่องว่าง</p>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                  <ToggleButton onToggle={() => handleHiddenTestCase(index)} isChecked={!item.isHidden} />
                  <p>แสดงตัวอย่างให้นักเรียน</p>
                </div>
                <button onClick={() => handleRemoveItem(index)}>
                  <RemoveCircleOutlineIcon className="text-red-l hover:text-red-600" />
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-x-2">
              <MonacoTestCase
                readOnly={false}
                value={item.input}
                onChange={(value) => handleChange(index, value, "input")}
                linenumber={true}
              />
              <MonacoTestCase
                readOnly={false}
                value={item.output}
                onChange={(value) => handleChange(index, value, "output")}
                linenumber={true}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
