# Phase 02: Informational Hub - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase transforms the static shell into a content-rich informational portal. It focuses on the landing page content (Mission, Vision, History) and the core academic directories (Courses, Faculty, Notices).

</domain>

<decisions>
## Implementation Decisions

### Design & Layout
- **Aesthetic**: Premium Academic. Use large high-quality imagery (via `generate_image`) for hero sections and faculty profiles.
- **Notices**: Use a "Pinned Cards" layout for the notice board rather than a simple marquee, ensuring readability and importance.
- **Course Catalog**: Group programs by Department (e.g., Science, Commerce, Arts) using an accordion or tabbed interface for density.
- **Faculty Directory**: Card-based grid with "Quick Contact" actions (Email/Phone icons).

### Content Strategy
- **Landing Page**: Must feature a clear "Mission & Vision" section with gold accents and a "History" timeline.
- **Data Handling**: For this phase, use structured local JSON data (in `lib/data/`) to simulate a CMS, allowing for easy migration to a Headless CMS later.

### Technical Patterns
- **Server Components**: Use for all static content pages (About, Courses, Faculty) for maximum SEO and performance.
- **Accessibility**: All icons MUST have `aria-hidden="true"`. All headings must use `text-wrap: balance`.

### the agent's Discretion
- Choice of specific icons from `lucide-react` for different course categories.
- Animation timing for page transitions (keep it subtle, ~300ms).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Core
- `.planning/PROJECT.md` — Overall goals and requirements.
- `.planning/REQUIREMENTS.md` — Technical criteria for "done".

### Knowledge & Guidelines
- `C:\Users\janak\.gemini\antigravity\knowledge\skill-nextjs-best-practices\artifacts\skill.md` — Next.js patterns.
- `C:\Users\janak\.gemini\antigravity\knowledge\skill-tailwind-advanced\artifacts\skill.md` — Tailwind patterns.
- `C:\Users\janak\.gemini\antigravity\knowledge\skill-web-design-guidelines\artifacts\skill.md` — Vercel Web Guidelines.

</canonical_refs>

<specifics>
## Specific Ideas

- Hero section for the landing page should have a "Glassmorphism" overlay for the Mission statement.
- Faculty profiles should have a "Gold Border" on hover to match the brand.

</specifics>

<deferred>
## Deferred Ideas

- Search/Filter for Faculty (will be added in a later optimization phase).
- Online Admission Form (Phase 4).

</deferred>

---

*Phase: 02-informational-hub*
*Context gathered: 2026-04-17 via Knowledge-Driven Auto-Discuss*
