---
wave: 1
depends_on: []
requirements: [CORE-01]
files_modified: [package.json, tailwind.config.ts, app/globals.css, app/layout.tsx]
autonomous: true
---

# Plan 01-01: Environment Setup & Global Styles

Setup the Next.js 14 environment with Tailwind CSS and define the global design system tokens (colors, typography).

## Tasks

<task id="01-01-01">
<read_first>
- .planning/phases/01-foundation-shell/01-CONTEXT.md
- .planning/phases/01-foundation-shell/01-UI-SPEC.md
</read_first>
<action>
Initialize a new Next.js project in the current directory using `npx create-next-app@latest ./` with the following options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: No
- App Router: Yes
- import alias: Yes (@/*)

Then, update `tailwind.config.ts` to include the academic color palette from UI-SPEC:
- Primary (Navy): #003366
- Accent (Gold): #D4AF37
- Secondary (Slate): #F8FAFC
</action>
<acceptance_criteria>
- package.json exists and contains "next", "react", "tailwindcss".
- tailwind.config.ts contains custom colors 'academic-navy' (#003366) and 'academic-gold' (#D4AF37).
- `npm run dev` starts without errors.
</acceptance_criteria>
</task>

<task id="01-01-02">
<read_first>
- app/globals.css
- .planning/phases/01-foundation-shell/01-UI-SPEC.md
</read_first>
<action>
Update `app/globals.css` to remove default Next.js boilerplate and implement the global design system:
- Set default background to `bg-slate-50`.
- Set default text color to `text-slate-900`.
- Define base styles for headings (H1-H3) using Inter font.
- Add a custom utility for glassmorphism: `.glass { backdrop-filter: blur(12px); background: rgba(255, 255, 255, 0.7); }`.
</action>
<acceptance_criteria>
- app/globals.css contains `.glass` class with `backdrop-filter`.
- Body style includes `background-color` mapped to slate-50.
</acceptance_criteria>
</task>

## Verification

### Automated
- `npm run build` exits with code 0.
- `grep "academic-navy" tailwind.config.ts` returns a match.

### Manual
- Verify the base background is a light off-white (slate-50).
