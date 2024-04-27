import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import useSockets from "../../hooks/useSockets";
import { Coordinate } from "../../interfaces/Coordinates";

function Room() {
  const { roomId } = useParams();
  const ref = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [strokeColor, setStrokeColor] = useState<string>("#ff0000");
  const [lineWidth, setLineWidth] = useState<number>(3);
  const [savedCoordinates, setSavedCoordinates] = useState<Coordinate[]>([]);
  const { sendMessage, receivedData } = useSockets<{
    coordinates: Coordinate[];
    lineWidth: number;
    strokeColor: string;
  }>();

  let coordinates: Coordinate[] = [];

  let mouseDown = false;

  const onMouseDown = (e: React.MouseEvent) => {
    mouseDown = true;

    if (!ctx) return;

    ctx.beginPath();

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.moveTo(x, y);
  };

  const onMouseUp = () => {
    mouseDown = false;
    ctx?.closePath();
    setSavedCoordinates(coordinates);
    coordinates = [];
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (!ctx) return;

    coordinates.push({ x, y });

    ctx.setLineDash([5, 15]);
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const onMouseLeave = () => {
    ctx?.closePath();
    mouseDown = false;
  };

  const onStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
  };

  const onLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(e.target.value));
  };

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  useEffect(() => {
    sendMessage({
      coordinates: savedCoordinates,
      lineWidth: lineWidth,
      strokeColor: strokeColor,
    });
  }, [savedCoordinates]);

  useEffect(() => {
    if (!ctx || !receivedData) return;

    const { coordinates, lineWidth, strokeColor } = receivedData;

    if (!coordinates.length) return;

    const startPoint = coordinates[0];

    ctx.beginPath();

    ctx.setLineDash([5, 15]);
    ctx.strokeStyle = strokeColor;
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    ctx.moveTo(startPoint.x, startPoint.y);

    coordinates.forEach((coordinate) => {
      const { x, y } = coordinate;
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    ctx.closePath();
  }, [receivedData]);

  return (
    <div
      style={{
        backgroundColor: "#EEEFF0",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Link to="/rooms">Rooms</Link> */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1rem",
          gap: "1rem",
        }}
      >
        {/* <div>Room {roomId}</div> */}
        Style
        <input
          type="color"
          onChange={onStrokeColorChange}
          value={strokeColor}
        />
        <input
          type="range"
          min={1}
          max={10}
          onChange={onLineWidthChange}
          value={lineWidth}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <canvas
          style={{
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FFF",
          }}
          id="canvas"
          width="1000"
          height="500"
          ref={ref}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        ></canvas>
      </div>
    </div>
  );
}

export default Room;
