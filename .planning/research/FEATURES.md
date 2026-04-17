# Features Research: College Website

## Table Stakes (Must-Haves)

Without these, users will abandon the site or overload the administration with phone calls.

1. **Intuitive Navigation & Search**
   - *Complexity*: Medium
   - *Dependencies*: Headless CMS, clear information architecture.
2. **Mobile-First Responsive Design**
   - *Complexity*: Low (if built with Tailwind)
   - *Dependencies*: Frontend framework.
3. **Academic Programs & Course Catalog**
   - *Complexity*: Medium
   - *Dependencies*: CMS content modeling.
4. **Dynamic Notice Board / News Feed**
   - *Complexity*: Low-Medium
   - *Dependencies*: CMS integration.
5. **Admissions & Financial Aid Information**
   - *Complexity*: Low (content pages) to Medium (inquiry forms).
   - *Dependencies*: Secure form handling (Supabase/API).
6. **Accessibility (WCAG 2.2 Compliance)**
   - *Complexity*: Medium (requires ongoing auditing).
   - *Dependencies*: Accessible component library.

## Differentiators (Competitive Advantage)

1. **Personalized Student Portal**
   - *Complexity*: High
   - *Dependencies*: Authentication (Supabase), user roles.
2. **Interactive Campus Map**
   - *Complexity*: Medium
   - *Dependencies*: Mapbox or Google Maps API integration.
3. **AI-Powered Assistant / Chatbot**
   - *Complexity*: High
   - *Dependencies*: LLM integration, knowledge base of college FAQs.

## Anti-Features (Do NOT Build)

1. **A full Custom Learning Management System (LMS)**
   - *Why*: Building a custom LMS is a massive undertaking. Use existing platforms (Moodle, Canvas, Google Classroom) and link out to them from the portal.
2. **Massive Video Backgrounds on Mobile**
   - *Why*: Kills performance and data caps for students on mobile networks.
