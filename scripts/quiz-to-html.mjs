#!/usr/bin/env node
/**
 * quiz-to-html.mjs - Quiz Markdown to print-ready HTML converter
 *
 * Converts quiz markdown files to A4-optimized HTML for PDF generation.
 * Supports --split mode to generate separate question and answer files.
 *
 * Usage:
 *   node scripts/quiz-to-html.mjs quizzes/quiz-file.md
 *   node scripts/quiz-to-html.mjs quizzes/quiz-file.md --split
 *   node scripts/quiz-to-html.mjs quizzes/quiz-file.md --output custom-name.html
 */

import fs from 'fs';
import path from 'path';

// --- Parse arguments ---
const args = process.argv.slice(2);
const splitMode = args.includes('--split');
const outputArg = args.find((_, i) => args[i - 1] === '--output');
const inputFile = args.find(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--output');

if (!inputFile) {
  console.error('Usage: node scripts/quiz-to-html.mjs <quiz-markdown-file> [--split] [--output <output-file>]');
  console.error('Example: node scripts/quiz-to-html.mjs quizzes/radiation-quiz-20260207.md --split');
  process.exit(1);
}

if (!fs.existsSync(inputFile)) {
  console.error(`File not found: ${inputFile}`);
  process.exit(1);
}

// --- Read markdown ---
const markdown = fs.readFileSync(inputFile, 'utf-8');

// --- Convert markdown to HTML ---
function convertMarkdownToHtml(md) {
  const lines = md.split('\n');
  const htmlLines = [];
  let inAnswerSection = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Detect answer section boundary (double horizontal rule or ## 解答)
    if (line.match(/^## 解答/) || (line.trim() === '---' && i > 0 && lines[i - 1]?.trim() === '---')) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      inAnswerSection = true;
      if (line.match(/^## 解答/)) {
        htmlLines.push('<div class="answer-section">');
        htmlLines.push(`<h2>${escapeHtml(line.replace(/^## /, ''))}</h2>`);
      } else {
        htmlLines.push('<div class="answer-section">');
      }
      continue;
    }

    // Skip standalone --- (horizontal rules used as question separators)
    if (line.trim() === '---') {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push('<hr>');
      continue;
    }

    // Headings
    if (line.match(/^### /)) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h3>${processInline(line.replace(/^### /, ''))}</h3>`);
      continue;
    }
    if (line.match(/^## /)) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h2>${processInline(line.replace(/^## /, ''))}</h2>`);
      continue;
    }
    if (line.match(/^# /)) {
      if (inList) {
        htmlLines.push('</ul>');
        inList = false;
      }
      htmlLines.push(`<h1>${processInline(line.replace(/^# /, ''))}</h1>`);
      continue;
    }

    // List items (- A. style or - plain)
    if (line.match(/^- /)) {
      if (!inList) {
        htmlLines.push('<ul>');
        inList = true;
      }
      htmlLines.push(`<li>${processInline(line.replace(/^- /, ''))}</li>`);
      continue;
    }

    // Close list if we hit a non-list line
    if (inList && line.trim() !== '') {
      htmlLines.push('</ul>');
      inList = false;
    }

    // Empty lines
    if (line.trim() === '') {
      htmlLines.push('');
      continue;
    }

    // Regular paragraphs
    htmlLines.push(`<p>${processInline(line)}</p>`);
  }

  if (inList) {
    htmlLines.push('</ul>');
  }
  if (inAnswerSection) {
    htmlLines.push('</div>');
  }

  return htmlLines.join('\n');
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function processInline(text) {
  // Preserve existing HTML tags (like <span style="color: red;">)
  // Process markdown bold (**text**) outside of HTML tags
  let result = '';
  let i = 0;

  while (i < text.length) {
    // Detect HTML tags - pass through unchanged
    if (text[i] === '<') {
      const tagEnd = text.indexOf('>', i);
      if (tagEnd !== -1) {
        // Check if it's a closing tag or self-closing
        const tagContent = text.slice(i, tagEnd + 1);
        result += tagContent;
        i = tagEnd + 1;
        continue;
      }
    }

    // Bold: **text**
    if (text[i] === '*' && text[i + 1] === '*') {
      const closeIdx = text.indexOf('**', i + 2);
      if (closeIdx !== -1) {
        result += `<strong>${text.slice(i + 2, closeIdx)}</strong>`;
        i = closeIdx + 2;
        continue;
      }
    }

    // Inline code: `text`
    if (text[i] === '`') {
      const closeIdx = text.indexOf('`', i + 1);
      if (closeIdx !== -1) {
        result += `<code>${escapeHtml(text.slice(i + 1, closeIdx))}</code>`;
        i = closeIdx + 1;
        continue;
      }
    }

    result += text[i];
    i++;
  }

  return result;
}

// --- Split markdown into questions and answers ---
function splitMarkdown(md) {
  // Split at the answer section boundary (## 解答 or double ---)
  const lines = md.split('\n');
  const questionLines = [];
  const answerLines = [];
  let inAnswerSection = false;
  let headerLines = []; // Title and metadata before ## 問題

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.match(/^## 解答/)) {
      inAnswerSection = true;
      answerLines.push(line);
      continue;
    }

    // Double --- before answer section
    if (!inAnswerSection && line.trim() === '---' && i > 0 && lines[i - 1]?.trim() === '---') {
      // Check if next non-empty line starts the answer section
      const nextContent = lines.slice(i + 1).find(l => l.trim() !== '');
      if (nextContent && nextContent.match(/^## 解答/)) {
        continue; // Skip the double separator
      }
    }

    if (inAnswerSection) {
      answerLines.push(line);
    } else {
      questionLines.push(line);
    }
  }

  // Extract header (title + metadata) for answer sheet too
  const headerEnd = questionLines.findIndex(l => l.match(/^## 問題/));
  if (headerEnd > 0) {
    headerLines = questionLines.slice(0, headerEnd);
  }

  return {
    questions: questionLines.join('\n'),
    answers: headerLines.join('\n') + '\n\n' + answerLines.join('\n')
  };
}

// --- Build HTML wrapper ---
function wrapHtml(bodyHtml, title, isAnswerSheet = false) {
  const answerStyles = isAnswerSheet ? `
  .answer-section h2 {
    color: #c00;
    border-bottom: 2px solid #c00;
    padding-bottom: 6px;
  }` : '';

  return `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  @page {
    size: A4;
    margin: 20mm;
    @bottom-center {
      content: counter(page);
      font-size: 10pt;
      color: #666;
    }
  }

  body {
    font-family: "Hiragino Kaku Gothic ProN", "Hiragino Sans", "Meiryo", "Noto Sans JP", sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #333;
    max-width: 210mm;
    margin: 0 auto;
    padding: 20mm;
  }

  h1 {
    font-size: 18pt;
    border-bottom: 2px solid #1e3a8a;
    padding-bottom: 8px;
    margin-bottom: 16px;
    color: #1e3a8a;
  }

  h2 {
    font-size: 14pt;
    color: #1e3a8a;
    margin-top: 24px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 12pt;
    margin-top: 20px;
    margin-bottom: 8px;
    color: #333;
  }

  p {
    margin: 6px 0;
  }

  ul {
    margin: 8px 0;
    padding-left: 24px;
  }

  li {
    margin: 4px 0;
  }

  hr {
    border: none;
    border-top: 1px solid #ddd;
    margin: 16px 0;
  }

  strong {
    font-weight: bold;
  }

  code {
    background: #f5f5f5;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 10pt;
  }

  .answer-section {
    page-break-before: always;
  }
  ${answerStyles}

  @media print {
    body {
      padding: 0;
    }
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

// --- Generate output ---
if (splitMode) {
  const { questions, answers } = splitMarkdown(markdown);
  const baseName = inputFile.replace(/\.md$/, '');

  const questionsHtml = wrapHtml(convertMarkdownToHtml(questions), '確認テスト（問題）');
  const answersHtml = wrapHtml(convertMarkdownToHtml(answers), '確認テスト（解答・解説）', true);

  const qFile = `${baseName}-questions.html`;
  const aFile = `${baseName}-answers.html`;

  fs.writeFileSync(qFile, questionsHtml, 'utf-8');
  fs.writeFileSync(aFile, answersHtml, 'utf-8');

  console.log(`Split mode: ${inputFile}`);
  console.log(`  Questions: ${qFile}`);
  console.log(`  Answers:   ${aFile}`);
} else {
  const bodyHtml = convertMarkdownToHtml(markdown);
  const fullHtml = wrapHtml(bodyHtml, '確認テスト');

  const outputFile = outputArg || inputFile.replace(/\.md$/, '.html');
  fs.writeFileSync(outputFile, fullHtml, 'utf-8');

  console.log(`Converted: ${inputFile} → ${outputFile}`);
  console.log(`Answer section: ${markdown.includes('## 解答') ? 'detected (page break added)' : 'not found'}`);
}
