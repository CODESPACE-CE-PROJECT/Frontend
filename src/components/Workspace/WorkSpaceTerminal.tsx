"use client";

import React, { useRef, useImperativeHandle, forwardRef } from "react";
import TerminalIcon from "@mui/icons-material/Terminal";
import dynamic from "next/dynamic";
import { Socket } from "socket.io-client";
import { Terminal } from "@xterm/xterm";

interface TerminalRef extends Terminal {
  clear: () => void;
}

interface Props {
  socket: Socket | null;
}

const DynamicTerminal = dynamic(() => import("@/components/Workspace/XTermTerminal"), {
  ssr: false,
});


export const WorkSpaceTerminal = forwardRef<TerminalRef | null, Props>(({ socket }, ref) => {
  const terminalRef = useRef<Terminal | null>(null); 

  useImperativeHandle(ref, () => {
    const currentTerminal = terminalRef.current;

    return {
      ...currentTerminal,
      clear: () => {
        if (currentTerminal) {
          currentTerminal.clear();
        }
      },
    } as TerminalRef;
  });
  
  if (!socket) return <p>Connecting to terminal...</p>;

  return (
    <div className="pt-2 w-5/12 h-full bg-[#161D2D]">
      <div className="flex h-auto border-b-[0.5px] border-b-[#2A3A50]">
        <div className="flex flex-row bg-[#161D2D] rounded-t-lg border-t-primary border-t-2 border-r-[#2A3A50] border-r-[0.5px] space-x-3 px-4 pt-3 pb-4">
          <TerminalIcon />
          <p className="text-[#C2C8CC] min-w-32">Terminal</p>
        </div>
      </div>

      <DynamicTerminal ref={terminalRef} socket={socket} />
    </div>
  );
});

WorkSpaceTerminal.displayName = "WorkSpaceTerminal";
