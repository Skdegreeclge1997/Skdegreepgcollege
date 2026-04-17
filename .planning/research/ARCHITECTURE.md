# Architecture Research: College Website

## Component Boundaries

1. **Frontend Presentation Layer (Next.js)**
   - Responsible for rendering the UI, routing, and handling user interactions.
   - Fetches data from the Headless CMS and Backend API.
2. **Content Management Layer (Headless CMS - Sanity/Strapi)**
   - Responsible for storing structured content: Notices, Course details, Faculty profiles, Gallery images.
   - Accessed by the frontend via GraphQL or REST API at build time (SSG) or runtime.
3. **Backend API & Identity Layer (Supabase)**
   - Handles student/faculty authentication.
   - Stores dynamic user data (e.g., admission inquiries, personalized dashboard settings).
4. **External Integrations**
   - Links or SSO integration with external LMS (Moodle/Canvas) or SIS (Student Information System).

## Data Flow

1. **Public Browsing**: User visits home page -> Next.js serves static HTML (generated at build time from CMS data) -> Fast load time.
2. **Notice Update**: Admin updates notice in CMS -> Webhook triggers Next.js to rebuild/revalidate the specific page -> Updated content is live.
3. **Student Login**: Student enters credentials -> Supabase authenticates -> Next.js fetches user-specific portal data -> Renders dashboard.

## Suggested Build Order

1. **Phase 1**: Setup monorepo/infrastructure and frontend shell (Next.js + Tailwind).
2. **Phase 2**: Implement Headless CMS and build public informational pages (Home, About, Courses, Faculty).
3. **Phase 3**: Implement dynamic components (Notice Board, Photo Gallery).
4. **Phase 4**: Build the Student Portal (Authentication, Role-based routing, Dashboard).
5. **Phase 5**: Polish, Accessibility Audit, and Deployment.
