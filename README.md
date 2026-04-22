# Comic Book Catalog

## Prerequisites

- [MongoDB](https://www.mongodb.com/docs/manual/installation/) installed and running locally
- `mongosh` available on your PATH

## Database scripts

All scripts must be run from the **project root**.

### Set up schema

Drops the existing database and recreates all collections with validators:

```bash
mongosh scripts/setupSchema.js
```

### Seed database

Inserts example data into the existing database (run after `setupSchema.js`):

```bash
mongosh scripts/seedDatabase.js
```

### Set up and seed

Drops the database, recreates the schema, and seeds it in one step:

```bash
mongosh scripts/setupAndSeedDatabase.js
```

## Database schema

Database name: `comicBookCatalog`

| Collection | Description |
|---|---|
| `users` | App users |
| `books` | Comic book catalogue entries |
| `usersBooks` | Links users to books they own or want |
| `booksPricesAnalyses` | Historical price analysis runs for a book |
