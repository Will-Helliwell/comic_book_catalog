import { fileURLToPath } from 'url';
import { Double } from 'mongodb';
import { withDb } from './lib/db.js';

/**
 * Inserts example users, books, user-book relationships, and price analyses
 * into the existing database. Run after {@link setup} to ensure collections and
 * validators are in place.
 * @returns {Promise<void>}
 */
export async function seed() {
  await withDb(async (db) => {
    // -------------------------------------------------------------------------
    // users
    // -------------------------------------------------------------------------
    const { insertedId: user1Id } = await db.collection('users').insertOne({ firstName: 'John', lastName: 'Smith' });
    const { insertedId: user2Id } = await db.collection('users').insertOne({ firstName: 'Jane', lastName: 'Doe'   });

    // -------------------------------------------------------------------------
    // books
    // -------------------------------------------------------------------------
    const { insertedId: spiderMan1Id } = await db.collection('books').insertOne({
      title:       'The Amazing Spider-Man',
      volume:      1,
      issue:       1,
      variant:     'A',
      year:        1963,
      coverGrade:  new Double(9.4),
      expense:     new Double(1500),
      description: 'The first solo Spider-Man comic, featuring the Chameleon as the villain.',
      coverArt:    { source: 'https://example.com/images/asm1.jpg', alt: 'Amazing Spider-Man #1 cover' },
    });

    const { insertedId: batman1Id } = await db.collection('books').insertOne({
      title:       'Batman',
      volume:      1,
      issue:       1,
      variant:     'A',
      year:        1940,
      coverGrade:  new Double(6.0),
      expense:     new Double(800),
      description: 'The first solo Batman comic, introducing the Joker and Catwoman.',
      coverArt:    { source: 'https://example.com/images/batman1.jpg', alt: 'Batman #1 cover' },
    });

    const { insertedId: xMen1Id } = await db.collection('books').insertOne({
      title:       'X-Men',
      volume:      1,
      issue:       1,
      variant:     'A',
      year:        1963,
      coverGrade:  new Double(8.0),
      expense:     new Double(2500),
      description: 'The debut of the X-Men, featuring Cyclops, Marvel Girl, Beast, Iceman, and Angel.',
      coverArt:    { source: 'https://example.com/images/xmen1.jpg', alt: 'X-Men #1 cover' },
    });

    // -------------------------------------------------------------------------
    // usersBooks
    // -------------------------------------------------------------------------

    // John owns Amazing Spider-Man #1 and X-Men #1; wants Batman #1
    await db.collection('usersBooks').insertOne({
      userId:    user1Id,
      bookId:    spiderMan1Id,
      grade:     new Double(8.5),
      status:    'owned',
      pricePaid: new Double(1500),
    });

    await db.collection('usersBooks').insertOne({
      userId:    user1Id,
      bookId:    xMen1Id,
      grade:     new Double(7.0),
      status:    'owned',
      pricePaid: new Double(800),
    });

    await db.collection('usersBooks').insertOne({
      userId: user1Id,
      bookId: batman1Id,
      status: 'wanted',
    });

    // Jane owns Batman #1; wants Amazing Spider-Man #1
    await db.collection('usersBooks').insertOne({
      userId:    user2Id,
      bookId:    batman1Id,
      grade:     new Double(6.5),
      status:    'owned',
      pricePaid: new Double(2200),
    });

    await db.collection('usersBooks').insertOne({
      userId: user2Id,
      bookId: spiderMan1Id,
      status: 'wanted',
    });

    // -------------------------------------------------------------------------
    // booksPricesAnalyses
    // -------------------------------------------------------------------------
    await db.collection('booksPricesAnalyses').insertOne({
      bookId:      spiderMan1Id,
      runDate:     new Date('2024-03-01'),
      sampleCount: 42,
      confidence:  new Double(0.9),
      prices: [
        { grade: new Double(4.0), rawPrice: new Double(280),  slabPrice: new Double(340)  },
        { grade: new Double(6.0), rawPrice: new Double(550),  slabPrice: new Double(650)  },
        { grade: new Double(8.0), rawPrice: new Double(1100), slabPrice: new Double(1300) },
        { grade: new Double(9.0), rawPrice: new Double(2400), slabPrice: new Double(2800) },
        { grade: new Double(9.8), rawPrice: new Double(8500), slabPrice: new Double(9500) },
      ],
    });

    await db.collection('booksPricesAnalyses').insertOne({
      bookId:      batman1Id,
      runDate:     new Date('2024-03-01'),
      sampleCount: 28,
      confidence:  new Double(0.8),
      prices: [
        { grade: new Double(4.0), rawPrice: new Double(900),   slabPrice: new Double(1100)  },
        { grade: new Double(6.0), rawPrice: new Double(1800),  slabPrice: new Double(2200)  },
        { grade: new Double(8.0), rawPrice: new Double(5000),  slabPrice: new Double(6000)  },
        { grade: new Double(9.0), rawPrice: new Double(12000), slabPrice: new Double(15000) },
      ],
    });
  });

  console.log('Database seeded successfully.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await seed();
