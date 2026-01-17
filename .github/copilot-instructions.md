# STM Admin Frontend - AI Coding Guidelines

## Architecture Overview
This is a Next.js 16 admin frontend for the STM Marketplace platform, using the App Router for routing. The application is structured around managing marketplace entities like orders, products, stores, and content via a Studio CMS.

Primary goals:
- Superuser-only admin (efficient, low-click, fast data ops)
- Stable deployment (Vercel) with API hosted at https://api.somtammarket.com
- Replace Railway Django admin (not used)

## Key Components & Structure
- **app/**: Next.js App Router pages
  - `(auth)/`: Authentication routes (login, etc.)
  - `stm-admin/`: Main admin interface with sub-routes for orders, posts, products, stores
  - `stm-admin/studio-cms/`: Content management for campaigns, design templates, pillars, themes, topics
- **components/**: Reusable UI components organized by domain
  - `admin/`: Admin-specific components (Sidebar, Topbar, DataTable, PageHeader)
  - `common/`: Shared utilities (Loading, ErrorState, ConfirmDialog)
  - `studio/`: Studio CMS components (Campaign cards, Template editor, filters)
- **lib/**: Core business logic
  - `api/`: API client (`client.ts`), endpoints (`endpoints.ts`), types (`types.ts`)
  - `auth/`: Authentication guards (`guard.ts`) and session management (`session.ts`)
  - `utils/`: Utility functions (formatting, className helpers)
  - `copy/`: Text constants (labels, empty states, button text)

## Development Patterns
- Use TypeScript with strict mode enabled
- Import paths: Use `@/*` alias for root-relative imports (configured in `tsconfig.json`)
- Styling: Tailwind CSS v4 for utility-first CSS (keep UI clean, readable, admin-fast)
- API Integration: Centralize API calls in `lib/api/client.ts`, define endpoints in `lib/api/endpoints.ts`, types in `lib/api/types.ts`
- Authentication: Implement guards in `lib/auth/guard.ts`, session handling in `lib/auth/session.ts`
- Component Organization: Place domain-specific components in respective folders under `components/`

## Server vs Client Component Rules (Important)
- Default to **Server Components** for page-level data fetch (faster, simpler SSR).
- Use **Client Components** only when needed:
  - forms (react-hook-form)
  - dialogs/modals
  - interactive tables (client filtering, debounced search)
- Never call `cookies()` or `headers()` inside Client Components.
- For interactive pages:
  - Server page fetches initial data
  - Client table handles search/filter UX locally OR triggers refetch with query params.

## Environment & Config
- Required env vars (Vercel Production):
  - `NEXT_PUBLIC_API_BASE_URL=https://
