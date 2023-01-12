import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket

export function useSocket(url: string) {
  useEffect(() => {
    const socketio = io(url);
    // setSocket(socketio)
    socket = socketio
      
    return () => {
      socket?.disconnect()
    }
  }, []);
  return socket;
}