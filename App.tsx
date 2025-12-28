
import React, { useState, useCallback } from 'react';
import { Word, CloudSettings, DEFAULT_WORDS, PALETTES } from './types';
import { WordInput } from './components/WordInput';
import { StylePanel } from './components/StylePanel';
import { CloudPreview } from './components/CloudPreview';
import { generateKeywordsFromTopic } from './services/geminiService';
import { Cloud, Github, Info } from 'lucide-react';

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>(DEFAULT_WORDS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState<CloudSettings>({
    fontFamily: 'Noto Sans SC',
    backgroundColor: '#ffffff',
    isTransparent: false,
    colorPalette: PALETTES[0],
    rotationRatio: 0.5,
    minFontSize: 4,
    maxFontSize: 80,
    layout: '均匀'
  });

  const handleAddWord = (text: string, weight: number) => {
    const newWord: Word = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      weight
    };
    setWords(prev => [newWord, ...prev]);
  };

  const handleRemoveWord = (id: string) => {
    setWords(prev => prev.filter(w => w.id !== id));
  };

  const handleUpdateWeight = (id: string, weight: number) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, weight } : w));
  };

  const handleUpdateSettings = (updates: Partial<CloudSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  const handleGenerateAI = async (topic: string) => {
    setIsGenerating(true);
    try {
      const aiWords = await generateKeywordsFromTopic(topic);
      setWords(aiWords);
    } catch (error) {
      alert("生成失败，请检查 API 配置或网络。");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefresh = useCallback(() => {
    setWords(prev => [...prev]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">轻云图</h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">2D 云图在线生成工作站</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 text-sm">
            <Info className="w-4 h-4" />
            <span>使用说明</span>
          </button>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-6 max-w-[1600px] mx-auto w-full">
        {/* 左侧控制区 */}
        <aside className="w-full lg:w-[380px] flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
             <WordInput
               words={words}
               onAddWord={handleAddWord}
               onRemoveWord={handleRemoveWord}
               onUpdateWeight={handleUpdateWeight}
               onGenerateAI={handleGenerateAI}
               isGenerating={isGenerating}
             />
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
             <StylePanel
               settings={settings}
               onUpdateSettings={handleUpdateSettings}
             />
          </div>
        </aside>

        {/* 右侧预览区 */}
        <section className="flex-1 min-h-[500px] lg:min-h-0">
          <CloudPreview
            words={words}
            settings={settings}
            onRefresh={handleRefresh}
          />
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
        &copy; 2024 轻云图 (LightCloud) - 专业的云图视觉化引擎
      </footer>
    </div>
  );
};

export default App;
