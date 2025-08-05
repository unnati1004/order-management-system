// socket.js

import { io } from "socket.io-client";
const VITE_API_URL = import.meta.env.VITE_API_URL;
let socket = null;

export const createSocket = () => {
  if (!socket || socket.disconnected) {
    socket = io(`http://localhost:5000`, {
      transports: ["websocket"], // optional but recommended
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
