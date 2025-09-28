<div align="center">

  <img src="./public/assets/logo.png" alt="PIMJO" width="72" height="72" />

  <h1>PIMJO — E‑commerce Dashboard & Storefront</h1>

  <p>A production‑ready Next.js 15 + React 19 app with a beautiful dashboard, demo storefront, API routes, charts, auth, and dark mode theming.</p>

  <p>
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white" />
    <img alt="React" src="https://img.shields.io/badge/React-149ECA?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
    <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white" />
    <img alt="ApexCharts" src="https://img.shields.io/badge/ApexCharts-1A73E8?logo=apachespark&logoColor=white" />
    <img alt="NextAuth" src="https://img.shields.io/badge/NextAuth.js-000?logo=auth0&logoColor=white" />
    <img alt="pnpm" src="https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white" />
    <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white" />
    <img alt="Prettier" src="https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=black" />
  </p>

</div>

---

## Contents

- Overview
- Features
- Tech Stack
- Project Structure
- Getting Started
- Environment Variables
- Available Scripts
- API Endpoints
- Authentication
- Theming & UI
- Code Quality
- Notes & Decisions
- License

---

## Overview

This repository contains a modern e‑commerce UI and analytics dashboard powered by Next.js App Router. It includes demo API routes for cart, wishlist, products, orders, and stats; context providers for client state; charts via ApexCharts; and a simple credential‑based auth flow using NextAuth.js (with a static demo admin user).

Live development and production builds have been validated with strict TypeScript and ESLint rules.

## Features

- __Dashboard analytics__ with line and radial charts (ApexCharts)
- __E‑commerce pages__: Featured products, product table, recent orders
- __Cart & Wishlist__ with simple file‑based API persistence (`app/api/_data/*.json`)
- __Auth__ via NextAuth Credentials Provider (demo admin)
- __Theme switch / Dark mode__ using a custom `ThemeContext`
- __Responsive UI__ with Tailwind CSS and accessible components
- __Type‑safe contexts__ for Cart and Wishlist with optimistic updates
- __Strict lint & types__: no `any`, unescaped entity rules, Next.js best practices

## Tech Stack

- __Next.js 15__ (App Router, Turbopack)
- __React 19__ with Suspense
- __TypeScript__
- __Tailwind CSS__
- __ApexCharts__ via `react-apexcharts`
- __NextAuth.js__ for authentication
- __Heroicons__, __Lucide__, __React Icons__
- __pnpm__ for package management
- __ESLint__ + __Prettier__

## Project Structure

```
app/
  api/                # API routes (cart, wishlist, products, orders, auth, stats)
  auth/               # Login / Register pages
  components/         # Reusable UI components
    ecommerce/        # Dashboard widgets and tables
    dashboard/        # Dashboard layout pieces (e.g., sidebar)
  context/            # Theme, Cart, Wishlist providers
  layout.tsx          # Root layout
  page.tsx            # Home page
public/
  assets/             # Images (including logo)
```

Key files to know:

- `app/components/dashboard/MonthlyTarget.tsx`: radial chart + summary card
- `app/components/ecommerce/StatisticsChart.tsx`: area chart for monthly trends
- `app/context/{CartContext,WishlistContext}.tsx`: stateful providers with API calls
- `app/api/*/route.ts`: demo APIs storing data under `app/api/_data`
- `app/types/next-auth.d.ts`: NextAuth module augmentation for strong types
- `app/auth/login/page.tsx`: Suspense‑wrapped login page using `useSearchParams`

## Getting Started

Prerequisites:

- Node.js 18+
- pnpm 8+

Install dependencies:

```bash
pnpm install
```

Run in development:

```bash
pnpm dev
# http://localhost:3000
```

Build and start production:

```bash
pnpm build
pnpm start
# http://localhost:3000
```

## Environment Variables

Create a `.env.local` file at the project root:

```
NEXTAUTH_SECRET=replace_with_a_secure_random_string
```

The demo credentials provider authenticates a static admin user (see below), but `NEXTAUTH_SECRET` is still required for JWT encryption.

## Available Scripts

- `pnpm dev` — start Next.js dev server (Turbopack)
- `pnpm build` — type check, lint, and build for production
- `pnpm start` — start production server

## API Endpoints (demo)

- `GET/POST/PUT/DELETE /api/cart`
- `GET/POST/DELETE /api/wishlist`
- `GET /api/products`, `GET /api/orders`, `GET /api/stats`
- `POST /api/auth/login` — demo cookie‑based login endpoint
- `GET/POST /api/auth/[...nextauth]` — NextAuth routes

Data is stored in JSON files under `app/api/_data/` for demo purposes.

## Authentication

Credentials Provider in `app/api/auth/[...nextauth]/route.ts`:

- __Email__: `admin@example.com`
- __Password__: `admin123`

Types are strongly defined via module augmentation in `app/types/next-auth.d.ts` so that `session.user` and `token.user` include `id`, `email`, `name`, and `role`.

The login page `app/auth/login/page.tsx` uses `useSearchParams()` and is wrapped in `<Suspense>` to satisfy the App Router’s SSR + client boundary requirements.

## Theming & UI

- Theme via `ThemeContext` toggles light/dark classes and color tokens (`var(--foreground)`, `--background`, etc.)
- Components use Tailwind utility classes; charts are styled to match the theme
- Images are served using `next/image` for optimal LCP

## Code Quality

- ESLint and TypeScript are configured for strictness
- Common pitfalls addressed: unescaped entities in JSX, no explicit `any`, correct Suspense boundaries
- File and import conventions maintained for readability

## Notes & Decisions

- Replaced `<img>` with `next/image` in performance‑critical areas
- Added Suspense boundary around `useSearchParams` usage in the login page
- Removed `any` across contexts and API handlers using `unknown` + safe message extraction
- Sidebar menu renderer corrected to avoid argument mismatch

## License

This project is licensed under the MIT License.
# Pimjo-ecom-task
