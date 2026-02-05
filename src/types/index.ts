export type Problem = {
  number: number;
  multiplicand: number; // The multi-digit number (top)
  multiplier: number; // The single-digit or multi-digit number (bottom)
  hintLevel: 'full' | 'partial' | 'structure' | 'none';
  partialProducts: number[]; // Computed partial products for hint display
};
