import { io, Socket } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(URL, {
      autoConnect: true,
    });
  }
  return socket;
};

export const getSocket = () => socket;
