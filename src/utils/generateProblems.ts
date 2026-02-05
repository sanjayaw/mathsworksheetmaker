import type { Problem } from '../types';

/**
 * Generates a random integer between min and max (inclusive)
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates partial products using expanded form
 * For single-digit multiplier: breaks multiplicand into place values
 * For 2-digit multiplier: calculates multiplicand × ones, multiplicand × tens-value
 */
function calculatePartialProducts(multiplicand: number, multiplier: number): number[] {
  if (multiplier < 10) {
    // Single-digit multiplier: break multiplicand into place values
    const digits: number[] = [];
    let temp = multiplicand;
    let placeValue = 1;
    
    while (temp > 0) {
      const digit = temp % 10;
      digits.push(digit * placeValue * multiplier);
      temp = Math.floor(temp / 10);
      placeValue *= 10;
    }
    
    return digits; // Already in ones, tens, hundreds order
  } else {
    // 2-digit multiplier: multiplicand × ones, multiplicand × tens-value
    const ones = multiplier % 10;
    const tens = Math.floor(multiplier / 10) * 10;
    
    return [
      multiplicand * ones,
      multiplicand * tens
    ];
  }
}

/**
 * Generates 80 random multiplication problems with progressive difficulty
 * Hints re-appear every time difficulty steps up (new digit count or multiplier type)
 */
export function generateProblems(): Problem[] {
  const problems: Problem[] = [];

  // CYCLE 1: 2-digit multiplicands, single-digit multipliers
  // Problems 1-6: 10-49 × 2-3, full hints
  for (let i = 1; i <= 6; i++) {
    const multiplicand = randomInt(10, 49);
    const multiplier = randomInt(2, 3);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'full',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // Problems 7-12: 10-99 × 2-5, partial hints
  for (let i = 7; i <= 12; i++) {
    const multiplicand = randomInt(10, 99);
    const multiplier = randomInt(2, 5);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'partial',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // Problems 13-18: 10-99 × 4-9, structure hints
  for (let i = 13; i <= 18; i++) {
    const multiplicand = randomInt(10, 99);
    const multiplier = randomInt(4, 9);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'structure',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
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
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // CYCLE 2: 3-digit multiplicands, single-digit multipliers (hints restart)
  // Problems 27-32: 100-499 × 2-3, full hints
  for (let i = 27; i <= 32; i++) {
    const multiplicand = randomInt(100, 499);
    const multiplier = randomInt(2, 3);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'full',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
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
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
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
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
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
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // CYCLE 3: 4-digit multiplicands, single-digit multipliers (hints restart)
  // Problems 55-60: 1000-4999 × 2-3, full hints
  for (let i = 55; i <= 60; i++) {
    const multiplicand = randomInt(1000, 4999);
    const multiplier = randomInt(2, 3);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'full',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
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
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // Problems 67-70: 1000-9999 × 6-9, no hints
  for (let i = 67; i <= 70; i++) {
    const multiplicand = randomInt(1000, 9999);
    const multiplier = randomInt(6, 9);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'none',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // CYCLE 4: 4-digit × 2-digit multipliers (hints restart for new multiplier type)
  // Problems 71-74: 1000-9999 × 11-19, structure hints
  for (let i = 71; i <= 74; i++) {
    const multiplicand = randomInt(1000, 9999);
    const multiplier = randomInt(11, 19);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'structure',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  // Problems 75-80: 1000-9999 × 20-99, no hints (BOSS LEVEL)
  for (let i = 75; i <= 80; i++) {
    const multiplicand = randomInt(1000, 9999);
    const multiplier = randomInt(20, 99);
    problems.push({
      number: i,
      multiplicand,
      multiplier,
      hintLevel: 'none',
      partialProducts: calculatePartialProducts(multiplicand, multiplier),
    });
  }

  return problems;
}
