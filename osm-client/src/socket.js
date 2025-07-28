// socket.js

import { io } from "socket.io-client";
const BASE_URL = import.meta.env.BASE_URL;
let socket = null;

export const createSocket = () => {
  if (!socket || socket.disconnected) {
    socket = io(`${BASE_URL}`, {
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
