import { ITestCase } from "@/types/problem"
import ToggleButton from "@/components/Button/ToggleButton"
import { MonacoTestCase } from "@/components/Monaco/MonacoTestcase"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface TestCaseProps {
  data: ITestCase,
  index: number,
  isRegex: boolean
}

export const ProblemCreateTestCase: React.FC<TestCaseProps> = ({ data, index, isRegex }) => {
  return <div className="flex flex-col w-full">
    <div className="flex flex-row items-center bg-blackground-text w-full justify-between px-4 py-2">
      <p>ตัวอย่าง {index}</p>
      <div className="flex flex-row items-center gap-x-2">
        <div className="flex flex-row items-center gap-x-2">
          <ToggleButton onToggle={() => { }} isChecked={isRegex} />
          <p>วิเคราะห์ช่องว่าง</p>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <ToggleButton onToggle={() => { }} isChecked={data.isHidden} />
          <p>แสดงตัวอย่างให้นักเรียน</p>
        </div>
        <button>
          <RemoveCircleOutlineIcon className="text-red-l hover:text-red-600" />
        </button>
      </div>
    </div>
    <div className="flex flex-row gap-x-2">
      <MonacoTestCase readOnly={false} value={data.input} />
      <MonacoTestCase readOnly={false} value={data.output} />
    </div>
  </div>
}