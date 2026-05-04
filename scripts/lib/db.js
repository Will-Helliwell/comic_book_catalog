import { MongoClient } from 'mongodb';
import 'dotenv/config';

/**
 * Connects to MongoDB, passes the database instance to the provided function,
 * then closes the connection — even if an error is thrown.
 *
 * @param {(db: import('mongodb').Db) => Promise<void>} fn - Async function to run with the connected database.
 * @returns {Promise<void>}
 */
export async function withDb(fn) {
  const client = new MongoClient(process.env.MONGO_URI);
  try {
    await client.connect();
    await fn(client.db(process.env.DB_NAME));
  } finally {
    await client.close();
  }
}
