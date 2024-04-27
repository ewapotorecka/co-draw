import { useEffect, useState } from "react";

import { io, Socket } from "socket.io-client";

const SocketTest = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    console.log("Button clicked");

    if (socket)
      socket.emit("send_message", {
        message: "Hello from a different universe",
      });
  };

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        alert(data.message);
      });
    }
  }, [socket]);

  return (
    <>
      <button onClick={sendMessage}>Send hello</button>
    </>
  );
};

export default SocketTest;
