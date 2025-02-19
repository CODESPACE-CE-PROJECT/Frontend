"use client";
import React from "react";
import XtermTerminal from "@/components/Workspace/Terminal";
import TerminalIcon from "@mui/icons-material/Terminal";

export default function WorkSpaceTerminal() {
  return (
    <div className="pt-2 w-5/12 h-screen bg-[#161D2D]">
      <div className="flex h-auto border-b-[0.5px] border-b-[#2A3A50]">
        <div className="flex flex-row bg-[#161D2D] rounded-t-lg border-t-[#5572FA] border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
          <TerminalIcon />
          <p className="text-[#C2C8CC] min-w-32">Terminal</p>
        </div>
      </div>

      <XtermTerminal />
    </div>
  );
}
