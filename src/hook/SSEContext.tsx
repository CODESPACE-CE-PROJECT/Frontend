'use client'

import { ReactNode, useEffect, useMemo } from "react"
import { getCookie } from "cookies-next/client"
import { fetchEventSource } from "@microsoft/fetch-event-source"

interface Props {
     children: ReactNode
}

export const SSEContext: React.FC<Props> = ({ children }) => {
     const accessToken = getCookie('accessToken')
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
               });
          } catch (error) {
               console.log("Error Connecting to SSE", error);
          }
     }, [accessToken]);

     useEffect(() => {
          if (accessToken) {
               startSSE()
          }
     }, [accessToken, startSSE])

     return <>
          {children}
     </>
}