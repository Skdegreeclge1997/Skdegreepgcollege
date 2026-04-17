---
wave: 2
depends_on: [01-PLAN.md]
requirements: [CORE-02, CORE-03]
files_modified: [app/layout.tsx, components/Header.tsx, components/Footer.tsx, components/Navbar.tsx]
autonomous: true
---

# Plan 01-02: Responsive Shell & Navigation

Build the main navigational shell including a responsive header with a mobile hamburger menu, a global search bar placeholder, and a professional footer.

## Tasks

<task id="01-02-01">
<read_first>
- app/layout.tsx
- .planning/phases/01-foundation-shell/01-UI-SPEC.md
- .planning/phases/01-foundation-shell/01-RESEARCH.md
</read_first>
<action>
Create `components/Header.tsx` and `components/Navbar.tsx`.
Header must include:
- College Logo (placeholder text "SK Degree College").
- Navbar component.
- Global Search Bar (UI placeholder with a magnifying glass icon).

Navbar must:
- Use the **Disclosure Pattern** for mobile navigation.
- Desktop: Horizontal list of links (Home, About, Academics, Admissions, Notice Board, Contact).
- Mobile: Hamburger button that toggles a full-screen or slide-out menu.
- Use `lucide-react` for Menu, X, and Search icons.
- Apply `.glass` class to the header for a premium feel.
- Primary navigation links should use the `academic-navy` color on hover.
</action>
<acceptance_criteria>
- components/Header.tsx exists.
- components/Navbar.tsx exists and uses `aria-expanded` and `aria-controls`.
- Header uses the `.glass` utility class.
</acceptance_criteria>
</task>

<task id="01-02-02">
<read_first>
- .planning/phases/01-foundation-shell/01-UI-SPEC.md
</read_first>
<action>
Create `components/Footer.tsx`.
Footer must include:
- Quick Links (Home, About, Admissions).
- Contact Info (Address, Phone, Email placeholder).
- Social Media Icons placeholders.
- Copyright notice.
- Styling: Deep `bg-academic-navy` with `text-slate-50`.
</action>
<acceptance_criteria>
- components/Footer.tsx exists.
- Footer has a dark background (#003366) and light text.
</acceptance_criteria>
</task>

<task id="01-02-03">
<read_first>
- app/layout.tsx
- components/Header.tsx
- components/Footer.tsx
</read_first>
<action>
Update `app/layout.tsx` to wrap `{children}` with the `<Header />` and `<Footer />` components.
Ensure the layout is a Flexbox column where the main content area (`children`) expands to fill the space between header and footer (`min-h-screen flex flex-col`).
</action>
<acceptance_criteria>
- app/layout.tsx imports and uses Header and Footer.
- Main tag has `flex-grow` or equivalent to push footer to bottom.
</acceptance_criteria>
</task>

## Verification

### Automated
- `npm run build` exits with code 0.
- `grep "<Header" app/layout.tsx` returns a match.

### Manual
- Verify the header is sticky and has a blur effect when scrolling.
- Verify the mobile menu opens and closes correctly on a small screen breakpoint (< 768px).
