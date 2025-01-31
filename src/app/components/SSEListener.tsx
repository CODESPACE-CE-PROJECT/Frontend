"use client";

import { useEffect, useMemo } from "react";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import Cookies from "js-cookie";

const SSEListener = () => {
  const accessToken  = Cookies.get('accessToken')   
  const startSSE = useMemo(() => async () => {
    try {
      await fetchEventSource(`${process.env.NEXT_PUBLIC_REAL_TIME_URL}/status`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        async onopen(response) {
          if (response.ok) {
            console.log("Connected to SSE");
          }
        },
        onerror(err) {
          console.error("SSE Error:", err);
        },
      });
    } catch (error) {
      console.error("Error Connecting to SSE", error);
    }
  }, [accessToken]);
  
  useEffect(() => {
     if (accessToken){
          startSSE();
     }
  }, [accessToken, startSSE]);

  return null;
};

export default SSEListener;