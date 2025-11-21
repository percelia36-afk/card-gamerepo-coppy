## How It Works

### Authentication

User authentication is handled by Clerk. Only authenticated users can create, edit, or delete posts and comments. User data is linked to posts and comments via Clerk user IDs.

### Posts

- Authenticated users can create new posts, which are stored in the PostgreSQL database with a reference to the user's ID.
- Posts can be viewed in a list or as individual detail pages.
- Each post displays its title, content, author (gamer tag), and creation time.

### Comments

- Each post can have multiple comments.
- Comments are linked to both the post and the user who created them.
- Users can add and delete their own comments. Comments auto-refresh after changes.

### Deleting Posts

- Only the user who created a post can delete it.
- When a post is deleted, all comments associated with that post are also deleted automatically (handled in the API route).
- After deletion, the UI redirects to the posts list and updates automatically.

### Database

- Uses Supabase/PostgreSQL for data storage.
- Foreign key constraints ensure comments are always linked to valid posts and users.

### UI & Styling

- Uses Tailwind CSS for styling.
- Semantic HTML elements (like `<article>`) are used for accessibility and SEO.

### Environment Variables

- Sensitive configuration (database connection, Clerk keys) is managed via environment variables in the `.env` file.
  This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Features & Documentation

This project includes the following features, with relevant documentation links:

- **Next.js App Router** ([docs](https://nextjs.org/docs/app))
- **Clerk Authentication** ([docs](https://clerk.com/docs/nextjs))
- **Supabase/PostgreSQL Database** ([docs](https://supabase.com/docs/guides/database))
- **Environment Variables** ([docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables))
- **Tailwind CSS** ([docs](https://tailwindcss.com/docs/installation))
- **ESLint** ([docs](https://nextjs.org/docs/app/building-your-application/configuring/eslint))
- **Post Creation, Editing, and Deletion** ([Next.js API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes))
- **Comment System** ([example guide](https://blog.logrocket.com/creating-commenting-system-next-js/))
- **Foreign Key Constraints in PostgreSQL** ([docs](https://www.postgresql.org/docs/current/tutorial-fk.html))
- **Semantic HTML** ([MDN: article](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article))

For more details on each feature, see the linked documentation.
