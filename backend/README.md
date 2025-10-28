# Backend (FavMovie)

This backend is an Express + TypeScript server using Prisma ORM and MySQL.

## Quick setup

1. Copy the environment example:

```bash
cp .env.example .env
# Edit .env and set DATABASE_URL
```

2. Install dependencies

```bash
cd backend
npm install
```

3. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
# optionally seed
npx ts-node prisma/seed.ts
```

4. Start dev server

```bash
npm run dev
```

## API Endpoints

- POST /api/favorites - create favorite movie/show
- GET /api/favorites?limit=20&cursor=ID - list with cursor-based pagination
- PUT /api/favorites/:id - update
- DELETE /api/favorites/:id - delete

Body shape (JSON):

{
"title": "Inception",
"type": "Movie",
"director": "Christopher Nolan",
"budget": 160000000,
"location": "Various",
"duration": 148,
"year": 2010,
"details": "..."
}

## Notes

- The project expects a MySQL database. Set `DATABASE_URL` in `.env`.
- For development you can use a local MySQL or a Docker container.
- Frontend will call the endpoints under `/api/favorites`.
