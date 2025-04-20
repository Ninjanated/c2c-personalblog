# Clinician to Coder Blog

A personal blog about the journey from healthcare to coding, built with Eleventy (11ty).

## Features
- Static site generation with 11ty
- Markdown blog posts
- Responsive design
- Tag support
- Clean and modern UI

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Adding Blog Posts

1. Create a new `.md` file in `src/posts/`
2. Add front matter:
```yaml
---
layout: post.njk
title: Your Post Title
date: YYYY-MM-DD
description: Brief description
tags: ['posts', 'your-tag']
---
```
3. Write your content in markdown

## Directory Structure

- `src/`: Source files
  - `_includes/`: Partial templates
  - `_layouts/`: Page layouts
  - `posts/`: Blog post markdown files
  - `css/`: Stylesheets
- `_site/`: Generated site (not committed)

