
import { PracticeItem } from './types';

export const PRACTICE_ITEMS: PracticeItem[] = [
  // Letters
  { id: 'l1', char: 'А', name: 'A', category: 'letters' },
  { id: 'l2', char: 'Б', name: 'Be', category: 'letters' },
  { id: 'l3', char: 'В', name: 'Ve', category: 'letters' },
  { id: 'l4', char: 'Г', name: 'Ge', category: 'letters' },
  { id: 'l5', char: 'Д', name: 'De', category: 'letters' },
  { id: 'l6', char: 'Е', name: 'Ye', category: 'letters' },
  { id: 'l7', char: 'Ж', name: 'Zhe', category: 'letters' },
  { id: 'l8', char: 'З', name: 'Ze', category: 'letters' },
  { id: 'l9', char: 'И', name: 'I', category: 'letters' },
  { id: 'l10', char: 'К', name: 'Ka', category: 'letters' },
  { id: 'l11', char: 'Л', name: 'El', category: 'letters' },
  { id: 'l12', char: 'М', name: 'Em', category: 'letters' },
  { id: 'l13', char: 'Н', name: 'En', category: 'letters' },
  { id: 'l14', char: 'О', name: 'O', category: 'letters' },
  { id: 'l15', char: 'П', name: 'Pe', category: 'letters' },
  { id: 'l16', char: 'Р', name: 'Er', category: 'letters' },
  { id: 'l17', char: 'С', name: 'Es', category: 'letters' },
  { id: 'l18', char: 'Т', name: 'Te', category: 'letters' },
  { id: 'l19', char: 'У', name: 'U', category: 'letters' },
  { id: 'l20', char: 'Ф', name: 'Ef', category: 'letters' },
  { id: 'l21', char: 'Я', name: 'Ya', category: 'letters' },

  // Words
  { id: 'w1', char: 'Мама', name: 'Mother', category: 'words' },
  { id: 'w2', char: 'Мир', name: 'Peace', category: 'words' },
  { id: 'w3', char: 'Школа', name: 'School', category: 'words' },
  { id: 'w4', char: 'Привет', name: 'Hello', category: 'words' },
  { id: 'w5', char: 'Россия', name: 'Russia', category: 'words' },
  { id: 'w6', char: 'Кот', name: 'Cat', category: 'words' },
  { id: 'w7', char: 'Солнце', name: 'Sun', category: 'words' },

  // Math
  { id: 'm1', char: '123', name: 'Numbers', category: 'math' },
  { id: 'm2', char: 'π', name: 'Pi', category: 'math' },
  { id: 'm3', char: '∞', name: 'Infinity', category: 'math' },
  { id: 'm4', char: 'Σ', name: 'Sigma', category: 'math' },
  { id: 'm5', char: '√', name: 'Square Root', category: 'math' },
  { id: 'm6', char: 'x + y = z', name: 'Equation', category: 'math' },
  { id: 'm7', char: 'f(x)', name: 'Function', category: 'math' },

  // Shapes
  { id: 's1', char: '○', name: 'Circle', category: 'shapes' },
  { id: 's2', char: '□', name: 'Square', category: 'shapes' },
  { id: 's3', char: '△', name: 'Triangle', category: 'shapes' },
  { id: 's4', char: '☆', name: 'Star', category: 'shapes' },
  { id: 's5', char: '♡', name: 'Heart', category: 'shapes' },
  { id: 's6', char: '⬡', name: 'Hexagon', category: 'shapes' },
];

export const MODEL_NAME = 'gemini-3-flash-preview';
