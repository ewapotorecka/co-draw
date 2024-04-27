import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";
import { Coordinate } from "../interfaces/Coordinates";

const useSockets = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [receivedData, setReceivedData] = useState<Coordinate[]>([]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (coordinates: Coordinate[]) => {
    if (socket) {
      socket.emit("send_message", {
        message: coordinates,
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        setReceivedData(data.message);
      });
    }
  }, [socket]);

  return {
    sendMessage,
    receivedData,
  };
};

export default useSockets;
