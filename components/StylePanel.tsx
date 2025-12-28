
import React from 'react';
import { CloudSettings, FONT_OPTIONS, PALETTES, LayoutMode } from '../types';
import { Palette, Type as TypeIcon, Maximize2, Move } from 'lucide-react';

interface StylePanelProps {
  settings: CloudSettings;
  onUpdateSettings: (updates: Partial<CloudSettings>) => void;
}

export const StylePanel: React.FC<StylePanelProps> = ({ settings, onUpdateSettings }) => {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <TypeIcon className="w-4 h-4 text-slate-500" />
          字体选择
        </h3>
        <select
          value={settings.fontFamily}
          onChange={(e) => onUpdateSettings({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
        >
          {FONT_OPTIONS.map((font) => (
            <option key={font} value={font}>{font === 'Noto Sans SC' ? '思源黑体 (默认)' : font}</option>
          ))}
        </select>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Palette className="w-4 h-4 text-slate-500" />
          配色方案
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {PALETTES.map((palette, idx) => (
            <button
              key={idx}
              onClick={() => onUpdateSettings({ colorPalette: palette })}
              className={`flex h-8 rounded overflow-hidden border-2 transition-all ${
                JSON.stringify(settings.colorPalette) === JSON.stringify(palette)
                  ? 'border-indigo-600 scale-105 shadow-sm'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              {palette.map((color) => (
                <div key={color} className="flex-1" style={{ backgroundColor: color }} />
              ))}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Maximize2 className="w-4 h-4 text-slate-500" />
          背景设置
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="transparent"
              checked={settings.isTransparent}
              onChange={(e) => onUpdateSettings({ isTransparent: e.target.checked })}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="transparent" className="text-xs text-slate-600">透明背景</label>
          </div>
          {!settings.isTransparent && (
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => onUpdateSettings({ backgroundColor: e.target.value })}
              className="w-8 h-8 rounded border-none cursor-pointer"
            />
          )}
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Move className="w-4 h-4 text-slate-500" />
          布局与动态
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-500 block mb-1">旋转频率</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.rotationRatio}
              onChange={(e) => onUpdateSettings({ rotationRatio: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">生成模式</label>
            <div className="grid grid-cols-3 gap-2">
              {(['均匀', '放射', '紧凑'] as LayoutMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => onUpdateSettings({ layout: m })}
                  className={`px-2 py-1.5 text-[10px] uppercase font-bold rounded border transition-all ${
                    settings.layout === m
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
