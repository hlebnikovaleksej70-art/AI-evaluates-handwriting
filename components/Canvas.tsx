
import React, { useRef, useEffect, useState } from 'react';

interface CanvasProps {
  onClear: () => void;
  getCanvasData: () => string;
  isEvaluating: boolean;
  guideLetter: string;
}

const Canvas: React.FC<CanvasProps> = ({ onClear, getCanvasData, isEvaluating, guideLetter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Responsive canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        // Сохраняем содержимое при ресайзе, если нужно, но здесь просто сбрасываем
        canvas.width = rect.width;
        canvas.height = 400;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = '#1e293b';
        context.lineWidth = 4;
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setCtx(context);

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (isEvaluating || !ctx) return;
    
    // Предотвращаем скролл страницы при рисовании на тач-устройствах
    if (e.cancelable) e.preventDefault();
    
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isEvaluating || !ctx) return;
    
    if (e.cancelable) e.preventDefault();
    
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    ctx?.closePath();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleClear = () => {
    if (!ctx || !canvasRef.current) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onClear();
  };

  (window as any).getHandwritingCanvasData = () => canvasRef.current?.toDataURL('image/png');

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Background guide */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex items-center justify-center overflow-hidden">
        <span className="cursive-preview text-[220px] opacity-[0.04] select-none text-slate-900 mb-10">
          {guideLetter}
        </span>
      </div>
      
      {/* Visual lines */}
      <div className="notebook-lines absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 rounded-xl overflow-hidden"></div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="block w-full h-[400px] cursor-crosshair border-2 border-slate-200 rounded-xl shadow-inner bg-white/40 touch-none"
      />

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleClear}
          disabled={isEvaluating}
          className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-red-500 bg-white border border-slate-200 rounded-xl shadow-sm transition-all active:scale-95"
        >
          Очистить холст
        </button>
      </div>
    </div>
  );
};

export default Canvas;
