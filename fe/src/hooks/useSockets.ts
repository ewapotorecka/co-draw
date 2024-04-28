import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:4000";

const useSockets = <T>({
  eventName,
  onEventReceived,
}: {
  eventName: string;
  onEventReceived: (data: T) => void;
}) => {
  const [socket, setSocket] = useState<Socket<{
    send_message: (data: { eventName: string; data: T }) => void;
    receive_message: (data: { eventName: string; data: T }) => void;
  }> | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);
    return () => {
      newSocket?.close();
    };
  }, []);

  const sendEvent = (data: T) => {
    socket?.emit("send_message", {
      eventName: eventName,
      data,
    });
  };

  function receiveMessage(data: { eventName: string; data: T }) {
    if (data.eventName === eventName) {
      onEventReceived(data.data);
    }
  }

  useEffect(() => {
    socket?.on("receive_message", receiveMessage);

    return () => {
      socket?.off("receive_message", receiveMessage);
    };
  }, [socket]);

  return sendEvent;
};

export default useSockets;
