# 🪐 Journally WEB

Web application for managing a **personal digital journal**, with collections and entries designed to support users in their daily writing, organization, and reflection process.

Designed with a soft, illustrated, and minimalist aesthetic intended to feel like a small personal universe.

## Table of contents

- [Introduction](#introduction)
    - [Features](#features)
- [Requirements](#requirements)
- [Clone the repository](#clone-the-repository)
- [Installation](#installation)
- [Project stack](#project-stack)
- [Environments and integration](#environments-and-integration)
    - [Backend connection](#backend-connection)
    - [Environment variables](#environment-variables)
    - [Available scripts](#available-scripts)
- [Branch modeling](#branch-modeling)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Formatting configuration](#formatting-configuration)
    - [Prettier](#prettier)
    - [ESLint](#eslint)
- [Testing](#testing)
- [Screenshots](#screenshots)

---

## 📝 Introduction

**Journally WEB** is an application focused on personal journaling. Its goal is to provide users with a friendly, simple, and aesthetic tool to record their day-to-day life and organize their thoughts through collections and entries.

### Features

✔️ Create collections

✔️ Create entries within a collection

✔️ Edit collection and entry names

✔️ Delete items

✔️ Clear navigation between sections

✔️ Intuitive UI with tooltips, modals, and visual feedback

✔️ Automatic access-token renewal and logout when the session expires

### Design

The application uses a style that is:

- Warm and soft

- Handwritten typography

- Custom space-themed illustrations

- Friendly interface focused on user experience

- Rounded components, pastel tones, and vibrant colors for action states

**_(Inspired by a small personal universe ✨)_**

---

## Requirements

- Node.js 22 or newer
- pnpm 11.x (the repository pins pnpm 11.20.0)
- A running [Journally API](https://github.com/SabriBere/Journally-API) instance

---

## 📦 Clone the repository

```bash
git clone https://github.com/SabriBere/Journally-Web.git
cd Journally-Web
```

---

## 🛠 Installation

1. Install dependencies.

```bash
pnpm install --frozen-lockfile
```

2. Create a `.env.dev` file from `.env.example`.

```bash
cp .env.example .env.dev
```

3. Start Journally API by following its
   [README](https://github.com/SabriBere/Journally-API#readme). The default
   values in `.env.example` expect it at `http://localhost:8080`.

4. Start the frontend.

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000).

---

## Project stack

- Next.js v.15
- TypeScript
- React 19
- Redux Toolkit
- React Query (TanStack Query)
- Sass / SCSS Modules
- NextAuth
- Axios
- WebSocket
- TipTap
- Jest and Testing Library

---

## 🔧 Environments and integration

### Backend connection

The frontend depends on
[Journally API](https://github.com/SabriBere/Journally-API) for authentication,
collections, entries, and real-time updates.

For the default local setup:

- REST API: `http://localhost:8080/api`
- WebSocket: `ws://localhost:8080/entries`
- Frontend: `http://localhost:3000`

Start the API before testing login, registration, or journal features. User
registration is performed through the frontend and sent to the API.

### Environment variables

The repository includes `.env.example` as a safe template for documenting the required variables without exposing real credentials.

- `.env.dev` is used for local development.
- `.env.prod` is used for local production builds.
- Files with real values must not be committed to the repository.

Expected variables:

| Variable                 | Purpose                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`    | Public URL of the API consumed by the frontend.                                         |
| `NEXT_PUBLIC_SOCKET_URL` | WebSocket endpoint used for real-time entry updates.                                    |
| `NEXTAUTH_URL`           | Base URL used by NextAuth.                                                              |
| `NEXTAUTH_SECRET`        | Secret used by NextAuth. It must be defined with a secure value outside the repository. |

> Variables prefixed with `NEXT_PUBLIC_` may be exposed to the browser. They must not contain secrets.

### Available scripts

| Command              | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `pnpm dev`           | Start the development server with `.env.dev` and Turbopack. |
| `pnpm production`    | Build locally with variables loaded from `.env.prod`.       |
| `pnpm build`         | Create the standard production build used by CI and Vercel. |
| `pnpm test`          | Run the Jest test suite.                                    |
| `pnpm test:watch`    | Run Jest in watch mode.                                     |
| `pnpm test:coverage` | Run Jest and generate a coverage report.                    |
| `pnpm test:ci`       | Run the tests serially without Watchman.                    |
| `pnpm lint`          | Run ESLint against JavaScript and TypeScript source files.  |

---

## Branch modeling

The project uses `develop` as the integration branch and `master` as the production branch.

- `feature/*` branches must be opened as pull requests into `develop`.
- `bugFix/*` branches must be opened as pull requests into `develop`.
- `hotfix/*` branches can be opened as pull requests into `master` for urgent production fixes.
- After a `hotfix/*` branch is merged into `master`, the fix must be merged back into `develop`.
- `develop` is merged into `master` for production releases.

---

## 🚀 Deployment

The frontend can be deployed to a platform such as Vercel by connecting the repository to the corresponding project.

- The deployment provider must read environment variables from its project configuration, not from versioned `.env` files.
- Sensitive values, such as `NEXTAUTH_SECRET`, must be configured directly in the deployment provider.
- CI and Vercel use the standard production build command:

```bash
pnpm build
```

For a local build that explicitly loads `.env.prod`, run `pnpm production`.

To keep the repository ready for publication:

- keep only `.env.example` under version control;
- do not publish tokens, secrets, or provider IDs;
- document only the names of the required variables, not their real values.

---

## 🧱 Architecture

```bash
src/
├── app
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth]
│   │   └── provider
│   ├── collection
│   │   └── [id]
│   ├── entries
│   │   └── [id]
│   ├── home
│   │   └── components
│   ├── login
│   │   └── components
│   └── register
│       └── components
├── commons
│   ├── Buttons
│   ├── Cards
│   ├── Editor
│   ├── EmptyStates
│   ├── Footer
│   ├── Ilustrations
│   ├── InfinteScroll
│   ├── Inputs
│   ├── Modals
│   ├── Navbar
│   ├── NotFound
│   ├── Sidebar
│   ├── Skeletons
│   ├── Spinner
│   ├── Switch
│   ├── Tabs
│   ├── Title
│   ├── Toast
│   └── Tooltip
├── config
├── contexts
├── hooks
├── services
├── store
├── styles
│   └── icons
├── types
└── utils
```

---

## 🧹 Formatting configuration

### Prettier

The repository includes this `.prettierrc` configuration:

```json
{
    "semi": true,
    "trailingComma": "es5",
    "singleQuote": false,
    "printWidth": 80,
    "tabWidth": 4,
    "endOfLine": "lf"
}
```

---

### ESLint

The project uses ESLint flat config through `eslint.config.mjs`, extending:

- `next/core-web-vitals`
- `next/typescript`
- `prettier`

It also includes rules for imports, React hooks, TanStack Query, Testing Library, and Jest.

## 🧪 Testing

The project uses Jest for automated testing.

```bash
pnpm test
pnpm test:ci
pnpm test:coverage
```

## 📸 Screenshots

- 🔐 Login page  
  ![Login page](./captions/caption1.png)

- 🗂 Collections overview  
  ![Collections](./captions/caption2.png)

- ✏️ Collection name editing

- 📝 Entry detail  
  ![Entries](./captions/Capture7.png)

- 🗃 Modals and tools  
  ![Tools](./captions/capture3.png)
  ![Tools](./captions/capture4.png)
  ![Tools](./captions/capture5.png)
  ![Tools](./captions/capture6.png)

---
