# I'm Harshit Singh - Personal Portfolio

A single-page, macOS-inspired portfolio for Harshit Singh built with Next.js 14, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React + react-icons
- Google Fonts: Instrument Serif + DM Sans

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Project Structure

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  GlassCard.tsx
  Hero.tsx
  SocialLinks.tsx
  AIApps.tsx
  Blogs.tsx
  About.tsx
  Contact.tsx
  BookCard.tsx
  BackgroundOrbs.tsx
  DesktopBar.tsx
  CustomCursor.tsx
public/
  avatar.jpg
```

## Update Avatar

1. Replace `public/avatar.jpg` with your own image.
2. Keep the filename as `avatar.jpg`.
3. Recommended: square image, at least `400x400`.

## Update Blog Posts

Blog items are hardcoded in:

- `components/Blogs.tsx`

Edit the `posts` array to change title/date list.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. Deploy (zero additional configuration needed).

A minimal `vercel.json` is included.
