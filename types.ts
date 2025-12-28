
export interface Word {
  id: string;
  text: string;
  weight: number;
}

export type LayoutMode = '均匀' | '放射' | '紧凑';

export interface CloudSettings {
  fontFamily: string;
  backgroundColor: string;
  isTransparent: boolean;
  colorPalette: string[];
  rotationRatio: number; // 0 to 1
  minFontSize: number;
  maxFontSize: number;
  layout: LayoutMode;
}

export const DEFAULT_WORDS: Word[] = [
  { id: '1', text: '人工智能', weight: 5 },
  { id: '2', text: '云计算', weight: 4 },
  { id: '3', text: '视觉设计', weight: 3 },
  { id: '4', text: '大数据', weight: 3 },
  { id: '5', text: '数据可视化', weight: 4 },
  { id: '6', text: '响应式', weight: 2 },
  { id: '7', text: '极简主义', weight: 2 },
  { id: '8', text: '创意', weight: 3 },
  { id: '9', text: '交互', weight: 3 },
];

export const FONT_OPTIONS = [
  'Noto Sans SC',
  'Inter',
  'serif',
  'sans-serif',
  'monospace',
  'cursive'
];

export const PALETTES = [
  ['#3b82f6', '#1d4ed8', '#1e40af', '#60a5fa'], // 蓝色系
  ['#10b981', '#059669', '#047857', '#34d399'], // 绿色系
  ['#f43f5e', '#e11d48', '#be123c', '#fb7185'], // 红色系
  ['#8b5cf6', '#7c3aed', '#6d28d9', '#a78bfa'], // 紫色系
  ['#f59e0b', '#d97706', '#b45309', '#fbbf24'], // 琥珀色
  ['#1e293b', '#334155', '#475569', '#64748b'], // 石板色
];
