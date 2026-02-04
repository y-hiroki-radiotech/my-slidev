---
name: context-loader
description: Load project context from .claude/ directory at the start of every task. This ensures Gemini CLI has the same design principles, medical content standards, and Slidev constraints as Claude Code.
---

# Context Loader Skill for Gemini

## Purpose

Load shared project context from `.claude/` directory to ensure Gemini CLI operates with the same knowledge as Claude Code for Slidev medical education presentations.

## When to Activate

**ALWAYS** - This skill should run at the beginning of research or analysis tasks.

## Workflow

### Step 1: Load Development Rules

Read relevant files from `.claude/rules/`:

```
.claude/rules/
├── gemini-delegation.md      # When and how to use Gemini
├── dev-environment-slidev.md # npm, Slidev workflows
├── language.md               # Think in English, respond in Japanese
└── security.md               # Medical privacy, image paths, PII protection
```

### Step 2: Load Design Documentation

Read `.claude/docs/DESIGN.md` for:
- Presentation design decisions
- Layout pattern choices
- Educational design approaches
- Medical content verification history

### Step 3: Load Style Guide and Patterns

Read design resources:
```
.claude/docs/style-guide.md        # Visual design principles
.claude/format/layout-patterns.md  # 40 available layout patterns
.claude/format/template_sides.md   # Slide templates
```

### Step 4: Check Lesson Plans (if relevant)

For lecture-related research, read:
```
lesson_plan/
├── 第1回授業の全体像.md
└── 本論部分の詳細.md
```

### Step 5: Execute Research Task

With the loaded context, execute the requested research/analysis following:
- Medical accuracy standards
- Educational design principles
- Slidev layout constraints
- Japanese medical education context

## Key Rules to Remember

1. **Medical accuracy first** - Verify against latest guidelines
2. **Educational effectiveness** - Consider cognitive load, visual hierarchy
3. **Slidev constraints** - 28pt minimum text, 1 message per slide
4. **Layout patterns** - Reference the 40 available patterns
5. **Cultural context** - Japanese medical education standards

## Language Protocol

- **Thinking/Reasoning**: English
- **Code examples**: English (Slidev markdown, Vue components)
- **Medical terminology**: English (international standard terms)
- **Output**: Structured markdown, suitable for documentation

## Output Guidelines

When providing research results:
- Structure with clear headings
- Include Slidev code examples when relevant (markdown syntax)
- Cite medical sources (clinical guidelines, papers)
- Note layout pattern recommendations (e.g., "Use Pattern #12 two-cols")
- Save comprehensive findings to `.claude/docs/research/`

## Specialized Context for Medical Education

### Medical Accuracy
- Reference latest clinical guidelines
- Verify terminology against international standards
- Note any Japan-specific practices

### Educational Design
- Target audience: Medical students/residents/specialists
- Learning objectives: Knowledge, skills, attitudes
- Cognitive load: Minimize per slide
- Visual design: Maximize clarity and impact

### Slidev Technical
- Layouts: default, two-cols, center, image-right, etc.
- Icons: @iconify-json/mdi (Material Design Icons)
- Themes: seriph (primary), apple-basic
- Export: PDF optimization considerations

## Research Categories

Organize research output by category:

| Category | File Pattern | Purpose |
|----------|--------------|---------|
| Medical | `medical-{topic}.md` | Accuracy verification, guidelines |
| Educational | `educational-{topic}.md` | Design consultation, pedagogy |
| Layout | `layout-{topic}.md` | Slidev layout optimization |
| Codebase | `codebase-analysis.md` | Project structure analysis |

## Example Context Loading

```markdown
# Context Loaded for Research Task

## Design Principles (from style-guide.md)
- Primary color: #1e3a8a (deep blue)
- Minimum text: 28pt
- Layout: 1 message per slide

## Available Layouts (from layout-patterns.md)
- Pattern #12: Comparison two-cols
- Pattern #18: Pros-cons grid
- Pattern #25: Timeline vertical

## Medical Standards (from DESIGN.md)
- Verify against NCCN/ASTRO guidelines
- Use international terminology
- Flag patient safety concerns

## Educational Goals (from lesson_plan/)
- Target: Medical students
- Duration: 90 minutes
- Learning objectives: [specific to lecture]

[Proceed with research task with this context]
```

## Post-Research Actions

After completing research:
1. Save findings to `.claude/docs/research/{category}-{topic}.md`
2. Update `.claude/docs/DESIGN.md` if design decisions were made
3. Log completion for Claude Code to reference
