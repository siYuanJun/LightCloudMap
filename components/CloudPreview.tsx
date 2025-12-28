
import React, { useEffect, useRef } from 'react';
import { Word, CloudSettings } from '../types';
import { Download, RefreshCw } from 'lucide-react';

interface CloudPreviewProps {
  words: Word[];
  settings: CloudSettings;
  onRefresh: () => void;
}

declare global {
  interface Window {
    WordCloud: any;
  }
}

export const CloudPreview: React.FC<CloudPreviewProps> = ({ words, settings, onRefresh }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCloud = () => {
    if (!canvasRef.current || !window.WordCloud) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (!settings.isTransparent) {
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const list = words.map((w) => [w.text, w.weight]);
    
    // 根据模式调整权重因子
    const weightFactor = settings.layout === '紧凑' ? 14 : settings.layout === '放射' ? 10 : 8;

    window.WordCloud(canvas, {
      list,
      fontFamily: settings.fontFamily,
      fontWeight: 'bold',
      color: () => {
        const colors = settings.colorPalette;
        return colors[Math.floor(Math.random() * colors.length)];
      },
      rotateRatio: settings.rotationRatio,
      rotationSteps: 2,
      backgroundColor: settings.isTransparent ? 'transparent' : settings.backgroundColor,
      gridSize: 8,
      weightFactor: (size: number) => size * weightFactor,
      minSize: settings.minFontSize,
      drawOutOfBound: false,
      shrinkToFit: true,
      origin: settings.layout === '放射' ? [canvas.width / 2, canvas.height / 2] : undefined
    });
  };

  useEffect(() => {
    const timer = setTimeout(drawCloud, 100);
    return () => clearTimeout(timer);
  }, [words, settings]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `轻云图-生成结果-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-sm font-semibold text-slate-700">实时预览</h2>
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-all"
            title="重绘布局"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            导出图片 (PNG)
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/20 pattern-dots">
        <div className="relative w-full max-w-[600px] aspect-square bg-white rounded-xl shadow-inner overflow-hidden border border-slate-100">
           <canvas
             ref={canvasRef}
             width={1000}
             height={1000}
             className="w-full h-full object-contain"
           />
        </div>
      </div>

      <div className="px-6 py-3 bg-white border-t border-slate-50 text-[10px] text-slate-400 flex justify-between">
        <span>高清 1000x1000 渲染预览</span>
        <span>由 轻云图 (LightCloud) 引擎驱动</span>
      </div>
    </div>
  );
};
