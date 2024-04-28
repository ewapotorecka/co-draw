import { useEffect, useState } from "react";
import { LineStyle } from "../interfaces/DrawingData";

function LineToolbar({
  lineStyle,
  onChange,
}: {
  lineStyle: LineStyle;
  onChange: (style: LineStyle) => void;
}) {
  const [strokeColor, setStrokeColor] = useState<string>(lineStyle.strokeColor);
  const [lineWidth, setLineWidth] = useState<number>(lineStyle.lineWidth);

  const onStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
  };

  const onLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(e.target.value));
  };

  useEffect(() => {
    onChange({ lineWidth, strokeColor });
  }, [strokeColor, lineWidth]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        margin: "1rem",
        gap: "1rem",
      }}
    >
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ userSelect: "none" }}>Color</span>
        <input
          type="color"
          onChange={onStrokeColorChange}
          value={strokeColor}
        />
      </span>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ userSelect: "none" }}>Width</span>
        <input
          type="range"
          min={1}
          max={10}
          onChange={onLineWidthChange}
          value={lineWidth}
        />
      </span>
    </div>
  );
}

export default LineToolbar;
