import React from "react";
import { Link } from "react-router-dom";

function Rooms() {
  const rooms = [0, 1, 2, 3, 4, 5];

  return (
    <div>
      <h1>Rooms</h1>
      <Link to="/">Home</Link>

      {rooms.map((roomId) => (
        <div key={roomId}>
          <Link to={`/rooms/${roomId}`}>Room {roomId}</Link>
        </div>
      ))}
    </div>
  );
}

export default Rooms;
