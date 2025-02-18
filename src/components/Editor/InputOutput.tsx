"use client";

import React from "react";
import TerminalIcon from "@mui/icons-material/Terminal";
import { TextArea } from "@/components/Input/TextArea";

interface Props {
  output?: string,
  onInputChage: (value: string, name: string) => void
}

export const InputOutput:React.FC<Props> = ({output, onInputChage}) => {
  return (
    <>
      <div className="flex flex-col w-5/12">
        <div className="flex flex-col w-full h-[50vh] pt-2 bg-[#161D2D]">
          <div className="flex w-40 h-auto flex-row bg-[#161D2D] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
            <TerminalIcon />
            <p className="text-[#C2C8CC] min-w-32">INPUT</p>
          </div>
          <div className=" border-blackground-text border-t-[0.5px]"></div>
          <TextArea
            name="input"
            placeholder="Input for the program (Optional)"
            className="w-[100%] h-5/6 p-4 scrollbar-x-custom bg-transparent font-jetbrains text-nowrap rounded-none shadow-none border-none resize-none focus:!outline-none"
            onChange={onInputChage}
          />
        </div>

        <div className="flex flex-col w-full h-[50vh] pt-2 bg-[#161D2D]">
          <div className="flex w-40 h-auto flex-row bg-[#161D2D] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
            <TerminalIcon />
            <p className="text-[#C2C8CC] min-w-32">OUTPUT</p>
          </div>
          <div className=" border-blackground-text border-t-[0.5px]"></div>
          <div className="w-full h-full p-4 overflow-auto font-jetbrains text-nowrap">
            {output}
          </div>
        </div>
      </div>
    </>
  );
}
