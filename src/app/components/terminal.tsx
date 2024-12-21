import React, { useEffect, useRef } from "react";
// import { Terminal } from '@xterm/xterm';
// import { FitAddon } from '@xterm/addon-fit';
// import { AttachAddon } from '@xterm/addon-attach';
import "@xterm/xterm/css/xterm.css";

const XtermTerminal = () => {
  const terminalRef = useRef(null);

  const initTerminal = async () => {
    const { Terminal } = await import("@xterm/xterm");
    const { FitAddon } = await import("@xterm/addon-fit");
    const { AttachAddon } = await import("@xterm/addon-attach");
    const terminal = new Terminal();
    const fitAddon = new FitAddon();
    const socket = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_DOCKER_HOST}:2375/containers/${process.env.NEXT_PUBLIC_CONTAINER_ID}/attach/ws?stream=1&stdout=1&stdin=1&logs=1`
    );
    console.log(process.env.NEXT_PUBLIC_DOCKER_HOST);
    const attachAddon = new AttachAddon(socket);
    terminal.loadAddon(fitAddon);
    terminal.loadAddon(attachAddon);
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
