import { fileURLToPath } from 'url';
import { withDb } from './lib/db.js';
import {
  usersValidator,
  booksValidator,
  usersBooksValidator,
  booksPricesAnalysesValidator,
} from './lib/validators.js';

/**
 * Drops the existing database and recreates all collections with their validators.
 * @returns {Promise<void>}
 */
export async function setup() {
  await withDb(async (db) => {
    await db.dropDatabase();
    await db.createCollection('users',                { validator: usersValidator });
    await db.createCollection('books',                { validator: booksValidator });
    await db.createCollection('usersBooks',           { validator: usersBooksValidator });
    await db.createCollection('booksPricesAnalyses',  { validator: booksPricesAnalysesValidator });
  });
  console.log('Schema created successfully.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await setup();
