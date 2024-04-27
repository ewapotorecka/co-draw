import React from "react";
import { Link, useParams } from "react-router-dom";
import SocketTest from "../../components/SocketTest/SocketTest";

function Room() {
  const { roomId } = useParams();

  return (
    <div>
      <h1>Room {roomId}</h1>
      <SocketTest />
      <Link to="/rooms">Rooms</Link>
    </div>
  );
}

export default Room;
