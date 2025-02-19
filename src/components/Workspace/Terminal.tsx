import React, { useEffect, useRef } from "react";
import "@xterm/xterm/css/xterm.css";

const XtermTerminal = () => {
  const terminalRef = useRef(null);

  const initTerminal = async () => {
    const { Terminal } = await import("@xterm/xterm");
    const { FitAddon } = await import("@xterm/addon-fit");
    const { AttachAddon } = await import("@xterm/addon-attach");
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);
    // @ts-ignore
    terminal.open(terminalRef.current);
    fitAddon.fit();

    return () => {
      terminal.dispose();
    };
  };

  useEffect(() => {
    initTerminal();
  }, []);

  return <div ref={terminalRef} className="w-auto h-[40vh]" />;
};

export default XtermTerminal;