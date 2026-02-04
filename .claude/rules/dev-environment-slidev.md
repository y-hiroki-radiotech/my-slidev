# Slidev Development Environment

## Package Management

This project uses npm for package management.

### Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Export to PDF
npm run export

# Export to static HTML
npm run export-html
```

### Common Scripts

```bash
# Start development server (via script)
bash scripts/start-server.sh

# Export PDF (via script)
bash scripts/export-pdf.sh slides.md

# Check layout issues
bash scripts/check-layout.sh

# Cleanup temporary files
bash scripts/cleanup.sh
```

## Development Workflow

### 1. Slide Creation
- Edit `slides.md` or files in `pages/`
- Use development server for live preview
- Follow style guide in `docs/style-guide.md`
- Reference layout patterns in `format/layout-patterns.md`

### 2. Testing Changes
- Development server auto-reloads on file changes
- Check layout with `/layout-fix` skill
- Verify styles with `/slide-style-rector` skill

### 3. PDF Export
- Use `/prepare-pdf` skill for optimization
- Automatically adjusts background and text colors
- Exports to PDF format

## Directory Structure

```
slides.md                 # Main presentation file
pages/                    # Individual slide pages
components/               # Vue components
layouts/                  # Custom layouts
public/                   # Static assets (images, etc.)
format/                   # Templates and patterns
docs/                     # Documentation
scripts/                  # Automation scripts
.claude/                  # Claude Code configuration
```

## Slidev-Specific Tools

### Icons
- Uses @iconify-json/mdi (Material Design Icons)
- Use appropriate icons in slides: `<mdi-icon-name />`

### Themes
- Primary: seriph
- Alternative: apple-basic, default
- Configure in slides.md frontmatter

### Code Formatting
- Prettier with prettier-plugin-slidev
- Auto-formats on save (if configured in editor)

## Best Practices

1. **One message per slide** - Keep slides focused
2. **28pt minimum** - Ensure readability
3. **Proper spacing** - Use mt-5, mb-5 classes
4. **Layout patterns** - Choose from 40 patterns in format/layout-patterns.md
5. **Git commits** - Commit before major changes
6. **Preview always** - Check development server before finalizing

## Troubleshooting

### Development server won't start
```bash
npm install  # Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### PDF export fails
```bash
# Use the prepare-pdf skill
# It handles optimization automatically
/prepare-pdf
```

### Layout issues
```bash
# Use layout-fix skill for automatic detection
/layout-fix
```

## Environment Variables

No environment variables required for basic Slidev usage.

For custom integrations, create `.env` file (never commit):
```bash
# .env (example)
CUSTOM_API_KEY=your-key-here
```

## Dependencies

Main dependencies:
- @slidev/cli
- @slidev/theme-seriph
- @slidev/theme-apple-basic
- @iconify-json/mdi
- prettier
- prettier-plugin-slidev

See `package.json` for complete list.
