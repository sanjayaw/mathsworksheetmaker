import type { ComponentType } from 'react';

export type Problem = {
  number: number;
  multiplicand: number; // The multi-digit number (top)
  multiplier: number; // The single-digit or multi-digit number (bottom)
  hintLevel: 'full' | 'partial' | 'structure' | 'none';
  partialProducts: number[]; // Computed partial products for hint display
};

export type StandardProblem = {
  number: number;
  multiplicand: number; // top number (2-4 digits)
  multiplier: number; // bottom number (single digit for now)
  hintLevel: 'full' | 'partial' | 'structure' | 'none';
  carries: number[]; // carry digits, left-to-right (ones→tens, tens→hundreds, etc.)
  answer: number; // the correct answer
};

export type TopicId =
  | 'multiplication-partial'
  | 'multiplication-standard'
  | 'long-division'
  | 'fractions';

export interface TopicConfig {
  id: TopicId;
  name: string;
  description: string;
  available: boolean;
  generateProblems: () => unknown[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WorksheetPDF: ComponentType<{ problems: any[] }>;
}
