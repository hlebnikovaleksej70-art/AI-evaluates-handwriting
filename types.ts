
export interface EvaluationResult {
  score: number;
  accuracy: number;
  slantRating: string;
  feedback: string;
  tips: string[];
}

export type PracticeCategory = 'letters' | 'words' | 'math' | 'shapes';

export interface PracticeItem {
  id: string;
  char: string;
  name: string;
  category: PracticeCategory;
}

export enum AppState {
  SELECTING = 'SELECTING',
  PRACTICING = 'PRACTICING',
  EVALUATING = 'EVALUATING',
  RESULT = 'RESULT'
}
