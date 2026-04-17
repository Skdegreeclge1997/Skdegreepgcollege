# Phase 02: Informational Hub - Research

**Date:** 2026-04-17
**Phase:** 02

## 1. Technical Approach: Local-First Headless CMS

To meet the requirement for "Headless CMS" while maintaining maximum development speed and visual polish, we will use a **Local Content Model** initially, powered by a standard JSON structure in `lib/data/`. This allows us to:
1. Define the exact schema needed for Courses and Faculty.
2. Build all UI components with real-world data.
3. Easily migrate to Sanity.io or Payload CMS by swapping the data fetcher later.

### Content Schema
- **Course**: `id`, `slug`, `title`, `department`, `degree` (UG/PG), `duration`, `description`, `eligibility`, `careerProspects`.
- **Faculty**: `id`, `name`, `designation`, `department`, `qualification`, `experience`, `specialization`, `image`, `email`.
- **Notice**: `id`, `title`, `date`, `category` (Admission, Exam, Event), `content`, `isPinned`.

## 2. UI/UX Patterns: Academic Excellence

### Landing Page (Hero + Mission)
- **Component**: `Hero` with `framer-motion` fade-in effects.
- **Visuals**: Large high-resolution campus imagery.
- **Guidelines**: Use `text-wrap: balance` for the Mission statement.

### Notice Board (Pinned Cards)
- **Component**: `NoticeCard` with category-based icons.
- **Layout**: Grid (1 col mobile, 2 col tablet, 3 col desktop).
- **Interaction**: Hover lift effect with academic gold border.

### Course Catalog (Accordion/Tabs)
- **Component**: `CourseAccordion` grouped by department.
- **Pattern**: Disclosure pattern for mobile-first accessibility.

### Faculty Directory (Profile Grid)
- **Component**: `FacultyCard` with image aspect-ratio control (prevents CLS).
- **Metadata**: Clear hierarchy of Name > Designation > Department.

## 3. Knowledge Integration

Based on `web-design-guidelines`:
- **Performance**: Faculty images will use `next/image` with `sizes` for optimization.
- **Accessibility**: Faculty cards will have semantic `article` tags.
- **Typography**: All academic titles will use `tabular-nums` for dates/durations.

## 4. Validation Architecture

- **Static Analysis**: Ensure all data files match the TypeScript interfaces.
- **Visual Audit**: Check contrast ratio of Navy/Gold on all content cards.
- **Navigation**: Verify deep-linking works for individual Course detail pages.

---

*Phase: 02-informational-hub*
*Research by: the agent*
