import { LineStyle } from "../interfaces/DrawingData";
import LineToolbar from "./LineToolbar";

function Toolbar({
  lineStyle,
  onChange,
  onClear,
}: {
  lineStyle: LineStyle;
  onChange: (style: LineStyle) => void;
  onClear: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem",
        gap: "1rem",
      }}
    >
      <div style={{ flex: 1 }}></div>
      <LineToolbar lineStyle={lineStyle} onChange={onChange} />
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            border: "none",
            backgroundColor: "#AAA",
            color: "#FFF",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
