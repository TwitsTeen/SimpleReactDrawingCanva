import { useRef, useState, useEffect } from "react";
import "./drawingCanvas.css";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [color, setColor] = useState("black");
  const [lineWidth, setLineWidth] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    const { x, y } = getMousePos(e);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getMousePos(e);
    context.lineTo(x, y);
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  const resetCanva = () => {
    context.clearRect(0, 0, 800, 600);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      <span>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <button onClick={resetCanva}>Reset</button>
      </span>

      <input
        type="range"
        min="1"
        max="50"
        value={lineWidth}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          setLineWidth(newValue);
        }}
      />
    </div>
  );
};

export default DrawingCanvas;
