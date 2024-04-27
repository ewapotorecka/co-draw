import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

const useSockets = <T,>() => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [receivedData, setReceivedData] = useState<T>();

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (data: T) => {
    if (socket) {
      socket.emit("send_message", {
        message: data,
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
