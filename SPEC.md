# Undangan Digital Wedding - Specification

## Project Overview
- **Project Name**: Digital Wedding Invitation
- **Type**: Landing Page (Vite + React + SCSS)
- **Core Functionality**: Elegant wedding invitation page with animations and RSVP functionality
- **Target Users**: Wedding couples, event planners

## Visual & Rendering Specification

### Design Theme
- **Style**: Modern, Professional, Elegant
- **Color Palette**:
  - Primary: `#1a1a2e` (Deep Navy)
  - Secondary: `#c9a96e` (Gold)
  - Accent: `#f8f5f2` (Cream White)
  - Background: `#0f0f1a` (Dark)
  - Text: `#e8e8e8` (Light Gray)
- **Typography**:
  - Headings: Playfair Display (serif, elegant)
  - Body: Raleway (clean, modern)

### Layout Sections
1. **Hero Section** - Full-screen with couple names, wedding date, animated background
2. **Couple Section** - Bride & Groom profiles with photos
3. **Event Details** - Date, time, venue with map integration
4. **Gallery** - Wedding photo gallery with lightbox
5. **RSVP** - Guest confirmation form
6. **Footer** - Social links, countdown timer

### Visual Effects
- Smooth scroll animations (Intersection Observer)
- Parallax scrolling on hero
- Fade-in/up animations on scroll
- Elegant gold accent underlines
- Floating particles animation
- Hover effects on interactive elements

## Interaction Specification

### User Controls
- Smooth scroll navigation
- RSVP form submission
- Gallery lightbox navigation
- Copy venue address button

### Animations
- Staggered fade-in for content blocks
- Text reveal animations
- Smooth section transitions
- Loading spinner for form submission

## Technical Stack
- Vite + React 18
- SCSS (modular styling)
- React Hooks for state management
- Intersection Observer for scroll animations

## Acceptance Criteria
- [x] Hero section displays couple names and date prominently
- [x] Smooth scroll navigation works
- [x] All sections animate on scroll
- [x] RSVP form validates and shows success message
- [x] Gallery lightbox opens/closes properly
- [x] Responsive design works on mobile/tablet/desktop
- [x] No console errors
