# Maths Tutor - Multiplication Worksheet Generator

## Project Overview
A React app that generates printable multiplication practice worksheets as downloadable PDFs. Designed for parents to help kids (ages 9-11) practice multi-digit multiplication using the partial products (expanded form) method.

## Current State
**Working:**
- React + Vite + TypeScript setup
- PDF generation with @react-pdf/renderer
- 80 problems across 4 pages (20 per page)
- Progressive difficulty ramp with 13 tiers
- Scaffolded hints (full → partial → structure → none) that reset at each difficulty step-change
- Partial products calculation for both single-digit and 2-digit multipliers

**Known Issues to Fix:**
1. **bottomLine not rendering** — Uses `borderTop: '1px solid black'` but @react-pdf/renderer may need explicit height. Fix: add `height: 1` or use `backgroundColor: 'black'`
2. **Inconsistent "+" signs** — 'partial' uses `rowCount - 1` for blanks (always shows "+"), while 'structure' uses `partialProducts.length` then `extraRows` (split logic). Should unify approach.

---

## Architecture

### Files
```
src/
├── App.tsx                    — Main page with download button
├── App.css                    — UI styling
├── components/
│   └── WorksheetPDF.tsx       — PDF document component (4 pages, hint rendering)
├── utils/
│   └── generateProblems.ts    — Problem generation with 13-tier difficulty ramp
└── types/
    └── index.ts               — Problem type definition
```

### Type Definition
```typescript
type Problem = {
  number: number;              // 1-80
  multiplicand: number;        // top number (2-4 digits)
  multiplier: number;          // bottom number (single or 2-digit)
  hintLevel: 'full' | 'partial' | 'structure' | 'none';
  partialProducts: number[];   // computed for hint display
}
```

### Difficulty Tiers (80 problems)
| Problems | Multiplicand | Multiplier | Hints | Notes |
|----------|-------------|------------|-------|-------|
| 1–6 | 10–49 | 2–3 | full | Warm-up |
| 7–12 | 10–99 | 2–5 | partial | Fading |
| 13–18 | 10–99 | 4–9 | structure | Almost there |
| 19–26 | 10–99 | 6–9 | none | Independent |
| 27–32 | 100–499 | 2–3 | full | Re-scaffold: 3-digit |
| 33–38 | 100–499 | 2–5 | partial | Fading |
| 39–44 | 100–999 | 4–7 | structure | Almost there |
| 45–54 | 100–999 | 6–9 | none | Independent |
| 55–60 | 1000–4999 | 2–3 | full | Re-scaffold: 4-digit |
| 61–66 | 1000–9999 | 4–7 | partial | Fading |
| 67–70 | 1000–9999 | 6–9 | none | Independent |
| 71–74 | 1000–9999 | 11–19 | structure | Re-scaffold: 2-digit mult |
| 75–80 | 1000–9999 | 20–99 | none | Boss level |

### Hint Levels Visual
**full** — All partial products shown:
```
    187
  ×   2
  ─────
     14
+   160
+   200
─────────
=
```

**partial** — First product shown, rest blank:
```
    327
  ×   4
  ─────
     28
+ ______
+ ______
─────────
=
```

**structure** — Blank lines with "+" signs:
```
    697
  ×   4
  ─────
  ______
+ ______
+ ______
─────────
=
```

**none** — Faint grey working lines, no "+" visible:
```
    40
  ×  6
  ─────
  ______
  ______
─────────
=
```

---

## Remaining Fixes

### Fix 1: bottomLine not visible
**Problem:** Solid line above "=" doesn't render.

**Code:** `bottomLine: { borderTop: '1px solid black', marginTop: 3, marginBottom: 2 }`

**Fix:** Change to use explicit height:
```javascript
bottomLine: {
  height: 1,
  backgroundColor: 'black',
  marginTop: 3,
  marginBottom: 2,
}
```

### Fix 2: Unify "+" sign logic across hint levels
**Current behavior (verified from code):**
- `full`: `index > 0 ? '+' : ' '` over `partialProducts` ✓
- `partial`: first row = ' ', then `rowCount - 1` rows all with '+' ✓
- `structure`: `index > 0 ? '+' : ' '` over `partialProducts`, then `extraRows` with ' ' (no "+")
- `none`: same as structure but with white text

**Issue:** `extraRows` in structure/full don't show "+", but they represent working space, not partial products. This is actually *correct* — extra padding rows shouldn't have "+".

**Conclusion:** Logic is correct. Visual inconsistency is from bottomLine not rendering, making boxes look different heights.

---

## Next Steps

1. **Fix bottomLine** — Change `borderTop` to `height: 1` + `backgroundColor: 'black'` in WorksheetPDF.tsx:99-103
2. Test PDF download, verify solid line appears above "=" in all boxes
3. Print and validate with your son
4. Future enhancements:
   - Topic selection UI (not just multiplication)
   - Difficulty slider
   - Answer key (separate page)
   - Session history in Postgres (later phase)

---

## How to Run
```bash
cd /Users/sunny.wijewardana/maths.tutor
npm install
npm run dev
# Open http://localhost:5173/
# Click "Download Worksheet" button
```
