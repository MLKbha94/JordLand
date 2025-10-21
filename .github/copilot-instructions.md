# JordLand AI Development Guide

This document provides essential context for AI agents working with the JordLand codebase - a bilingual (Arabic/English) website helping Jordanian students navigate study and work opportunities in Germany.

## Project Architecture

- `index.html` - Single-page application with all main sections
- `css/style.css` - Unified styling with dark/gold theme
- `js/script.js` - Core interactivity and animations
- `html UL/` - Subpages organized by content type:
  - `article*.html` - Blog posts and guides
  - `city-*.html` - City-specific information
  - `service-*.html` - Service descriptions
  - `journey*.html` - Student success stories

## Key Design Patterns

1. **Bilingual Content Structure**
   - Arabic is the primary language (RTL layout)
   - Class names and code comments in English
   - Content sections follow consistent هــوردلنــد branding

2. **CSS Architecture**
   - Dark theme with gold accents (`#d4af37`)
   - Section-based organization in `style.css`
   - Responsive breakpoints at 768px
   - Card-based content displays with hover effects

3. **JavaScript Patterns**
   - Smooth scrolling navigation
   - Intersection Observer for scroll animations
   - WhatsApp integration for customer service
   - Tab-based content filtering (universities section)

## Development Guidelines

1. **Content Organization**
   - New articles go in `html UL/article*.html`
   - City guides follow `city-*.html` naming
   - Service pages use `service-*.html` pattern

2. **Style Conventions**
   ```css
   .section-title {
     color: #d4af37;  // Always use gold for headers
   }
   .card {
     border: 1px solid rgba(212, 175, 55, 0.3);  // Standard card styling
   }
   ```

3. **JavaScript Components**
   - Use event delegation for dynamic elements
   - Maintain WhatsApp integration in all new sections
   - Follow established scroll animation patterns

## Common Tasks

1. **Adding New Content**
   - Create new HTML file in appropriate subdirectory
   - Link from index.html in relevant section
   - Follow existing card/grid layout patterns

2. **Styling New Sections**
   - Add section-specific styles to `style.css`
   - Maintain dark/gold theme consistency
   - Ensure responsive design at 768px breakpoint

3. **Interactive Features**
   - Initialize scroll observers for new sections
   - Add smooth scroll for navigation links
   - Include WhatsApp integration where relevant

## Development Workflow

1. Test all changes with RTL layout
2. Verify responsive design at mobile breakpoint
3. Ensure consistent Arabic/English content structure
4. Maintain WhatsApp button visibility across pages

## Future Development Areas

- Online language courses integration
- Student tutoring system
- German product import/export features