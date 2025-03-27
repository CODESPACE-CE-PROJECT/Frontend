import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import "@xterm/xterm/css/xterm.css";
import { Terminal as XTerm, ITerminalOptions } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { ClipboardAddon } from '@xterm/addon-clipboard';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { Socket } from 'socket.io-client';

// Create a custom type that extends the Terminal class
interface TerminalRef extends Partial<XTerm> {
  clear: () => void;
}

interface Props {
  socket: Socket | null;
}

// Forward ref to expose only the clear method along with the full terminal instance
const XTermTerminal = forwardRef<TerminalRef | null, Props>(({ socket }, ref) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  useImperativeHandle(ref, () => ({
    ...(termRef.current as TerminalRef), 
    clear: () => {
      const term = termRef.current;
      if (term) {
        console.log("clear");
        term.reset();
      }
    },
  }));

  useEffect(() => {
    const terminal = new XTerm({
      cursorBlink: true,
      cursorStyle: 'bar',
      cursorInactiveStyle: 'none',
      fontSize: 16,
      fontFamily: 'JetBrains Mono',
    } as ITerminalOptions);

    const clipboardAddon = new ClipboardAddon();
    const weblinksAddon = new WebLinksAddon();
    const fitAddOn = new FitAddon();

    termRef.current = terminal;
    fitAddonRef.current = fitAddOn;

    terminal.loadAddon(clipboardAddon);
    terminal.loadAddon(weblinksAddon);
    terminal.loadAddon(fitAddOn);

    if (terminalRef.current) {
      terminal.open(terminalRef.current);
    }

    setTimeout(() => fitAddOn.fit(), 100);

    const onResize = () => {
      fitAddonRef.current?.fit();
    };
    window.addEventListener("resize", onResize);

    return () => {
      terminal.dispose();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const term = termRef.current;
    if (!term || !socket) return;

    const handleInput = (data: string | Uint8Array) => {
      socket.emit("data", data);
    };

    const handleMessage = (msg: string) => {
      term.write(msg);
    };

    term.onData(handleInput);
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  return <div ref={terminalRef} className="w-auto h-[calc(100vh-80px)] p-4 pr-0" />;
});

XTermTerminal.displayName = "XTermTerminal";
export default XTermTerminal;
