# Slidev Slide Test Report

**Test Date:** 2026-02-05 13:11:16
**Target File:** slides.md
**Total Slides:** 33

## Summary

| Item | Count |
|------|-------|
| Tested | 33 |
| Passed | 33 (after fix) |
| Errors (initial) | 3 (slides 16-18) |
| Errors (after fix) | 0 |
| Warnings | 0 |

## Detected Errors (Initial Run)

### Slides 16-18: Vite Error Overlay - Icon Not Found

- **Type:** vite_error / console_error
- **Details:** `Icon 'mdi/cancer' not found` - The `<mdi-cancer>` component used on slide 17 (line 982 of slides.md) does not exist in the @iconify-json/mdi package. This caused the Vite error overlay to appear on slides 16, 17, and 18.
- **Screenshot:** [slide-17-vite-error.png](./screenshots/slide-17-vite-error.png)
- **Fix Applied:** Replaced `<mdi-cancer>` with `<mdi-biohazard>` (contextually appropriate for cancer cell topic)
- **Fix Status:** Automatic fix applied and verified

## Re-test Results (After Fix)

All 33 slides passed:
- No overflow detected
- No scrollbar issues
- No console errors
- No Vite error overlays

## Auto-fix Summary

| Slide | Error | Fix | Status |
|-------|-------|-----|--------|
| 17 | `mdi-cancer` icon not found | Replaced with `mdi-biohazard` | Fixed |

## Checks Performed Per Slide

1. **Vite Error Overlay** - Checked for `vite-error-overlay` element
2. **Content Overflow** - Checked all elements for viewport boundary violations
3. **Vertical Scrollbar** - Compared `scrollHeight` vs `clientHeight`
4. **Horizontal Scrollbar** - Compared `scrollWidth` vs `clientWidth`
5. **Slide Content Presence** - Verified `.slidev-page` element exists
