"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { Trash2 } from "lucide-react";

interface Props {
  onChange: (base64: string | null) => void;
  height?: number;
}

export default function SignatureCanvas({ onChange, height = 160 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = height * ratio;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(ratio, ratio);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [height]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handler = (e: TouchEvent) => { if (isDrawing) e.preventDefault(); };
    canvas.addEventListener("touchmove", handler, { passive: false });
    return () => canvas.removeEventListener("touchmove", handler);
  }, [isDrawing]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPos.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
    setIsEmpty(false);
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
    if (!isEmpty) {
      const canvas = canvasRef.current!;
      // Composite stroke over white background so JPEG has no black fill
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const ctx2 = offscreen.getContext("2d")!;
      ctx2.fillStyle = "#ffffff";
      ctx2.fillRect(0, 0, offscreen.width, offscreen.height);
      ctx2.drawImage(canvas, 0, 0);
      onChange(offscreen.toDataURL("image/jpeg", 0.85));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    onChange(null);
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        style={{ height, touchAction: "none" }}
        className="w-full border-2 border-dashed border-slate-300 rounded-xl bg-white cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
      />
      {isEmpty && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-slate-400 text-sm">Dibuja tu firma aquí</p>
        </div>
      )}
      {!isEmpty && (
        <button
          onClick={clear}
          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white shadow border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
