This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<br/>

## Project Structure:

- `/app/` - The Next.js app that have respective pages in respective folder(NextJs has folder based routing, pathname in url will be the folder name and accordingly the page will be rendered)
- `/app/api/` - The Next.js API routes/backend
- `/public/` - The Next.js public directory
- `/styles/` - The Next.js styles directory
- `/components/` - The reusable UI components with some logic
- `/utils/` - Just some utility functions like connectToDB to call to connect to the MongoDB database
- '/models/` - Schema models for database

## Environment Variables:

- Create .env in the root with following variables:

```
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
NEXTAUTH_URL=
NEXTAUTH_URL_INTERNAL=
NEXTAUTH_SECRET=
```

## Packages used:

- `next` - The Next.js framework
- `next-auth` - The Next.js authentication library
- `mongodb` - The MongoDB driver
- `mongoose` - The MongoDB ODM
- `react` - The React.js framework
- `react-dom` - The React.js DOM renderer
- `tailwindcss` - For styling
