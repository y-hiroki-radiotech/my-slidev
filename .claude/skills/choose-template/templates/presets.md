# Template Presets

5 visual template presets for Slidev presentations.
Each preset includes 3 sample slides: Title, Section Divider, Content.

---

## Template 1: Classic White

### Description
Clean and professional white-based design. Suitable for business, academic, and general presentations. Blue accent colors provide visual hierarchy without overwhelming the content.

### Color Palette
- Primary: `#1e3a8a`
- Accent: `#3b82f6`
- Background: `white`
- Text: default (dark)
- ColorSchema: `light`
- Theme: `seriph`

### Sample Slides

#### Slide 1: Title

```markdown
---
theme: seriph
colorSchema: light
background: white
class: text-center
transition: slide-left
title: Sample Presentation
mdc: true
---

<div class="flex flex-col items-center justify-center h-full">
  <mdi-presentation class="text-7xl text-blue-800 mb-6" />
  <h1 class="text-5xl font-bold text-gray-900 mb-4">Sample Presentation</h1>
  <p class="text-2xl text-gray-500">Subtitle goes here</p>
  <div class="mt-8 text-lg text-gray-400">2026.02.05</div>
</div>
```

#### Slide 2: Section Divider

```markdown
---
layout: section
background: 'linear-gradient(135deg, #1e40af, #3b82f6)'
class: text-center text-white
---

<h1 class="text-5xl font-bold">Section Title</h1>
<p class="text-2xl mt-4 opacity-80">Section description</p>
```

#### Slide 3: Content

```markdown
---
background: white
---

<h1 class="text-3xl font-bold text-blue-900 mb-6"><mdi-lightbulb class="text-blue-600" /> Key Concepts</h1>

***

<div class="mt-5"></div>

<div class="text-xl space-y-4">

- **First Point** - Description of the first key concept
- **Second Point** - Description of the second key concept
- **Third Point** - Description of the third key concept

</div>

<div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r text-lg">
  <strong>Key takeaway:</strong> Summary of the important message
</div>
```

---

## Template 2: Dark Professional

### Description
Sophisticated dark theme with bright accent colors. Ideal for tech presentations, product launches, and evening events. High contrast ensures readability.

### Color Palette
- Primary: `#0f172a`
- Accent: `#38bdf8`
- Background: `#0f172a`
- Text: `white`
- ColorSchema: `dark`
- Theme: `seriph`

### Sample Slides

#### Slide 1: Title

```markdown
---
theme: seriph
colorSchema: dark
background: '#0f172a'
class: text-center
transition: slide-left
title: Sample Presentation
mdc: true
---

<div class="flex flex-col items-center justify-center h-full">
  <mdi-rocket-launch class="text-7xl text-sky-400 mb-6" />
  <h1 class="text-5xl font-bold text-white mb-4">Sample Presentation</h1>
  <p class="text-2xl text-sky-300">Subtitle goes here</p>
  <div class="mt-8 text-lg text-slate-500">2026.02.05</div>
</div>
```

#### Slide 2: Section Divider

```markdown
---
layout: section
background: 'linear-gradient(135deg, #1e293b, #334155)'
class: text-center text-white
---

<div class="border-t-2 border-sky-400 w-24 mx-auto mb-6"></div>
<h1 class="text-5xl font-bold">Section Title</h1>
<p class="text-2xl mt-4 text-sky-300">Section description</p>
```

#### Slide 3: Content

```markdown
---
background: '#0f172a'
class: text-white
---

<h1 class="text-3xl font-bold text-sky-400 mb-6"><mdi-cube-outline class="text-sky-400" /> Key Concepts</h1>

***

<div class="mt-5"></div>

<div class="text-xl space-y-4">

- **First Point** - Description of the first key concept
- **Second Point** - Description of the second key concept
- **Third Point** - Description of the third key concept

</div>

<div class="mt-6 p-4 bg-slate-800 border-l-4 border-sky-400 rounded-r text-lg">
  <strong>Key takeaway:</strong> Summary of the important message
</div>
```

---

## Template 3: Gradient Cover

### Description
Bold and modern design with vivid purple/indigo gradients. Perfect for creative presentations, startups, and design-focused topics. White content slides balance the vibrant covers.

### Color Palette
- Primary: `#4f46e5`
- Accent: `#7c3aed`
- Background: `white`
- Text: default (dark)
- ColorSchema: `light`
- Theme: `seriph`

### Sample Slides

#### Slide 1: Title

```markdown
---
theme: seriph
colorSchema: light
background: 'linear-gradient(135deg, #667eea, #764ba2)'
class: text-center text-white
transition: slide-left
title: Sample Presentation
mdc: true
---

<div class="flex flex-col items-center justify-center h-full">
  <mdi-star-four-points class="text-7xl text-white opacity-90 mb-6" />
  <h1 class="text-5xl font-bold mb-4">Sample Presentation</h1>
  <p class="text-2xl opacity-80">Subtitle goes here</p>
  <div class="mt-8 text-lg opacity-60">2026.02.05</div>
</div>
```

#### Slide 2: Section Divider

```markdown
---
layout: section
background: 'linear-gradient(135deg, #4f46e5, #7c3aed)'
class: text-center text-white
---

<h1 class="text-5xl font-bold">Section Title</h1>
<p class="text-2xl mt-4 opacity-80">Section description</p>
```

#### Slide 3: Content

```markdown
---
background: white
---

<h1 class="text-3xl font-bold text-indigo-800 mb-6"><mdi-shape-outline class="text-indigo-600" /> Key Concepts</h1>

***

<div class="mt-5"></div>

<div class="text-xl space-y-4">

- **First Point** - Description of the first key concept
- **Second Point** - Description of the second key concept
- **Third Point** - Description of the third key concept

</div>

<div class="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-500 rounded-r text-lg">
  <strong>Key takeaway:</strong> Summary of the important message
</div>
```

---

## Template 4: Apple Minimal

### Description
Ultra-clean minimalist design inspired by Apple keynotes. Maximum whitespace, large typography, minimal decorations. Best for product presentations and executive briefings where simplicity is key.

### Color Palette
- Primary: `#1d1d1f`
- Accent: `#0071e3`
- Background: `white`
- Text: `#1d1d1f`
- ColorSchema: `light`
- Theme: `apple-basic`

### Sample Slides

#### Slide 1: Title

```markdown
---
theme: apple-basic
colorSchema: light
background: white
class: text-center
transition: slide-left
title: Sample Presentation
mdc: true
---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="text-6xl font-bold text-gray-900 mb-6">Sample Presentation</h1>
  <p class="text-2xl text-gray-400 font-light">Subtitle goes here</p>
</div>
```

#### Slide 2: Section Divider

```markdown
---
layout: section
background: white
class: text-center
---

<div class="flex flex-col items-center justify-center">
  <div class="w-12 h-0.5 bg-blue-500 mb-8"></div>
  <h1 class="text-5xl font-bold text-gray-900">Section Title</h1>
</div>
```

#### Slide 3: Content

```markdown
---
background: white
---

<h1 class="text-3xl font-bold text-gray-900 mb-8">Key Concepts</h1>

<div class="text-xl space-y-6 text-gray-700">

- **First Point** - Description of the first key concept
- **Second Point** - Description of the second key concept
- **Third Point** - Description of the third key concept

</div>

<div class="mt-8 text-lg text-blue-600 font-medium">
  Key takeaway: Summary of the important message
</div>
```

---

## Template 5: Academic Navy

### Description
Formal and structured design with navy blue accents. Tailored for academic lectures, research presentations, and institutional settings. Conveys authority and credibility.

### Color Palette
- Primary: `#1e3a5f`
- Accent: `#2563eb`
- Background: `white`
- Text: default (dark)
- ColorSchema: `light`
- Theme: `seriph`

### Sample Slides

#### Slide 1: Title

```markdown
---
theme: seriph
colorSchema: light
background: '#1e3a5f'
class: text-center text-white
transition: slide-left
title: Sample Presentation
mdc: true
---

<div class="flex flex-col items-center justify-center h-full">
  <h1 class="text-5xl font-bold mb-4">Sample Presentation</h1>
  <p class="text-2xl opacity-80">Subtitle goes here</p>
  <div class="mt-8 w-24 h-0.5 bg-blue-400 mx-auto"></div>
  <div class="mt-4 text-lg opacity-60">2026.02.05</div>
</div>
```

#### Slide 2: Section Divider

```markdown
---
layout: section
background: 'linear-gradient(to right, #1e3a5f, #2563eb)'
class: text-center text-white
---

<h1 class="text-5xl font-bold">Section Title</h1>
<p class="text-2xl mt-4 opacity-80">Section description</p>
```

#### Slide 3: Content

```markdown
---
background: white
---

<h1 class="text-3xl font-bold text-gray-800 mb-6"><mdi-book-open-variant class="text-blue-800" /> Key Concepts</h1>

***

<div class="mt-5"></div>

<div class="text-xl space-y-4">

- **First Point** - Description of the first key concept
- **Second Point** - Description of the second key concept
- **Third Point** - Description of the third key concept

</div>

<div class="mt-6 p-4 bg-slate-50 border-l-4 border-blue-800 rounded-r text-lg">
  <strong>Key takeaway:</strong> Summary of the important message
</div>
```
