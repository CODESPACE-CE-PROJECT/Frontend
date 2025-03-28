"use client";

import { io, Socket } from "socket.io-client";
import { getTerminalStreamURL } from "@/actions/env";
import { getCookie } from "cookies-next/client";

let socket: Socket | null = null;

export const getSocket = async (): Promise<Socket> => {
  if (socket) return socket;

  const accessToken = getCookie('accessToken');
  const url = await getTerminalStreamURL();
  console.log("Connecting to WebSocket:", url);

  socket = io(url, {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
    extraHeaders: {
      "authorization": accessToken as string
    }
  });

  socket.on("connect", () => {
    console.log("✅ WebSocket Connected");
  });

  return socket;
};
