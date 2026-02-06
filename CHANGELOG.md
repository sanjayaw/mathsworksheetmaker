# Changelog

## [0.2.0] - 2026-02-06

### Added
- **Topic selector UI** — dropdown to choose worksheet type
- **Multiplication (Standard Algorithm)** — traditional carry method
  - Small carry boxes above digits (pre-filled → empty → none based on hint level)
  - Single line below multiplier, double line at bottom for answer
  - Same 80-problem difficulty ramp as partial products
- Topic-based architecture (`src/topics/`) for easy addition of new topics
- Placeholder stubs for Long Division and Fractions (Coming Soon)

### Changed
- Refactored from single-topic to multi-topic architecture
- Moved multiplication (partial products) into `src/topics/multiplication-partial/`

## [0.1.0] - 2026-02-06

### Added
- Multiplication worksheet generator with downloadable PDFs
- 80 problems across 4 A4 pages (20 per page)
- Progressive difficulty: 2-digit → 3-digit → 4-digit multiplicands
- Boss level: 4-digit × 2-digit multipliers (problems 71-80)
- Scaffolded hints using partial products method:
  - `full`: all partial products shown
  - `partial`: first product shown, rest blank
  - `structure`: blank lines with "+" signs
  - `none`: faint grey working lines
- Hints reset at each difficulty step-change (re-scaffolding)

### Fixed
- `bottomLine` renders correctly using backgroundColor instead of borderTop
