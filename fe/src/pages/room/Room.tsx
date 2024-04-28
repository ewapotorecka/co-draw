import { Link, useParams } from "react-router-dom";

import { Helmet } from "react-helmet-async";
import DrawingBoard from "../../components/DrawingBoard/DrawingBoard";

function Room() {
  const { roomId } = useParams();

  return (
    <>
      <Helmet>
        <title>Art Fusion - {roomId}</title>
      </Helmet>
      <div
        style={{
          position: "absolute",
          padding: "1rem",
        }}
      >
        <Link to="/rooms">Rooms</Link>
      </div>
      <div
        style={{
          backgroundColor: "#EEEFF0",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DrawingBoard />
      </div>
    </>
  );
}

export default Room;
