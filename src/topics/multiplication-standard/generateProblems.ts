import type { StandardProblem } from '../../types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculate carries for standard algorithm multiplication
 * For 32 × 9: 2×9=18 (write 8, carry 1), 3×9+1=28 (write 28)
 * Returns array of carry digits from right to left positions
 */
function calculateCarries(multiplicand: number, multiplier: number): number[] {
  const carries: number[] = [];
  const digits = String(multiplicand).split('').reverse().map(Number);

  let carry = 0;
  for (let i = 0; i < digits.length; i++) {
    const product = digits[i] * multiplier + carry;
    carry = Math.floor(product / 10);
    if (i < digits.length - 1) {
      carries.push(carry);
    }
  }

  return carries; // carries[0] is carry from ones to tens, etc.
}

export function generateProblems(): StandardProblem[] {
  const problems: StandardProblem[] = [];

  // Same difficulty ramp as partial products
  // CYCLE 1: 2-digit multiplicands
  // Problems 1-6: 10-49 × 2-3, full hints (carries shown)
  for (let i = 1; i <= 6; i++) {
    const multiplicand = randomInt(10, 49);
    const multiplier = randomInt(2, 3);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'full',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 7-12: 10-99 × 2-5, partial hints (first carry shown)
  for (let i = 7; i <= 12; i++) {
    const multiplicand = randomInt(10, 99);
    const multiplier = randomInt(2, 5);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'partial',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 13-18: 10-99 × 4-9, structure hints (empty boxes)
  for (let i = 13; i <= 18; i++) {
    const multiplicand = randomInt(10, 99);
    const multiplier = randomInt(4, 9);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'structure',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 19-26: 10-99 × 6-9, no hints
  for (let i = 19; i <= 26; i++) {
    const multiplicand = randomInt(10, 99);
    const multiplier = randomInt(6, 9);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'none',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // CYCLE 2: 3-digit multiplicands (hints restart)
  // Problems 27-32: 100-499 × 2-3, full hints
  for (let i = 27; i <= 32; i++) {
    const multiplicand = randomInt(100, 499);
    const multiplier = randomInt(2, 3);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'full',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 33-38: 100-499 × 2-5, partial hints
  for (let i = 33; i <= 38; i++) {
    const multiplicand = randomInt(100, 499);
    const multiplier = randomInt(2, 5);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'partial',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 39-44: 100-999 × 4-7, structure hints
  for (let i = 39; i <= 44; i++) {
    const multiplicand = randomInt(100, 999);
    const multiplier = randomInt(4, 7);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'structure',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 45-54: 100-999 × 6-9, no hints
  for (let i = 45; i <= 54; i++) {
    const multiplicand = randomInt(100, 999);
    const multiplier = randomInt(6, 9);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'none',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // CYCLE 3: 4-digit multiplicands (hints restart)
  // Problems 55-60: 1000-4999 × 2-3, full hints
  for (let i = 55; i <= 60; i++) {
    const multiplicand = randomInt(1000, 4999);
    const multiplier = randomInt(2, 3);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'full',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 61-66: 1000-9999 × 4-7, partial hints
  for (let i = 61; i <= 66; i++) {
    const multiplicand = randomInt(1000, 9999);
    const multiplier = randomInt(4, 7);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'partial',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  // Problems 67-80: 1000-9999 × 6-9, no hints (more practice at hard level)
  for (let i = 67; i <= 80; i++) {
    const multiplicand = randomInt(1000, 9999);
    const multiplier = randomInt(6, 9);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'none',
      carries: calculateCarries(multiplicand, multiplier),
      answer: multiplicand * multiplier,
    });
  }

  return problems;
}
