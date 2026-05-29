# I'm Harshit Singh - Portfolio

MakOS-style personal portfolio inspired by `makos.framer.website`, rebuilt for Harshit Singh with custom photos, floating cards, and a bottom dock UI.

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

## Main Files

```text
app/
  layout.tsx
  page.tsx
  globals.css
public/
  brand-imhs.png
  avatar-yes.png
  avatar-cutout.png
  portrait-pp.png
  portrait-magic.jpeg
  CNAME
```

## Update Main Images

These image paths are used by the current layout in [`app/page.tsx`](/Users/harshitgautam/Documents/Codex/2026-05-29/files-mentioned-by-the-user-imharshitsingh/imharshitsingh.in/app/page.tsx):

- `"/portrait-pp.png"`: fullscreen backdrop
- `"/brand-imhs.png"`: top-left brand tile
- `"/avatar-yes.png"`: profile/book tile
- `"/avatar-cutout.png"`: ReachOutBotAI tile
- `"/portrait-magic.jpeg"`: Chronicles tile

Replace any of these files in `public/` with the same filename to update visuals.

## Update Links

All social/app/blog links are hardcoded in:

- `dockLinks` array in [`app/page.tsx`](/Users/harshitgautam/Documents/Codex/2026-05-29/files-mentioned-by-the-user-imharshitsingh/imharshitsingh.in/app/page.tsx)
- `floatingItems` array in [`app/page.tsx`](/Users/harshitgautam/Documents/Codex/2026-05-29/files-mentioned-by-the-user-imharshitsingh/imharshitsingh.in/app/page.tsx)

Update `href` values there.

## Deploy to GitHub Pages (current setup)

This repo is configured to export static files and publish from `main /docs`.

In GitHub repository settings:

1. Go to `Settings -> Pages`
2. Set `Source` to `Deploy from a branch`
3. Set branch to `main` and folder to `/docs`
4. Ensure custom domain is `imharshitsingh.in`

## Build Static Docs (for Pages)

```bash
npm run build:pages
```

Then commit and push the updated `docs/` folder.

## Deploy to Vercel (optional)

You can still deploy this Next.js app to Vercel directly with default settings.
