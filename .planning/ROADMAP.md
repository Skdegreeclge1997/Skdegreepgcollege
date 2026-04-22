# Roadmap: SK Degree College Website

## Overview

The journey starts with establishing a robust, responsive foundation and a common navigational shell. From there, we move into populating the site with static informational content managed via a headless CMS. The third phase brings the site to life with dynamic elements like the notice board and gallery. Finally, we implement the interactive features for admissions and the student portal, concluding with a comprehensive audit and public launch.

## Phases

- [x] **Phase 1: Foundation & Shell** - Setup the Next.js/Tailwind environment and build the responsive site structure. (completed 2026-04-17)
- [ ] **Phase 2: Informational Hub** - Model and implement core content areas (About, Courses, Faculty) using the CMS.
- [ ] **Phase 3: Dynamic Updates** - Implement the notice board and photo gallery for real-time campus updates.
- [x] **Phase 4: Admissions & Portal** - Develop the online inquiry system and secure student portal dashboards.
- [x] **Phase 5: Launch & Refinement** - Final accessibility audit, performance optimization, and deployment.
- [x] **Phase 6: Admin Module** - Supabase integration, secure admin dashboard, and cloud deployment.

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
- [x] 01-01: Setup Next.js, Tailwind CSS, and monorepo structure.
- [x] 01-02: Build responsive Header, Footer, and Navigation components.

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
| 1. Foundation & Shell | 2/2 | Complete   | 2026-04-17 |
| 2. Informational Hub | 3/3 | Complete | 2026-04-18 |
| 3. Dynamic Updates | 2/2 | Complete | 2026-04-18 |
| 4. Admissions & Portal | 3/3 | Complete | 2026-04-19 |
| 5. Launch & Refinement | 1/1 | Complete | 2026-04-20 |
| 6. Admin Module | 5/5 | Complete | 2026-04-21 |
| 7. Final Project Deployment | 2/15 | In Progress | - |

### Phase 7: Final Project Deployment

**Goal:** Execute the final handoff and production deployment following the `FINAL_DEPLOYMENT_PLAN.md`.
**Requirements**: DEPLOY-01
**Depends on:** Phase 6
**Plans:** 15 plans

Plans:
- [x] 07-07: Perform final code cleanup (logs, test data).
- [x] 07-08: Update .gitignore and production metadata.
- [x] 07-12: Finalize README.md and documentation.
- [ ] 07-01: Create new GitHub account/repo and push code.
- [ ] 07-02: Set up new Supabase project and migrate schema.
- [ ] 07-03: Create Vercel account and import project.
- [ ] 07-04: Purchase and connect custom domain.
- [ ] 07-05: Integrate Google Analytics and Search Console.
- [ ] 07-06: Set up Sentry for error tracking.
- [ ] 07-09: Configure environment variables in Vercel.
- [ ] 07-10: Run Lighthouse audit and fix issues.
- [ ] 07-11: Final end-to-end testing on production URL.
- [ ] 07-13: Transfer ownership/access to the client.
- [ ] 07-14: Send handoff document with credentials.
- [ ] 07-15: Perform final demo walkthrough.
