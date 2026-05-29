# imharshitsingh.in

MakOS-inspired personal portfolio + blog with a lightweight backend for blog publishing.

## Stack

- Static HTML/CSS/JS frontend
- Vercel Serverless Functions under `api/`
- Blog data store in `data/blogs.json`
- Optional GitHub API writeback for production publishing

## Pages

- `index.html` - home workspace
- `about.html` - profile
- `projects.html` - work showcase
- `writing.html` - blog list
- `post.html` - blog detail
- `book.html` - book landing
- `contact.html` - contact
- `admin.html` - blog admin panel

## Backend Endpoints

- `GET /api/blogs` - list published blogs
- `GET /api/blogs?slug=...` - get one blog
- `POST /api/admin/login` - admin auth
- `GET /api/admin/session` - verify session
- `POST /api/admin/publish` - publish new blog
- `POST /api/admin/logout` - clear session

## Environment Variables (Vercel)

Set these in Vercel Project Settings -> Environment Variables:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`
- `BLOG_DATA_PATH` (optional, default: `data/blogs.json`)

## Auto redeploy flow

When `GITHUB_TOKEN` is configured:

1. Admin publishes from `admin.html`
2. API updates `data/blogs.json` in GitHub via commit
3. GitHub push triggers Vercel redeploy automatically

Without GitHub token, API falls back to local file write (useful for local/dev only).
