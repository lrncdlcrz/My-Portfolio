# Laurence Dela Cruz Portfolio

Personal portfolio for Laurence Andrei C. Dela Cruz, an aspiring Full Stack Developer
and BSIT student at the University of Batangas. Built with Next.js 15, TypeScript,
Tailwind CSS, and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form uses [EmailJS](https://www.emailjs.com) so it can send email without a
backend. Copy `.env.example` to `.env.local` and fill in your own service:

```bash
cp .env.example .env.local
```

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Without these set, the contact form will show a clear error instead of silently failing.

## Scripts

| Command         | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start the dev server                 |
| `npm run build`  | Production build                     |
| `npm run start`  | Serve the production build           |
| `npm run lint`   | Run ESLint                           |
| `npm run format` | Format the codebase with Prettier    |

## Project structure

```
app/            Routes (App Router): /, /about, /projects, /certificates, /resume, /contact
components/     UI, organized by feature (navbar, hero, about, skills, projects, ...)
lib/            Shared utilities (cn helper, etc.)
hooks/          Custom React hooks (scroll spy, mouse position, reduced motion, ...)
types/          Shared TypeScript types
data/           Real content: projects, certificates, skills, experience, stats
styles/         Global Tailwind stylesheet and design tokens
constants/      Site metadata, navigation, social links
animations/     Framer Motion variants shared across components
public/         Static assets: images, certificate badges, project screenshots, resume.pdf
```

## Deployment

This project is ready to deploy on [Vercel](https://vercel.com): connect the repo, set
the `NEXT_PUBLIC_EMAILJS_*` environment variables in the Vercel dashboard, and deploy.
No other backend or database is required.

## Credits

Designed & developed by Laurence Andrei C. Dela Cruz.
