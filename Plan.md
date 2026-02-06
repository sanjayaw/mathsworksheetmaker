# Maths Tutor - Worksheet Generator

## Project Overview
A React app that generates printable maths practice worksheets as downloadable PDFs. Designed for parents to help kids (ages 9-11) practice various maths topics with progressive difficulty and scaffolded hints.

## Current State
**Working:**
- React + Vite + TypeScript setup
- PDF generation with @react-pdf/renderer
- Topic selector UI with dropdown
- 80 problems across 4 pages (20 per page)
- Progressive difficulty ramp with hint fading

**Available Topics:**
1. **Multiplication (Standard Algorithm)** — Traditional method with carry boxes
2. **Multiplication (Partial Products)** — Break into place values method

**Coming Soon:**
- Long Division
- Fractions

---

## Phase 2: Multi-Topic Support

### Topics to Support
1. **Multiplication (Standard Algorithm)** ← PRIMARY - what the kid is learning now
2. **Multiplication (Partial Products)** ← already built
3. **Long Division** ← coming soon
4. **Fractions** ← coming soon

### UI Changes
- Add topic selector dropdown on main page
- "Download Worksheet" generates PDF for selected topic
- Each topic has its own problem generator + PDF layout

### Architecture Refactor

```
src/
├── App.tsx                         — Topic selector + download button
├── types/
│   └── index.ts                    — Shared types + topic-specific types
├── topics/
│   ├── index.ts                    — Topic registry (maps topic ID → generator + renderer)
│   ├── multiplication-standard/
│   │   ├── generateProblems.ts     — Standard algorithm problems
│   │   └── WorksheetPDF.tsx        — Carry boxes layout
│   ├── multiplication-partial/
│   │   ├── generateProblems.ts     — (move existing code here)
│   │   └── WorksheetPDF.tsx        — (move existing code here)
│   ├── long-division/
│   │   ├── generateProblems.ts     — (stub)
│   │   └── WorksheetPDF.tsx        — (stub)
│   └── fractions/
│       ├── generateProblems.ts     — (stub)
│       └── WorksheetPDF.tsx        — (stub)
└── components/
    └── TopicSelector.tsx           — Dropdown component
```

### Multiplication (Standard Algorithm) Layout

**With carry boxes (scaffolded):**
```
       ┌─┐┌─┐
       │²││¹│        ← small boxes for carries (pre-filled for 'full' hint)
       └─┘└─┘
        3  2
      ×    9
      ──────
      ______         ← answer line
```

**Hint levels:**
- `full`: Carry boxes pre-filled with correct carry digits
- `partial`: First carry shown, rest empty boxes
- `structure`: Empty carry boxes shown
- `none`: No carry boxes, just blank space above

**Difficulty ramp (same structure as partial products):**
| Problems | Multiplicand | Multiplier | Hints |
|----------|-------------|------------|-------|
| 1–6 | 10–49 | 2–3 | full |
| 7–12 | 10–99 | 2–5 | partial |
| 13–18 | 10–99 | 4–9 | structure |
| 19–26 | 10–99 | 6–9 | none |
| ... | (same ramp as before) | ... | ... |

### Carry Calculation Logic
For 32 × 9:
1. 2 × 9 = 18 → write 8, carry 1
2. 3 × 9 = 27, + 1 = 28 → write 28

Carries array: [1] (carry from ones to tens)
For 3-digit: carries array has 2 elements
For 4-digit: carries array has 3 elements

---

## Implementation Phases

### Phase 2.1: Refactor to topic-based architecture
1. Create `topics/` folder structure
2. Move existing multiplication-partial code
3. Create topic registry
4. Update App.tsx with topic selector
5. Test existing functionality still works

### Phase 2.2: Add Multiplication (Standard Algorithm)
1. Create carry calculation function
2. Create standard algorithm PDF layout with carry boxes
3. Apply same difficulty ramp
4. Test PDF output

### Phase 2.3: Stub Long Division & Fractions
1. Create placeholder generators (return empty or simple problems)
2. Create placeholder PDF layouts
3. Mark as "Coming Soon" in UI if selected

---

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

## Next Steps

1. ~~Fix bottomLine~~ ✅ Done
2. ~~Topic selector UI~~ ✅ Done
3. ~~Multiplication (Standard Algorithm)~~ ✅ Done
4. Print and validate with your son
5. Future enhancements:
   - Long Division
   - Fractions
   - Answer key (separate page)
   - Difficulty slider
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
