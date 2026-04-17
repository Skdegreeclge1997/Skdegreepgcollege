# Phase 02: Informational Hub - UI Specification

**Status:** Draft
**Design Language:** Premium Academic / Glassmorphism

## 1. Component Specs

### 1.1 `HeroSection` (Landing/About)
- **Visuals**: Full-width or boxed high-quality image background with a Navy Blue overlay (opacity 40%).
- **Overlay**: Centered Glassmorphism card containing Title and Breadcrumbs.
- **Animation**: Title fades in with a 20px slide-up.

### 1.2 `NoticeCard`
- **Border**: `border-academic-gold/20`
- **Shadow**: `shadow-sm` on rest, `shadow-md` on hover.
- **Badge**: Category badge in top-right with brand colors (Navy for Admissions, Gold for Events).
- **Date**: Small uppercase text in `slate-500`.

### 1.3 `CourseAccordion`
- **Header**: Large bold Navy text.
- **Content**: Clean list of programs with "Learn More" chevron.
- **Active State**: Gold left-border (4px) to indicate focus.

### 1.4 `FacultyCard`
- **Image**: Aspect ratio 4:5, grayscale by default, color on hover (premium effect).
- **Text**: Centered below image. Name in `academic-navy`, designation in `slate-500`.

## 2. Interaction Design

- **Page Transitions**: Subtle opacity fade between routes.
- **Hover States**: All cards (Notices, Faculty) must lift by `-4px` using `transition-transform duration-300`.
- **Focus**: `focus-visible:ring-2 focus-visible:ring-academic-gold` for all clickable items.

## 3. Visual Assets

### Required Images:
1.  `hero_campus.png` — Stunning wide-angle view of the college building.
2.  `faculty_placeholder.png` — Professional professional silhouette for faculty without photos.
3.  `course_icon_science.png`, `course_icon_arts.png`, etc.

## 4. Typography Rules

- **Headings**: `text-wrap: balance` always.
- **Body**: Max line-width 65ch for readability.
- **Numbers**: `tabular-nums` for all dates in notice cards.

---

*Verified against Vercel Web Guidelines*
