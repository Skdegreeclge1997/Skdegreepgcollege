# 🏫 S.K. Degree & P.G. College Official Portal

A modern, high-performance web portal for **S.K. Degree & P.G. College**, Vizianagaram. Built with Next.js, Tailwind CSS, and Supabase to provide a seamless experience for students, faculty, and administration.

![Production Preview](https://skdegreecollege.edu.in/opengraph-image.png)

## 🚀 Live Demo
**Production URL:** [https://skdegreecollege.edu.in](https://skdegreecollege.edu.in)

---

## 🛠️ Tech Stack

*   **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Three.js](https://threejs.org/)
*   **Database & Auth:** [Supabase](https://supabase.com/)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
*   **Deployment:** [Vercel](https://vercel.com/)

---

## ✨ Key Features

- **Dynamic Notice Board:** Real-time updates for students and staff.
- **Online Admissions:** Integrated inquiry and application tracking system.
- **Campus Gallery:** Interactive photo and video gallery.
- **Admin Dashboard:** Secure panel for managing notices, admissions, and faculty.
- **Responsive Design:** Optimized for mobile, tablet, and desktop viewing.
- **SEO Optimized:** High Lighthouse scores and structured metadata for search engines.

---

## 📦 Installation & Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/sk-degree-college.git
    cd sk-degree-college
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env.local` file in the root directory and add your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```text
├── app/              # Next.js App Router routes & pages
├── components/       # Reusable React components
├── lib/              # Utilities, types, and database configurations
├── public/           # Static assets (images, icons)
├── supabase/         # Supabase migrations and schema (optional)
└── .planning/        # Project roadmap and deployment plans
```

---

## 🔐 Deployment Guide

This project is optimized for deployment on **Vercel**.

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the environment variables in the Vercel Dashboard.
4.  Connect your custom domain (`skdegreecollege.edu.in`).

---

## 📄 License
This project is proprietary. All rights reserved by S.K. Degree & P.G. College.

---

## 👨‍💻 Developed By
*Arunodaya Educational Society - IT Team*
