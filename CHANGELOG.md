# Changelog

## Unreleased

### Added

- Added `layout` option with `full`, `compact`, and `icon` layouts.
- Added `show_name`, `show_index`, and `show_risk` options for controlling visible text elements.
- Added `decimals` option for UV index formatting, clamped from 0 to 3 decimal places.
- Added Lovelace editor controls for layout, decimals, and text visibility options.

### Changed

- Refactored card rendering into clear TypeScript methods for full, compact, icon, pyramid, risk, and formatting behavior.
- Compact layout now uses a native Home Assistant card-like text/value layout with the pyramid on the right.
- Pyramid rendering preserves the fixed SVG aspect ratio and full UV index threshold granularity.
- README now documents compact and icon examples plus the new configuration options.

### Fixed

- Avoid treating `unknown`, `unavailable`, empty, or non-numeric entity states as UV index 0.
- Fixed inactive low-risk pyramid segments so only active low-risk segments render green.
- Removed unused tap action bookkeeping while preserving configured card actions.
