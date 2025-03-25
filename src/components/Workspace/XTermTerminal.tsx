import React, { useEffect, useRef, memo } from "react";
import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { ClipboardAddon } from '@xterm/addon-clipboard'
import { WebLinksAddon } from '@xterm/addon-web-links';
import { Socket } from 'socket.io-client'

interface Props {
  socket: Socket | null
}

const XtermTerminal: React.FC<Props> = memo(({ socket }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const termRef = useRef<Terminal | null>(null)
  const fitAddonRef = useRef<FitAddon | null>(null)

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      cursorStyle: 'bar',
      cursorInactiveStyle: 'none',
      fontSize: 16,
      fontFamily: 'JetBrains Mono'
    })

    const clipboardAddon = new ClipboardAddon();
    const weblinksAddon = new WebLinksAddon();
    const fitAddOn = new FitAddon()

    termRef.current = terminal
    fitAddonRef.current = fitAddOn;

    terminal.loadAddon(clipboardAddon);
    terminal.loadAddon(weblinksAddon);
    terminal.loadAddon(fitAddOn);

    if (terminalRef.current) {
      terminal.open(terminalRef.current)
    }

    setTimeout(() => fitAddOn.fit(), 100);
    const onResize = () => {
      if(fitAddonRef.current){
        fitAddonRef.current?.fit()
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      terminal.dispose()
      window.removeEventListener("resize", onResize);
    }
  }, [])

  useEffect(() => {
    const term = termRef.current;
    if(!term || !socket) return;
    
    const handleInput = (data: string | Uint8Array) => {
      socket.emit("data", data)
    }

    const handleMessage = (msg: string) => {
      term.write(msg)
    }

    term.onData(handleInput)
    socket.on("message", handleMessage)
    return () => {
      socket.off("message", handleMessage)
    }
  }, [socket])

  return <div ref={terminalRef} className="w-auto h-[calc(100vh-80px)] p-4 pr-0" />;
});
XtermTerminal.displayName = "XtermTerminal"
export default XtermTerminal;