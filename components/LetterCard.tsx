
import React from 'react';
import { PracticeItem } from '../types';

interface PracticeCardProps {
  item: PracticeItem;
  onClick: (item: PracticeItem) => void;
  isSelected: boolean;
}

const PracticeCard: React.FC<PracticeCardProps> = ({ item, onClick, isSelected }) => {
  const isWord = item.category === 'words';
  const isShape = item.category === 'shapes';

  return (
    <button
      onClick={() => onClick(item)}
      className={`
        group relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200
        ${isSelected 
          ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 scale-105 z-10' 
          : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-md'}
        ${isWord ? 'col-span-2' : 'col-span-1'}
      `}
    >
      <span className={`
        ${isShape ? 'text-5xl' : 'cursive-preview text-4xl'} 
        mb-1 text-slate-800 group-hover:text-blue-600 transition-colors truncate w-full px-2
      `}>
        {item.char}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {item.name}
      </span>
    </button>
  );
};

export default PracticeCard;
