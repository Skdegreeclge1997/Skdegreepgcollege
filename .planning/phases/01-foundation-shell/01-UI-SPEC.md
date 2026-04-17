---
phase: 1
slug: foundation-shell
status: draft
shadcn_initialized: false
preset: none
created: 2026-04-17
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for the SK Degree College website foundation and shell.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none — Vanilla Tailwind CSS |
| Preset | academic-premium |
| Component library | none (custom accessible components) |
| Icon library | Lucide React |
| Font | Inter (Sans-serif) |

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing |
| md | 16px | Default element spacing |
| lg | 24px | Section padding |
| xl | 32px | Layout gaps |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level spacing |

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 16px | 400 | 1.6 |
| Label | 14px | 500 | 1.4 |
| Heading | 32px | 700 | 1.2 |
| Display | 48px | 800 | 1.1 |

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | #F8FAFC (slate-50) | Background, major surfaces |
| Secondary (30%) | #003366 (navy-800) | Header, Footer, Hero overlay |
| Accent (10%) | #D4AF37 (gold) | Primary buttons, active nav state, icons |
| Destructive | #EF4444 (red-500) | Error messages, destructive actions |

Accent reserved for: Primary CTAs (Apply Now), active navigation links, and subtle icon highlights.

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Apply Now |
| Empty state heading | No items found |
| Empty state body | We couldn't find any results for your search. Try a different keyword. |
| Error state | Something went wrong. Please refresh the page or contact support. |
| Destructive confirmation | Logout: Are you sure you want to sign out? |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| lucide-react | all | not required |

---

## Visual Reference (Mockup)

![College Website Mockup](file:///C:/Users/janak/.gemini/antigravity/brain/f45b430f-d095-4239-a4cc-cf9459dde037/college_website_mockup_1776400081475.png)

---

## Interaction & Aesthetics
- **Glassmorphism**: Use `backdrop-blur-md` on the sticky navigation bar for a premium feel.
- **Animations**: Use subtle `hover:scale-105` transitions on cards and `duration-300` on menu opens.
- **Micro-interactions**: Subtle underline expansion on link hover.

## Checker Sign-Off

- [ ] Dimension 1 Copywriting: PASS
- [ ] Dimension 2 Visuals: PASS
- [ ] Dimension 3 Color: PASS
- [ ] Dimension 4 Typography: PASS
- [ ] Dimension 5 Spacing: PASS
- [ ] Dimension 6 Registry Safety: PASS

**Approval:** pending 2026-04-17
