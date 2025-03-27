"use client";

import React from "react";
import TerminalIcon from "@mui/icons-material/Terminal";
import { MonacoFieldBox } from "@/components/Monaco/MonacoFieldBox";

interface Props {
  output?: string,
  onInputChange: (value: string | undefined) => void
}

export const InputOutput: React.FC<Props> = ({ output, onInputChange }) => {
  return (
    <>
      <div className="flex flex-col w-5/12">
        <div className="flex flex-col w-full h-[50vh] pt-2 bg-[#161D2D]">
          <div className="flex w-40 h-auto flex-row bg-[#161D2D] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
            <TerminalIcon />
            <p className="text-[#C2C8CC] min-w-32">INPUT</p>
          </div>
          <div className=" border-blackground-text border-t-[0.5px]"></div>
          <MonacoFieldBox onChange={onInputChange} readOnly={false}/>
        </div>

        <div className="flex flex-col w-full h-[50vh] pt-2 bg-[#161D2D]">
          <div className="flex w-40 h-auto flex-row bg-[#161D2D] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
            <TerminalIcon />
            <p className="text-[#C2C8CC] min-w-32">OUTPUT</p>
          </div>
          <div className=" border-blackground-text border-t-[0.5px]"></div>
          <MonacoFieldBox value={output} readOnly={true}/>
        </div>
      </div>
    </>
  );
}
