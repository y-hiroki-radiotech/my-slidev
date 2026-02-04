---
name: design-tracker
description: PROACTIVELY track and document Slidev presentation design decisions without being asked. Activate automatically when detecting layout choices, color scheme decisions, educational design patterns, medical content verification, or any presentation design decisions. Also use when user explicitly says "記録して", "設計どうなってる", "record this". Do NOT wait for user to ask - record important decisions immediately.
---

# Design Tracker Skill

## Purpose

This skill manages the project's design documentation (`.claude/docs/DESIGN.md`). It automatically tracks:
- Layout and visual design decisions
- Educational design patterns
- Medical content verification and accuracy checks
- Slide structure and organization choices
- TODO items and open questions

## When to Activate

- User discusses slide layouts or visual design
- User makes presentation design decisions (e.g., "let's use two-cols layout")
- User verifies medical accuracy or chooses educational approaches
- User says "record this", "add to design", "document this"
- User asks "what's our current design?" or "what have we decided?"
- Important presentation design decisions are made during conversation

## Workflow

### Recording Decisions

1. Read existing `.claude/docs/DESIGN.md`
2. Extract the decision/information from conversation
3. Update the appropriate section
4. Add entry to Changelog with today's date

### Sections to Update

| Conversation Topic | Target Section |
|-------------------|----------------|
| Presentation goals, target audience | Overview |
| Slide structure, organization | Presentation Structure |
| Layout patterns used | Design Decisions > Layouts |
| Color schemes, visual design | Design Decisions > Visual Design |
| Educational approaches | Design Decisions > Educational Design |
| Medical accuracy verification | Design Decisions > Content Verification |
| Why we chose X layout/pattern over Y | Design Decisions > Key Decisions |
| Things to implement later | TODO |
| Unresolved questions | Open Questions |

## Output Format

When recording, confirm in Japanese:
- What was recorded
- Which section was updated
- Brief summary of the change

## Language Rules

- **Thinking/Reasoning**: English
- **Code examples**: English
- **Document content**: English (technical terms) + Japanese (descriptions OK)
- **User communication**: Japanese
