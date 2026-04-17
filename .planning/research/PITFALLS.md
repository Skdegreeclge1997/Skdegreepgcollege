# Pitfalls Research: College Website

## 1. Poor Mobile Experience
- **Warning signs**: Text is too small, buttons are hard to tap, horizontal scrolling appears on mobile devices.
- **Prevention strategy**: Adopt a strict mobile-first design approach using Tailwind. Test all key workflows (like reading notices or submitting inquiries) on mobile devices early.
- **Address in phase**: Phase 1 & 2 (Frontend setup and UI implementation).

## 2. Bloated & Outdated Content
- **Warning signs**: Finding "Fall 2021" notices on the home page in 2026; users complain they can't find the course catalog.
- **Prevention strategy**: Implement a Headless CMS with strict content validation and expiration dates for notices. Create a clear, audience-segmented navigation structure.
- **Address in phase**: Phase 2 & 3 (CMS Modeling & Dynamic Components).

## 3. Inaccessible Design (Ignoring WCAG)
- **Warning signs**: Low contrast text, missing alt tags on gallery images, forms that cannot be navigated via keyboard.
- **Prevention strategy**: Use automated tools like `eslint-plugin-jsx-a11y` and Lighthouse to catch issues during development. Enforce alt-text in the CMS schema.
- **Address in phase**: All phases, but explicitly audit in Phase 5.

## 4. Feature Creep (Trying to build an LMS)
- **Warning signs**: The roadmap starts including "assignment submission" or "grading rubrics" features.
- **Prevention strategy**: Strictly adhere to the "Anti-features" defined in `FEATURES.md`. Rely on linking out to specialized 3rd party tools for complex academic workflows.
- **Address in phase**: Roadmap creation & Phase 4 (Student Portal).
