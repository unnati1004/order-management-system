// socket.js
import { io } from "socket.io-client";

let socket = null;

export const createSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5000");
  }
  return socket;
};

export const getSocket = () => socket;
