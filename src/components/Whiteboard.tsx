import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Pencil, Eraser, Undo, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface WhiteboardProps {
  onClose: () => void;
}

const Whiteboard = ({ onClose }: WhiteboardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState("#3b82f6");
  const [lineWidth, setLineWidth] = useState([3]);

  const colors = [
    "#3b82f6", // blue
    "#8b5cf6", // purple
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // yellow
    "#000000", // black
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineWidth = tool === "eraser" ? lineWidth[0] * 3 : lineWidth[0];
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = url;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background"
    >
      {/* Toolbar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 glass-card p-4 flex items-center gap-4"
      >
        <Button
          variant={tool === "pen" ? "default" : "outline"}
          size="icon"
          onClick={() => setTool("pen")}
        >
          <Pencil className="w-5 h-5" />
        </Button>

        <Button
          variant={tool === "eraser" ? "default" : "outline"}
          size="icon"
          onClick={() => setTool("eraser")}
        >
          <Eraser className="w-5 h-5" />
        </Button>

        <div className="h-8 w-px bg-border" />

        {/* Color Picker */}
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                color === c ? "border-foreground scale-110" : "border-border"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="h-8 w-px bg-border" />

        {/* Line Width */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Width</span>
          <Slider
            value={lineWidth}
            onValueChange={setLineWidth}
            min={1}
            max={20}
            className="w-32"
          />
        </div>

        <div className="h-8 w-px bg-border" />

        <Button variant="outline" size="icon" onClick={clearCanvas}>
          <Undo className="w-5 h-5" />
        </Button>

        <Button variant="outline" size="icon" onClick={downloadCanvas}>
          <Download className="w-5 h-5" />
        </Button>

        <div className="h-8 w-px bg-border" />

        <Button variant="outline" size="icon" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        className="cursor-crosshair"
      />
    </motion.div>
  );
};

export default Whiteboard;
