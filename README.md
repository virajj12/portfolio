# Viraj Jain | Developer Portfolio

Welcome to the source code for my personal developer portfolio! This project is a modern, highly interactive, and SEO-optimized portfolio website built to showcase my skills, projects, and professional experience. 

🌐 **Live Demo:** [virajjain.vercel.app](https://virajjain.vercel.app)

---

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js (App Router), React, and TypeScript.
- **Immersive Animations**: Advanced scroll-based and element-level animations powered by **Framer Motion** and **GSAP**.
- **Smooth Scrolling**: Implemented using **Lenis** for a premium, buttery-smooth scrolling experience.
- **Custom Cursor**: Interactive cursor follower component that adapts to hovered elements.
- **Dark Mode First**: Beautiful, eye-catching dark theme with dynamic background glow effects.
- **Dynamic SEO**: Fully configured for Google Search indexing with automated `sitemap.xml`, `robots.txt`, and rich OpenGraph/Twitter cards.
- **Working Contact Form**: Integrated with **Nodemailer**, Zod, and React Hook Form to send emails directly from the site.
- **Easy Customization**: All personal data is centralized in `src/data/portfolio.ts` for quick updates.

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) / Base UI
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) + [Nodemailer](https://nodemailer.com/)

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router pages, layout, and API routes (Contact form)
├── components/           # Reusable UI components
│   ├── sections/         # Main page sections (Hero, About, Skills, Projects, Experience, Contact)
│   ├── ui/               # Base UI components (Buttons, Inputs, etc.)
│   ├── cursor-follower.tsx
│   ├── custom-lenis.tsx
│   ├── footer.tsx
│   └── navbar.tsx
├── data/                 # Centralized content and user data
│   └── portfolio.ts      # Edit this file to update portfolio details!
```

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js and a package manager installed (pnpm is recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/virajj12/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following for the contact form to work:
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. Run the development server:
   ```bash
   pnpm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## ✍️ Customizing for Yourself

If you want to use this template for your own portfolio:
1. Navigate to `src/data/portfolio.ts`.
2. Update the `PORTFOLIO_DATA` object with your personal information, skills, and projects.
3. Replace the `public/viraj.png` with your own image and update the OpenGraph metadata in `src/app/layout.tsx`.
4. Update the URL in `src/app/layout.tsx`, `src/app/sitemap.ts`, and `src/app/robots.ts` to your own domain.

## 🙌 Acknowledgements

Special thanks to [Naresh-Khatri](https://github.com/Naresh-Khatri/3d-portfolio) for the base structural inspiration and the custom cursor follower component code that helped bring this project to life.
