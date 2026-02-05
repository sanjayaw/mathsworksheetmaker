# Changelog

## Unreleased

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
- Minimum row count based on multiplicand digits (ensures 4-digit numbers get 4 working lines)

### Known Issues
- `bottomLine` (solid line above "=") not rendering — needs style fix
