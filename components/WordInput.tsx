
import React, { useState } from 'react';
import { Plus, Trash2, Settings2, Sparkles } from 'lucide-react';
import { Word } from '../types';

interface WordInputProps {
  words: Word[];
  onAddWord: (text: string, weight: number) => void;
  onRemoveWord: (id: string) => void;
  onUpdateWeight: (id: string, weight: number) => void;
  onGenerateAI: (topic: string) => void;
  isGenerating: boolean;
}

export const WordInput: React.FC<WordInputProps> = ({
  words,
  onAddWord,
  onRemoveWord,
  onUpdateWeight,
  onGenerateAI,
  isGenerating
}) => {
  const [newWord, setNewWord] = useState('');
  const [newWeight, setNewWeight] = useState(3);
  const [topic, setTopic] = useState('');

  const handleAdd = () => {
    if (newWord.trim()) {
      onAddWord(newWord.trim(), newWeight);
      setNewWord('');
    }
  };

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          AI 关键词生成
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="输入主题 (例如: 数字化转型)"
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={() => onGenerateAI(topic)}
            disabled={isGenerating || !topic.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shrink-0"
          >
            {isGenerating ? '生成中...' : '立即生成'}
          </button>
        </div>
      </section>

      <div className="h-px bg-slate-100" />

      <section>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-slate-500" />
          关键词列表
        </h3>
        
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="添加新词..."
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <div className="flex items-center gap-2 px-2 border border-slate-200 rounded-lg bg-white">
            <span className="text-[10px] uppercase font-bold text-slate-400">权重</span>
            <input
              type="number"
              min="1"
              max="10"
              value={newWeight}
              onChange={(e) => setNewWeight(Number(e.target.value))}
              className="w-8 text-center text-sm focus:outline-none"
            />
          </div>
          <button
            onClick={handleAdd}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
          {words.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-4">暂无关键词，请尝试 AI 生成</p>
          )}
          {words.map((word) => (
            <div
              key={word.id}
              className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-lg hover:border-slate-300 transition-colors group"
            >
              <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">
                {word.text}
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={word.weight}
                  onChange={(e) => onUpdateWeight(word.id, Number(e.target.value))}
                  className="w-16 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <button
                  onClick={() => onRemoveWord(word.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
