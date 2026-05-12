# Comic Book Catalog

## Prerequisites

- [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed and running locally
- [Node.js](https://nodejs.org/) (v18 or later)

## Setup

Install dependencies:

```bash
npm install
```

Copy the environment file and adjust values if needed:

```bash
cp .env.example .env
```

## Database scripts

### Set up schema

Drops the existing database and recreates all collections with validators:

```bash
npm run setupSchema
```

### Seed database

Inserts example data into the existing database (run after `setupSchema`):

```bash
npm run seedDatabase
```

### Set up and seed

Drops the database, recreates the schema, and seeds it in one step:

```bash
npm run setupAndSeedDatabase
```

## Scraper

Scrapes all comic records from the source site and writes two NDJSON files to `data/` (gitignored):

- `data/books.ndjson` — one book record per line
- `data/booksPricesAnalyses.ndjson` — one price analysis record per line, keyed by `bookRef`

```bash
npm run scrape
```

These files are the intermediate format for bulk database seeding. The `data/` directory is created automatically if it does not exist.

## Database schema

Database name: `comicBookCatalog`

| Collection | Description |
|---|---|
| `users` | App users |
| `books` | Comic book catalogue entries |
| `usersBooks` | Links users to books they own or want |
| `booksPricesAnalyses` | Historical price analysis runs for a book |
