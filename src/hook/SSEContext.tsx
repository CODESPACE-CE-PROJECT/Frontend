'use client';

import { ReactNode, useEffect, useCallback } from 'react';
import { getCookie } from 'cookies-next/client';
import { fetchEventSource } from '@microsoft/fetch-event-source';

interface Props {
    children: ReactNode;
}

export const SSEContext: React.FC<Props> = ({ children }) => {
    const accessToken = getCookie('accessToken');

    const startSSE = useCallback(async () => {
        if (!accessToken) return;

        const abortController = new AbortController();

        try {
            await fetchEventSource(`${process.env.NEXT_PUBLIC_REAL_TIME_URL}/status`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                signal: abortController.signal,
                async onopen(response) {
                    if (response.ok) {
                        console.log('Connected to SSE');
                    } else {
                        console.error('Failed to connect to SSE', response.statusText);
                        abortController.abort();
                    }
                },
                onerror(error) {
                    console.error('SSE Error:', error);
                    abortController.abort();
                },
            });
        } catch (error) {
            console.log('Error Connecting to SSE', error);
            abortController.abort();
        }
    }, [accessToken]);

    useEffect(() => {
        const controller = new AbortController();

        if (accessToken) {
            startSSE();
        }

        return () => controller.abort();
    }, [accessToken, startSSE]);

    return <>{children}</>;
};
