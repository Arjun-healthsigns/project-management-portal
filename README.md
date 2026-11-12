# ProjectHub

A responsive project management portal built with React, TypeScript and Vite.

## Features

- Dashboard analytics with a Recharts project status donut, task completion progress, project summary and recent activity.
- Project creation, editing, deletion with cascade cleanup of tasks/activities, detail views, team assignment and task progress.
- Per-project task management with task creation/editing/deletion, assignment, status updates, priority, search and overdue highlighting.
- Team directory with add/edit, name/email search, department and active filters, member summaries, assigned projects and tasks.
- Client-side routing for dashboard, project, task and member views, with record-aware not-found states.
- Responsive desktop sidebar and mobile drawer, accessible native form controls, toast feedback and confirmation prompts.
- Central reducer state persisted to `projecthub-db-v1` in LocalStorage, initialized from realistic seed records on first load.

## Stack and architecture

React 19, TypeScript strict mode, Vite, React Router, Context + `useReducer`, Recharts, Lucide, React Hook Form, Zod, React Hot Toast, date-fns. `src/types.ts` defines records; `src/data.ts` seeds the initial database; `src/store.tsx` owns reducer and storage; `src/utils.ts` contains validation and data calculations; `src/App.tsx` contains routes and feature screens; `src/App.css` and `src/index.css` provide responsive styling.

## Run locally

```sh
npm install
npm run dev
```

There is no login gate; the workspace opens with demo data. Changes persist in this browser's LocalStorage. Clear the `projecthub-db-v1` entry in browser storage to restore the seed dataset.

## Routes

- `/dashboard`
- `/projects`, `/projects/new`, `/projects/:projectId`, `/projects/:projectId/edit`, `/projects/:projectId/tasks`
- `/team-members`, `/team-members/new`, `/team-members/:memberId`, `/team-members/:memberId/edit`
- Unknown paths and missing records show a not-found screen.

## Checks

- `npm run build` runs TypeScript project checks and the production Vite build.
- `npm run lint` runs Oxlint.
- `npm test` runs Vitest utility tests.

## Backend integration

The reducer and `useApp` hook isolate UI screens from persisted state operations. Replace the LocalStorage initializer/effect with asynchronous service calls and retain the same record types and reducer actions to connect a REST API.
