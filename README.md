# Aurelia Moments

Luxury abaya valet booking app for weddings, private gatherings, and women's events in Qatar.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Cookie-based admin sessions

## Local Setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run seed
npm run dev
```

The public site runs at `http://127.0.0.1:3000/en` and `http://127.0.0.1:3000/ar`.

## Environment Variables

```bash
DATABASE_URL="postgresql://..."
AUTH_SECRET="use-a-long-random-secret-at-least-32-characters"
SEED_ADMIN_EMAIL="admin@example.com"
SEED_ADMIN_PASSWORD="strong-admin-password"
NEXT_PUBLIC_SITE_URL="https://your-production-domain.com"
```

Do not commit real `.env` files or production secrets.

## Database

Generate Prisma Client:

```bash
npm run prisma:generate
```

Create local migrations:

```bash
npm run prisma:migrate:dev
```

Apply committed migrations in production:

```bash
npm run prisma:migrate:deploy
```

Seed the admin user:

```bash
npm run seed
```

The seed script is idempotent and updates the seeded admin password hash if the same email already exists.

## Admin

Admin login is available at `/admin/login`.

Create the admin user by setting `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`, then run:

```bash
npm run seed
```

Admin pages are protected by signed httpOnly cookies. In production, cookies are marked secure.

## Bilingual Public Site

Public routes:

- `/en`
- `/ar`

Arabic pages use `lang="ar"` and `dir="rtl"`. English pages use `lang="en"` and `dir="ltr"`. The language switcher persists the selected language with a cookie.

## Railway Deployment

1. Create a new Railway project.
2. Add a Railway PostgreSQL service.
3. Connect this repository as the application service.
4. Set `DATABASE_URL` from the Railway PostgreSQL service.
5. Add `AUTH_SECRET`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `NEXT_PUBLIC_SITE_URL`.
6. Configure Railway commands:

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

Pre-deploy command:

```bash
npx prisma migrate deploy
```

After the first deployment, run the seed command once from Railway or a local shell connected to the production database:

```bash
npm run seed
```

## Images

Provided public assets live in:

```text
public/images/aurelia/
```

Do not replace them with placeholder imagery.

## Production Checks

```bash
npm run lint
npm run typecheck
npm run build
npx prisma validate
npx prisma migrate deploy
```
