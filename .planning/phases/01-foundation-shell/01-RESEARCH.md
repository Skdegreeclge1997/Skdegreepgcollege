# Phase 01: Foundation & Shell - Research

## Objective
Establish a high-performance, accessible, and maintainable foundation using Next.js 14 and Tailwind CSS for the SK Degree College website.

## Technical Patterns

### 1. Next.js 14 App Router Structure
- **Global Shell**: Use `app/layout.tsx` for the shared header, footer, and navigation.
- **Route Groups**: Organize features into logical groups like `(public)` for informational pages and `(portal)` for the student dashboard to manage distinct layouts without affecting URL paths.
- **Server Components**: Maintain server-side rendering by default for SEO (crucial for course catalogs and notices). Use `'use client'` sparingly for interactive elements like the mobile menu toggle.
- **Loading & Error States**: Implement `loading.tsx` and `error.tsx` at the root and section levels to provide a smooth user experience.

### 2. Accessible Navigation (Disclosure Pattern)
- **Semantic HTML**: Use `<nav>` and `<ul>`/`<li>` for menu structures.
- **Dropdowns**: Implement the **Disclosure Pattern** for any sub-menus. Use `<button aria-expanded="false" aria-controls="menu-id">` to toggle visibility.
- **Mobile Menu**: Ensure the hamburger menu button has a minimum touch target of 44x44px.
- **Keyboard Navigation**: Ensure all links are reachable via `Tab` and the mobile menu can be closed with `Esc`.

### 3. Professional Academic Design System
- **Color Palette (Tailwind)**:
  - **Primary**: `blue-800` (Academic Navy) for branding and headers.
  - **Secondary**: `amber-500` (Gold) for high-impact CTAs.
  - **Background**: `slate-50` for large surfaces to reduce eye strain.
  - **Text**: `slate-900` for high legibility.
- **Typography**: Use a clean, professional sans-serif like **Inter** (Next.js default font).
- **Layout Rule**: Follow the 60-30-10 rule (60% neutrals, 30% primary, 10% accent).

## Validation Architecture (Nyquist)

### Dimension 1: Technical Stack
- [ ] Next.js 14+ is initialized and running.
- [ ] Tailwind CSS is configured and applying styles.

### Dimension 2: Accessibility
- [ ] Keyboard navigation works for the main menu.
- [ ] ARIA labels are present on the mobile menu toggle.

### Dimension 3: Responsiveness
- [ ] Layout switches to mobile hamburger menu at `< 768px`.

## Key Dependencies
- `lucide-react`: For consistent, accessible icons (hamburger, close, search).
- `framer-motion`: (Optional) For smooth micro-animations in the menu transitions.

---

*Phase: 01-foundation-shell*
*Research completed: 2026-04-17*
