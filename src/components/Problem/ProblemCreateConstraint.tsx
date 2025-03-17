import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DescriptionIcon from "@mui/icons-material/Description";
import { CancelButton } from "@/components/Button/CancelButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { TextField } from "@/components/Input/TextField/TextField";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IConstraint } from "@/types/problem";
import { ConstraintType } from "@/enum/enum";

interface SectionProps {
  title: string;
  items: IConstraint[];
  onChange: (updatedConstraints: IConstraint[]) => void;
}

const Section: React.FC<SectionProps> = ({ title, items, onChange }) => {
  const [toggle, setToggle] = useState<boolean>(true);

  const handleUpdateKeyword = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], keyword: value };
    onChange(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onChange(updatedItems);
  };

  const handleAddItem = () => {
    const newItem: IConstraint = {
      type: title === "Function" ? ConstraintType.FUNCTION : ConstraintType.CLASS,
      keyword: "",
      quantities: 0,
    };
    onChange([...items, newItem]);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="bg-[#3049724D] h-[54px] flex items-center rounded-md text-white font-medium shadow px-4 justify-between">
        {title} ({items.length})
        <KeyboardArrowDownIcon
          className={`cursor-pointer transform transition-transform ${toggle ? "rotate-180" : ""}`}
          onClick={() => setToggle((prev) => !prev)}
        />
      </div>

      {toggle && (
        <div className="flex flex-col gap-y-2">
          {items.map((item, index) => (
            <div className="flex flex-row items-center gap-x-2" key={index}>
              <TextField
                onChange={(value) => handleUpdateKeyword(index, value as string)}
                value={item.keyword}
                className="max-w-64"
              />
              <button onClick={() => handleRemoveItem(index)}>
                <RemoveCircleOutlineIcon className="text-red-l hover:text-red-600" />
              </button>
            </div>
          ))}
          <CancelButton className="hover:bg-gray-600 py-3 px-2 w-40" onClick={handleAddItem}>
            <div className="flex flex-row items-center justify-center w-full gap-x-2">
              <AddRoundedIcon />
              <p>เพิ่มคีย์เวิร์ด</p>
            </div>
          </CancelButton>
        </div>
      )}
    </div>
  );
};

interface Props {
  data: IConstraint[];
  onChange: (constraints: IConstraint[]) => void;
}

export const ProblemCreateConstraint: React.FC<Props> = ({ data, onChange }) => {
  const [constraint, setConstraint] = useState<IConstraint[]>(data);

  const handleUpdateConstraints = (updatedItems: IConstraint[], type: ConstraintType) => {
    const filteredConstraints = constraint.filter((item) => item.type !== type);
    const newConstraints = [...filteredConstraints, ...updatedItems];
    setConstraint(newConstraints);
    onChange(newConstraints);
  };

  return (
    <div className="flex w-full py-9 gap-8">
      <div className="w-1/2">
        <div className="text-white font-medium text-lg pb-2 mb-4 flex flex-row items-center gap-2">
          <DescriptionIcon className="size-6" />
          <p>ข้อจำกัดของคีย์เวิร์ดที่กำหนด</p>
        </div>
        <div className="flex flex-col gap-y-3">
          <Section
            title="Function"
            items={constraint.filter((item) => item.type === ConstraintType.FUNCTION)}
            onChange={(updatedItems) => handleUpdateConstraints(updatedItems, ConstraintType.FUNCTION)}
          />
          <Section
            title="Import"
            items={constraint.filter((item) => item.type === ConstraintType.CLASS)}
            onChange={(updatedItems) => handleUpdateConstraints(updatedItems, ConstraintType.CLASS)}
          />
        </div>
      </div>
    </div>
  );
};
