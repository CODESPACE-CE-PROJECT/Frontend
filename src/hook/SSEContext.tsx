'use client';

import { ReactNode, useEffect, useCallback } from 'react';
import { getCookie } from 'cookies-next/client';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { getRealTimeURL } from '@/actions/env';

interface Props {
    children: ReactNode;
}

export const SSEContext: React.FC<Props> = ({ children }) => {
    const accessToken = getCookie('accessToken');

    const startSSE = useCallback(async () => {
        if (!accessToken) return;

        try {
            const realTimeURL = await getRealTimeURL()
            await fetchEventSource(`${realTimeURL}/status`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                async onopen(response) {
                    if (response.ok) {
                        console.log('Connected to SSE');
                    }
                },
                onerror(error) {
                    console.log('SSE Error:', error);
                },
            });
        } catch (error) {
            console.log('Error Connecting to SSE', error);
        }
    }, [accessToken]);

    useEffect(() => {

        if (accessToken) {
            startSSE();
        }

    }, [accessToken, startSSE]);

    return <>{children}</>;
};
