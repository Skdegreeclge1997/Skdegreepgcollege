# Phase 04: Admissions & Portal - Context

## Decisions
- **Admissions Strategy**: Implement a dedicated `/admissions` page with a two-step inquiry form: 
  1. Quick Callback Request (Phone/Name)
  2. Detailed Inquiry (Academic background, Group interest).
- **Authentication**: Use **Supabase Auth** for the student portal. It provides secure, managed authentication with minimal setup.
- **Portal Scope**: Focus on a "Student Command Center" containing:
  - **Digital ID Card**: A premium, CSS-styled ID card with student details.
  - **Resource Hub**: Downloadable PDF links for Syllabus and Academic Calendar.
  - **Application Tracker**: View status of their admission inquiry.
- **Form Handling**: Integrate with Supabase Database for storage and a trigger-based or simple API notification system to alert college staff.
- **UI Design**: The portal will use a "Dashboard" layout with a sidebar and clean, card-based metrics.

## Specifics
- **Inquiry Fields**: Name, Mobile, Email, Gender, Intermediate Group, Course Interest, Address.
- **Portal Branding**: Personalized "Welcome, [Name]" header with student profile image placeholder.

## Deferred Ideas
- **Fee Payment Integration**: Deferred to a future phase to ensure security compliance.
- **Attendance Tracking**: Requires a staff-side management system, deferred.

## Folded Todos
- (None)
