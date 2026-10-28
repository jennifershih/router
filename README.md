# 🧭 Angular Router practice

[![ci](https://github.com/jennifershih/router/actions/workflows/ci.yml/badge.svg)](https://github.com/jennifershih/router/actions/workflows/ci.yml)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev)

My walkthrough of the official [Angular Router tutorial](https://angular.dev/guide/routing) ("Heroes" and "Crisis Center"), first written in 2021 on Angular 12 and updated to Angular 22.

## What it covers

- Feature modules with lazy loading and a custom **selective preloading** strategy
- **Functional guards**: `canMatch` / `canActivate` for the login-protected admin area, `canDeactivate` for unsaved changes
- A **resolver** that loads a crisis before the detail page opens and redirects unknown ids
- Redirects (`/heroes` → `/superheroes`), route parameters, query params and fragments
- A **secondary outlet** for the "Contact" popup, and route animations

## Getting started

Requires Node.js 22+.

```bash
npm install
npm start          # http://localhost:4200
```

| Command | What it does |
|---|---|
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run test:ci` | Routing tests (Vitest) |
| `npm run lint` | ESLint |

## What changed in the 2026 update

- Angular 12 → 22: standalone bootstrap, application builder, built-in control flow, `inject()`
- Class-based `CanLoad`/`CanActivate`/`CanDeactivate`/`Resolve` → functional guards and resolver
- Removed leftover tutorial files, a duplicate route and router debug tracing
- Karma/Protractor → Vitest tests for redirects, lazy loading, the resolver and the auth guard
