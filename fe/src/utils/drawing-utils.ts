import { DrawingData } from "../interfaces/DrawingData";

const draw = (ctx: CanvasRenderingContext2D, data: DrawingData) => {
  if (!ctx) return;

  const { coordinates, style } = data;
  const startPoint = coordinates[0];

  if (!startPoint) return;

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);

  ctx.strokeStyle = style.strokeColor;
  ctx.lineCap = "round";
  ctx.lineWidth = style.lineWidth;
  ctx.lineJoin = "round";

  coordinates.forEach(({ x, y }) => {
    ctx.lineTo(x, y);
    ctx.stroke();
  });

  ctx.closePath();
};

export { draw };
