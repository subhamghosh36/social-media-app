'use client';
import { useEffect } from 'react';
import { initSocket, getSocket } from '@/utils/socket';

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initSocket();
    return () => {
      const socket = getSocket();
      if (socket) socket.disconnect();
    };
  }, []);

  return <>{children}</>;
};
