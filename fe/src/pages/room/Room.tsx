import React from "react";
import { Link, useParams } from "react-router-dom";

function Room() {
  const { roomId } = useParams();

  return (
    <div>
      <h1>Room {roomId}</h1>
      <Link to="/rooms">Rooms</Link>
    </div>
  );
}

export default Room;
