
import React, { useState, useMemo } from 'react';
import { PRACTICE_ITEMS } from './constants';
import { AppState, EvaluationResult, PracticeItem, PracticeCategory } from './types';
import Canvas from './components/Canvas';
import PracticeCard from './components/LetterCard';
import ResultView from './components/ResultView';
import { evaluateHandwriting } from './services/geminiService';

const App: React.FC = () => {
  const [currentState, setCurrentState] = useState<AppState>(AppState.SELECTING);
  const [activeCategory, setActiveCategory] = useState<PracticeCategory>('letters');
  const [selectedItem, setSelectedItem] = useState<PracticeItem>(PRACTICE_ITEMS[0]);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredItems = useMemo(() => 
    PRACTICE_ITEMS.filter(item => item.category === activeCategory),
  [activeCategory]);

  const handleSelectItem = (item: PracticeItem) => {
    setSelectedItem(item);
    setCurrentState(AppState.PRACTICING);
    setEvaluation(null);
    setError(null);
  };

  const handleEvaluate = async () => {
    const imageData = (window as any).getHandwritingCanvasData?.();
    if (!imageData) return;

    setIsEvaluating(true);
    setError(null);
    setCurrentState(AppState.EVALUATING);

    try {
      const result = await evaluateHandwriting(imageData, selectedItem);
      setEvaluation(result);
      setCurrentState(AppState.RESULT);
    } catch (err: any) {
      setError(err.message || "Ошибка при оценке");
      setCurrentState(AppState.PRACTICING);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleBack = () => {
    setCurrentState(AppState.SELECTING);
  };

  const handleNext = () => {
    const currentIndex = PRACTICE_ITEMS.findIndex(l => l.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % PRACTICE_ITEMS.length;
    handleSelectItem(PRACTICE_ITEMS[nextIndex]);
  };

  const categories: { id: PracticeCategory; label: string }[] = [
    { id: 'letters', label: 'Буквы' },
    { id: 'words', label: 'Слова' },
    { id: 'math', label: 'Математика' },
    { id: 'shapes', label: 'Фигуры' },
  ];

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl cursive-preview shadow-lg shadow-blue-200">
              {selectedItem.char[0]}
            </div>
            <h1 className="font-bold text-slate-800 text-lg">Прописи ИИ</h1>
          </div>
          
          {currentState !== AppState.SELECTING && (
            <button 
              onClick={handleBack}
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              ← Назад к выбору
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8">
        {currentState === AppState.SELECTING && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Что будем тренировать сегодня?
              </h2>
              <p className="mt-4 text-slate-600 text-lg">
                Выберите категорию и объект для практики. Наш ИИ проверит вашу технику.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 p-1 bg-slate-200/50 rounded-2xl max-w-lg mx-auto">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all
                    ${activeCategory === cat.id 
                      ? 'bg-white text-blue-600 shadow-md ring-1 ring-black/5' 
                      : 'text-slate-500 hover:text-slate-800'}
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <PracticeCard
                  key={item.id}
                  item={item}
                  isSelected={selectedItem.id === item.id}
                  onClick={handleSelectItem}
                />
              ))}
            </div>
          </div>
        )}

        {(currentState === AppState.PRACTICING || currentState === AppState.EVALUATING) && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
            <div className="flex items-end justify-between border-b border-slate-200 pb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest rounded-full mb-2">
                  {categories.find(c => c.id === activeCategory)?.label}
                </span>
                <h2 className={`font-bold text-slate-800 flex items-center gap-4 ${selectedItem.category === 'shapes' ? 'text-5xl' : 'text-5xl'}`}>
                  {selectedItem.category === 'shapes' ? (
                    <span>{selectedItem.char}</span>
                  ) : (
                    <span className="cursive-preview">{selectedItem.char}</span>
                  )}
                  <span className="text-slate-300 text-2xl font-light">({selectedItem.name})</span>
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-white">
              <Canvas 
                onClear={() => setError(null)} 
                getCanvasData={() => ''} 
                isEvaluating={isEvaluating}
                guideLetter={selectedItem.char}
              />
              
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 w-full">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center font-bold">!</div>
                      {error}
                    </div>
                  )}
                  {!error && !isEvaluating && (
                    <div className="flex items-center gap-3 text-slate-500 bg-slate-50 p-4 rounded-xl">
                      <div className="shrink-0 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <p className="text-sm">
                        Нарисуйте объект максимально аккуратно. ИИ проанализирует каждый штрих.
                      </p>
                    </div>
                  )}
                  {isEvaluating && (
                    <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm font-bold text-blue-700 uppercase tracking-tight">ИИ анализирует вашу работу...</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating}
                  className={`
                    w-full md:w-auto px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-xl
                    ${isEvaluating 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed translate-y-1' 
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 shadow-blue-200'}
                  `}
                >
                  ОЦЕНИТЬ
                </button>
              </div>
            </div>
          </div>
        )}

        {currentState === AppState.RESULT && evaluation && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 block">Результат для</span>
              <h2 className={`font-black text-slate-800 ${selectedItem.category === 'shapes' ? 'text-5xl' : 'text-6xl cursive-preview'}`}>
                {selectedItem.char}
              </h2>
            </div>
            <ResultView 
              result={evaluation} 
              onRetry={() => setCurrentState(AppState.PRACTICING)} 
              onNext={handleNext}
            />
          </div>
        )}
      </main>

      {/* Floating Action Button for mobile */}
      {currentState !== AppState.SELECTING && (
        <button
          onClick={() => setCurrentState(AppState.SELECTING)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all md:hidden z-50 ring-4 ring-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
