# Invoice Management App

A single-page application for managing invoices, sellers, and customers. Built with React and TypeScript as a technical assignment.

The app has three pages — **Invoices**, **Sellers**, and **Customers** — each supporting full create, edit, and delete operations against a mock backend.

## Tech Stack

- **React + TypeScript + Vite** — modern build tooling with full static typing (strict mode).
- **TanStack Router** — type-safe, file-based client-side routing, including edit-by-URL.
- **TanStack Query (React Query) + Axios** — server-state management (fetching, caching, automatic refetch after mutations, loading states).
- **json-server** — mock REST backend.
- **CSS Modules** — component-scoped styling with centralized design tokens (CSS variables).
- **Framer Motion** — row enter/exit animations.
- **lucide-react** — icons.
- **ESLint + Prettier** — linting and consistent formatting.

## Getting Started

### Prerequisites

- Node.js 18+ (developed on Node 22)
- [pnpm](https://pnpm.io/) as the package manager

### Installation

```bash
pnpm install
```

### Environment

The API base URL is configured via an environment variable. Copy the example file:

```bash
cp .env.example .env
```

The default value points to the local mock server:

```
VITE_API_URL=http://localhost:3001
```

> The app also falls back to `http://localhost:3001` if no `.env` file is present.

### Running the app

The app needs two processes: the mock backend (json-server) and the frontend (Vite).

**Option A — one command (recommended):**

```bash
pnpm start
```

This runs both the mock server and the frontend concurrently.

**Option B — two terminals:**

```bash
# Terminal 1 — mock backend
pnpm run server

# Terminal 2 — frontend
pnpm run dev
```

Then open the URL printed by Vite (default: `http://localhost:5173`).

## Available Scripts

- `pnpm start` — run mock server and frontend together
- `pnpm run dev` — frontend only
- `pnpm run server` — mock backend only (json-server on port 3001)
- `pnpm run build` — production build
- `pnpm run preview` — preview the production build
- `pnpm run lint` — run ESLint
- `pnpm run format` — format the codebase with Prettier

## Project Structure

The project uses a **feature-based** structure. Shared, generic building blocks live in `src/components`, while everything specific to a domain (invoices, sellers, customers) lives under `src/features`. Routing is file-based: each file in `src/routes` maps to a URL.

```
src/
├── api/                  # Axios instance + response interceptor
├── app/                  # Query client configuration
├── components/           # Shared generic UI (DataTable, Modal, Toast, Pagination, ...)
├── features/
│   ├── invoices/
│   │   ├── api/          # CRUD calls (tree-shakeable named exports)
│   │   ├── hooks/        # TanStack Query hooks
│   │   ├── components/   # Invoice-specific components (form, entity link)
│   │   ├── validation/   # Pure validation functions
│   │   └── InvoicesPage.tsx
│   ├── sellers/          # same shape
│   └── customers/        # same shape
├── hooks/                # Shared hooks (pagination, row selection)
├── layout/               # Sidebar + app layout
├── routes/               # File-based route definitions (TanStack Router)
├── styles/               # Global styles and design tokens (variables.css)
├── types/                # Shared TypeScript types (domain models, form values)
└── utils/                # Formatting helpers, constants
```

## Data Model

Invoices reference sellers and customers by **ID** (`sellerId`, `customerId`) rather than storing their names directly. Display names are derived by joining against the sellers/customers collections at render time.

This is a deliberate choice: storing references instead of duplicated names avoids data inconsistency (e.g. renaming a seller updates every invoice automatically) and mirrors how a relational database would model these entities.

Domain models and form value shapes are defined once in `src/types` and reused across the API layer, hooks, validation, and components, so the data contract is consistent and type-checked end to end.

## Key Features & Decisions

### Type safety

The whole codebase is TypeScript in strict mode. Domain types (`Invoice`, `Seller`, `Customer`) flow through the API layer, query hooks, validation, and components. Generic building blocks — the pagination hook and the `DataTable` — are typed with generics, so they stay reusable across all three domains without losing type information.

### CRUD with a shared, generic table and modal

`DataTable`, `Modal`, and the form field components are domain-agnostic and reused across all three pages. Each page feeds them a typed column configuration and its own data, which keeps the three pages consistent and avoids duplicated markup.

### Routing and edit-by-URL

Routing uses TanStack Router with file-based routes. Opening `/invoices/$id` (via the Edit button or by pasting the URL into a new tab) opens the edit modal pre-filled with that record. The URL is the source of truth for the edit state, so both entry points go through the same mechanism. The selected row is highlighted in the table behind the modal.

If the ID in the URL does not exist, the app does not expose anything — it redirects back to the list with a notification. Note that true per-user authorization belongs on the backend; the frontend here reacts correctly to an unavailable resource, and the Axios interceptor centrally handles `401/403` responses, which is the frontend side of that contract.

### Validation

All validation rules from the assignment are implemented as **pure functions** in each feature's `validation/` folder, separated from the UI:

- Invoice amount must be greater than 0
- Invoice date cannot be in the future
- An invoice cannot be created with an inactive seller
- All fields are required
- A seller or customer that appears on an existing invoice cannot be deleted

Field-level errors are shown **inline** below each input. In addition, a single summary toast notification appears in the top-right corner on an invalid submit (as required), instead of one toast per error — this fulfils the requirement while avoiding a stack of toasts when several fields are invalid. The form stays open so the user does not lose their input.

To prevent invalid input at the source, inactive sellers are disabled in the seller dropdown (with a tooltip explaining why), and the date input has a `max` attribute so future dates cannot be picked. The validation functions remain as a safety net.

### Formatting

Amounts and dates are stored in a raw, unformatted form (a number and an ISO date) and formatted only for display. Amounts use the `de-DE` locale (`.` as thousands separator, `,` for decimals) to match the wireframe (e.g. `325.400,00 $`); dates render as `dd.mm.yyyy`.

### Referential integrity on delete

Because json-server does not enforce foreign-key constraints, the app checks referential integrity at the application level before deleting a seller or customer, blocking deletion if the entity is referenced by any invoice.

### Design tokens

Colors, spacing, typography, radii, and layout dimensions are centralized as CSS variables in `styles/variables.css`, so the visual language is consistent and easy to adjust from one place.

## Bonus Features Implemented

- **Client-side pagination** with an adjustable page size
- **Seller/customer links** on the invoices table that navigate to the related record and highlight it
- **Multiple row selection** with bulk delete (Edit is enabled only when exactly one row is selected; delete respects referential integrity for every selected row)
- **Row animations** on add/remove
- **Loading indicators** during backend communication (both on initial load and during create/edit/delete actions)

## Notes

- Seeded demo data lives in `db.json` so the app shows content immediately on first run.
- Mock data changes made through the app are written back to `db.json` by json-server and persist across restarts.
- The app is designed for desktop use, consistent with the wireframe and the nature of an admin/management tool.

### Production considerations

The current build produces a single main chunk (~510kB) that slightly exceeds Vite's 500kB warning threshold. For production I would introduce route-based code-splitting with `React.lazy` for the three page components, so each route loads only what it needs. It was kept as a single bundle here to keep the setup simple for the assignment.
