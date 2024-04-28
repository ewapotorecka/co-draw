import Toolbar from "../Toolbar";
import useDrawingBoard from "./useDrawingBoard";

function DrawingBoard() {
  const {
    style,
    setStyle,
    clearCanvasFromLocal,
    canvasRef,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
  } = useDrawingBoard();

  return (
    <div>
      <Toolbar
        lineStyle={style}
        onChange={setStyle}
        onClear={clearCanvasFromLocal}
      />
      <canvas
        style={{
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          backgroundColor: "#FFF",
        }}
        id="canvas"
        width="1000"
        height="500"
        ref={canvasRef}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        onMouseMove={onMouseMove}
      ></canvas>
    </div>
  );
}

export default DrawingBoard;
