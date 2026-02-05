#!/usr/bin/env node
/**
 * fix-overflow.mjs - Slidev slide overflow auto-fixer
 *
 * Applies graduated spacing/font reductions to overflowing slides.
 *
 * Usage:
 *   node scripts/fix-overflow.mjs slides.md 6,10,11,15
 *   node scripts/fix-overflow.mjs slides.md 6,10,11 --step=2
 *   node scripts/fix-overflow.mjs slides.md --dry-run 6,10
 *
 * Steps:
 *   1 (default): Reduce spacing (mt, mb, p, space-y, gap, circle sizes)
 *   2: Reduce font sizes (text-lg → text-base, text-xl → text-lg)
 *   3: Flag for manual split (prints warning, no auto-change)
 */

import { parse } from '@slidev/parser/core';
import fs from 'fs';

// --- Configuration ---
const STEP1_RULES = [
  // Margins - top
  [/\bmt-8\b/g, 'mt-4'],
  [/\bmt-6\b/g, 'mt-3'],
  [/\bmt-5\b/g, 'mt-3'],
  // Margins - bottom
  [/\bmb-6\b/g, 'mb-3'],
  [/\bmb-5\b/g, 'mb-3'],
  [/\bmb-4\b/g, 'mb-2'],
  [/\bmb-3\b/g, 'mb-2'],
  // Padding
  [/\bp-6\b/g, 'p-4'],
  [/\bp-5\b/g, 'p-3'],
  [/\bp-4\b/g, 'p-3'],
  // Space-y (vertical gaps between children)
  [/\bspace-y-6\b/g, 'space-y-3'],
  [/\bspace-y-5\b/g, 'space-y-2'],
  [/\bspace-y-4\b/g, 'space-y-2'],
  // Gap
  [/\bgap-8\b/g, 'gap-4'],
  [/\bgap-6\b/g, 'gap-3'],
  // Circle elements
  [/\bw-12 h-12\b/g, 'w-10 h-10'],
];

const STEP2_RULES = [
  // Font size reductions (careful: only in div/span class contexts, not headings)
  [/\btext-lg\b/g, 'text-base'],
  [/\btext-xl\b(?!.*<\/h[1-6]>)/g, 'text-lg'],
];

// --- Parse arguments ---
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const stepArg = args.find(a => a.startsWith('--step='));
const step = stepArg ? parseInt(stepArg.split('=')[1]) : 1;

const filteredArgs = args.filter(a => !a.startsWith('--'));
const slidesFile = filteredArgs[0] || 'slides.md';
const slideNumbersStr = filteredArgs[1] || '';

if (!slideNumbersStr) {
  console.error('Usage: node scripts/fix-overflow.mjs <slides-file> <slide-numbers> [--step=N] [--dry-run]');
  console.error('Example: node scripts/fix-overflow.mjs slides.md 6,10,11,15');
  process.exit(1);
}

const targetSlides = new Set(slideNumbersStr.split(',').map(Number));

// --- Read and parse ---
const content = fs.readFileSync(slidesFile, 'utf-8');
const lines = content.split('\n');
const result = await parse(content);

console.log(`Parsed ${result.slides.length} slides from ${slidesFile}`);
console.log(`Target slides: ${[...targetSlides].join(', ')}`);
console.log(`Fix step: ${step}`);
console.log(`Dry run: ${dryRun}`);
console.log('---');

// --- Select rules ---
let rules;
if (step === 1) {
  rules = STEP1_RULES;
} else if (step === 2) {
  rules = STEP2_RULES;
} else {
  console.log('Step 3: Manual split required for these slides.');
  targetSlides.forEach(n => {
    const slide = result.slides[n - 1];
    if (slide) {
      const title = slide.content.split('\n').find(l => l.startsWith('#'))?.trim() || '(no heading)';
      console.log(`  Slide ${n}: ${title} (lines ${slide.start}-${slide.end})`);
    }
  });
  process.exit(0);
}

// --- Apply fixes ---
let changeCount = 0;
const modifiedSlides = [];

for (const slideNum of targetSlides) {
  const slide = result.slides[slideNum - 1];
  if (!slide) {
    console.log(`Slide ${slideNum}: NOT FOUND (skipped)`);
    continue;
  }

  // Get the content lines for this slide (start/end are 0-indexed line numbers)
  const slideStartLine = slide.start;
  const slideEndLine = slide.end;
  let modified = false;

  for (let lineIdx = slideStartLine; lineIdx <= slideEndLine && lineIdx < lines.length; lineIdx++) {
    const originalLine = lines[lineIdx];
    let newLine = originalLine;

    for (const [pattern, replacement] of rules) {
      // Reset regex state (since we use /g flag)
      pattern.lastIndex = 0;
      newLine = newLine.replace(pattern, replacement);
    }

    if (newLine !== originalLine) {
      if (dryRun) {
        console.log(`  L${lineIdx + 1}: "${originalLine.trim()}" → "${newLine.trim()}"`);
      }
      lines[lineIdx] = newLine;
      modified = true;
      changeCount++;
    }
  }

  const title = slide.content.split('\n').find(l => l.startsWith('#'))?.trim() || '(no heading)';
  if (modified) {
    modifiedSlides.push(slideNum);
    console.log(`Slide ${slideNum}: ${title} - MODIFIED`);
  } else {
    console.log(`Slide ${slideNum}: ${title} - no matching patterns`);
  }
}

// --- Write result ---
if (!dryRun && changeCount > 0) {
  fs.writeFileSync(slidesFile, lines.join('\n'));
  console.log('---');
  console.log(`Written ${changeCount} changes to ${slidesFile}`);
  console.log(`Modified slides: ${modifiedSlides.join(', ')}`);
} else if (dryRun) {
  console.log('---');
  console.log(`[DRY RUN] Would make ${changeCount} changes to ${modifiedSlides.length} slides`);
} else {
  console.log('---');
  console.log('No changes needed.');
}
