# Changelog

## [1.1.1] 2024-12-26

### Fixed

- Setting SVG's viewbox directly via JavaScript for CancelIcon.ts and TryAgainIcon.ts doesn't work on Firefox. Has been replaced with setAttribute.

## [1.1.0] 2024-12-19

### Added

- New utility functions swapBodyOnVisibleChange and swapElementsOnVisibleChange. These are intended to simplify deactivating DOM elements when activating the LoadingScreen and reactivating them when the LoadingScreen is done. LoadingScreen is primarily intended as startup code, but just in case someone wants to use it later in their app, these utilities will make it easier to ensure other UI does not interfere with the LoadingScreen.

### Changed

- Symbols for try again and cancel buttons were originally Unicode characters. Browsers are not guaranteed to have fonts for all characters outside of a-z,A-Z,0-9, punctuation, and whitespace. Even if they were, different fonts are going to look different. In order to ensure support and identical functionality across all modern web browsers, the symbols have been replaced with with [SVG](https://en.wikipedia.org/wiki/SVG) elements.
- Moved code inside of Internals folder into new subcategories, Icons and Widgets.
- Changed Background's default zIndex value from "" to "1000".

### Fixed

- Zooming in would result in the spinner going off-center. CSS has been modified to handle this.

## [1.0.0] 2024-12-14

Initial Release
