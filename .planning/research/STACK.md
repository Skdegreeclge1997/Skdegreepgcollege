# Tech Stack Research: College Website

## Recommended Stack (2025 Standard)

We recommend a modern **Jamstack / Decoupled Architecture** which provides high performance, scalability, and easier governance.

### 1. Frontend Framework
- **Next.js (React) v14+**
  - *Rationale*: Excellent for SEO (Server-Side Rendering & Static Site Generation), highly performant, and pairs perfectly with headless CMS solutions.
  - *Confidence*: High

### 2. Styling
- **Tailwind CSS v3.4+** 
  - *Rationale*: Speeds up UI development, ensures design consistency, and makes responsive design (crucial for mobile-heavy student traffic) easier.
  - *Confidence*: High

### 3. Content Management (Headless CMS)
- **Sanity.io or Strapi v4+**
  - *Rationale*: A headless CMS decouples the content from the frontend. This is critical for colleges, allowing non-technical staff to update notices, galleries, and courses without touching code.
  - *Confidence*: High

### 4. Database & Auth (For Portal Features)
- **Supabase (PostgreSQL)**
  - *Rationale*: Provides built-in authentication for the student portal, along with a scalable PostgreSQL database for storing user-specific data (admissions inquiries, portal settings).
  - *Confidence*: Medium-High (depends on existing SIS/LMS integration needs)

## What NOT to use and why
- **Traditional monolithic WordPress or Drupal (unless heavily governed)**: While popular, they often become bloated, insecure, and hard to maintain as plugins accumulate. For a clean, fast, custom portal experience, decoupled is better.
- **jQuery or Vanilla JS exclusively**: The UI complexity of a student portal and dynamic notice board requires a robust state-management solution like React.
