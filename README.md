# portfolio-latest

A minimal next app with Prisma 8 and Prisma Composer.

## Run locally

```bash
pnpm run dev:composer
```

This builds the app and starts it with Composer. PostgreSQL projects get a local Prisma Postgres database and apply the contract automatically.

## Deploy

```bash
pnpm run deploy
```

The deploy script builds the framework output, provisions Prisma Postgres when selected, applies migrations, and deploys the app to Prisma Compute.

The portfolio content is seeded idempotently from the existing feature constants:

```bash
pnpm run db:seed
```

Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` to sign in at `/dashboard/login` and manage content.

## Prisma

- Contract: `src/prisma/contract.prisma`
- Prisma and Composer config: `prisma.config.ts`
- Composer app: `module.ts` and `service.ts`

After changing the contract, run:

```bash
pnpm run contract:emit
pnpm run migration:plan -- --name describe_the_change
pnpm run migrate
```

To use the framework's development server directly, run `pnpm run dev`. This direct mode requires `DATABASE_URL`.
