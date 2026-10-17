## Quickstart

Get started on local development with:

- `bun env:up`
- `bun dev`

## Worktrees

Create and remove worktrees using `bun wt`.
When working with worktrees in this project, it is true that:

- It has its own supabase environment

## Database

Only interact with the database using the authorized commands:

- `bun db:start` - starts the local stack
- `bun db:reset` - resets the local stack
- `bun db:migrate:gen` - generates a migration file based on schema changes
- `bun db:migrate:up` - applies migrations to the local stack
- `bun db:migrate:down` - downgrades one migration from the local stack

## Linting and formatting

After making code changes, ensure it's up to standards by running:

- `bun lint:fix`
- `bun fmt`
