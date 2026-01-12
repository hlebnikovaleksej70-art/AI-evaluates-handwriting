
import React from 'react';
import { EvaluationResult } from '../types';

interface ResultViewProps {
  result: EvaluationResult;
  onRetry: () => void;
  onNext: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onRetry, onNext }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl">
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-200"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={364.4}
                strokeDashoffset={364.4 - (364.4 * result.score) / 100}
                className={getScoreColor(result.score)}
              />
            </svg>
            <span className={`absolute text-3xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}
            </span>
          </div>
          <p className="mt-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Общий балл
          </p>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Анализ почерка</h3>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-200 pl-4">
              "{result.feedback}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-blue-500 uppercase mb-1">Точность</p>
              <p className="text-lg font-bold text-blue-900">{result.accuracy}%</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-xl">
              <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Наклон</p>
              <p className="text-lg font-bold text-indigo-900">{result.slantRating}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-3 flex items-center">
              <span className="bg-slate-800 text-white p-1 rounded-md text-[10px] mr-2">TIPS</span>
              Советы по улучшению
            </h4>
            <ul className="space-y-2">
              {result.tips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-600">
                  <span className="text-green-500 shrink-0">✓</span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRetry}
          className="flex-1 py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
        >
          Попробовать снова
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all"
        >
          Следующая буква
        </button>
      </div>
    </div>
  );
};

export default ResultView;
