# Roadmap: SK Degree College Website

## Overview

The journey starts with establishing a robust, responsive foundation and a common navigational shell. From there, we move into populating the site with static informational content managed via a headless CMS. The third phase brings the site to life with dynamic elements like the notice board and gallery. Finally, we implement the interactive features for admissions and the student portal, concluding with a comprehensive audit and public launch.

## Phases

- [ ] **Phase 1: Foundation & Shell** - Setup the Next.js/Tailwind environment and build the responsive site structure.
- [ ] **Phase 2: Informational Hub** - Model and implement core content areas (About, Courses, Faculty) using the CMS.
- [ ] **Phase 3: Dynamic Updates** - Implement the notice board and photo gallery for real-time campus updates.
- [ ] **Phase 4: Admissions & Portal** - Develop the online inquiry system and secure student portal dashboards.
- [ ] **Phase 5: Launch & Refinement** - Final accessibility audit, performance optimization, and deployment.

## Phase Details

### Phase 1: Foundation & Shell
**Goal**: Establish the technical infrastructure and core navigational shell.
**Depends on**: Nothing (first phase)
**Requirements**: CORE-01, CORE-02, CORE-03
**Success Criteria**:
  1. Website is responsive on mobile and desktop devices.
  2. Main navigation links are functional and lead to valid placeholder pages.
  3. Global search bar is present in the header.
**Plans**: 2 plans

Plans:
- [ ] 01-01: Setup Next.js, Tailwind CSS, and monorepo structure.
- [ ] 01-02: Build responsive Header, Footer, and Navigation components.

### Phase 2: Informational Hub
**Goal**: Populate the site with core college information via a headless CMS.
**Depends on**: Phase 1
**Requirements**: INFO-01, INFO-02, INFO-03, INFO-04
**Success Criteria**:
  1. Users can read the college history and mission.
  2. Complete course list and individual course detail pages are accessible.
  3. Faculty directory displays profile cards for staff members.
**Plans**: 3 plans

Plans:
- [ ] 02-01: CMS Setup and Content Modeling for Courses and Faculty.
- [ ] 02-02: Implement Academics and Course Detail pages.
- [ ] 02-03: Implement About and Faculty Directory pages.

### Phase 3: Dynamic Updates
**Goal**: Bring the site alive with dynamic notice boards and media galleries.
**Depends on**: Phase 2
**Requirements**: INFO-05, NEWS-01, NEWS-02, NEWS-03, NEWS-04
**Success Criteria**:
  1. Notice board displays latest announcements with filtering/categories.
  2. Admin can publish a new notice in the CMS and see it reflected on the site.
  3. Photo gallery displays campus images in a responsive grid.
**Plans**: 2 plans

Plans:
- [ ] 03-01: Implement Dynamic Notice Board with CMS integration.
- [ ] 03-02: Implement Campus Photo Gallery component.

### Phase 4: Admissions & Portal
**Goal**: Implement student interaction and administrative inquiry tools.
**Depends on**: Phase 3
**Requirements**: ADMN-01, ADMN-02, ADMN-03, PORT-01, PORT-02, PORT-03, PORT-04
**Success Criteria**:
  1. Prospective students can submit inquiry forms and receive confirmation.
  2. Students can log in to a secure dashboard area.
  3. Password reset functionality is verified.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Implement Admissions Information pages and Inquiry Form.
- [ ] 04-02: Setup Supabase Auth and secure portal routing.
- [ ] 04-03: Build the Student Dashboard and Profile pages.

### Phase 5: Launch & Refinement
**Goal**: Finalize the project for public access.
**Depends on**: Phase 4
**Requirements**: (Final Verification)
**Success Criteria**:
  1. Website passes accessibility (WCAG 2.2) and performance (Lighthouse) audits.
  2. Site is deployed to a production URL (e.g., Vercel/Netlify).
**Plans**: 1 plan

Plans:
- [ ] 05-01: Final audits, SEO optimization, and deployment.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Shell | 0/2 | Not started | - |
| 2. Informational Hub | 0/3 | Not started | - |
| 3. Dynamic Updates | 0/2 | Not started | - |
| 4. Admissions & Portal | 0/3 | Not started | - |
| 5. Launch & Refinement | 0/1 | Not started | - |
