import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function Room() {
  const { roomId } = useParams();
  const ref = useRef(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [strokeColor, setStrokeColor] = useState<string>("#ff0000");
  const [lineWidth, setLineWidth] = useState<number>(3);

  useEffect(() => {
    const canvas = ref.current as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    setCtx(ctx);
  }, []);

  let mouseDown = false;

  const onMouseDown = (e: React.MouseEvent) => {
    mouseDown = true;

    if (!ctx) return;

    ctx.beginPath();

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";
  };

  const onMouseUp = () => {
    mouseDown = false;

    ctx?.closePath();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouseDown) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.moveTo(x, y);
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    mouseDown = false;
  };

  const onStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
  };

  const onLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, Number(e.target.value));
    setLineWidth(Number(e.target.value));
  };

  return (
    <div
      style={{
        backgroundColor: "#EEE",
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
            border: "1px solid black",
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