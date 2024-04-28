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
  const [isDashed, setIsDashed] = useState<boolean>(lineStyle.dashed);

  const onStrokeColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(e.target.value);
  };

  const onLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineWidth(Number(e.target.value));
  };

  const onDashedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDashed(e.target.checked);
  };

  useEffect(() => {
    onChange({ lineWidth, strokeColor, dashed: isDashed });
  }, [strokeColor, lineWidth, isDashed]);

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
      {/* <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ userSelect: "none" }}>Dashed</span>
        <input
          type="checkbox"
          min={1}
          max={10}
          onChange={onDashedChange}
          checked={isDashed}
        />
      </span> */}
    </div>
  );
}

export default LineToolbar;
