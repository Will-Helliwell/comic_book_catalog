// Run from the project root: mongosh scripts/seedDatabase.js
// Seeds the existing comicBookCatalog database. Run setupSchema.js first.

load('scripts/config.js');

const db = db.getSiblingDB(config.dbName);

// ---------------------------------------------------------------------------
// users
// ---------------------------------------------------------------------------
const user1Id = db.users.insertOne({ firstName: 'John', lastName: 'Smith' }).insertedId;
const user2Id = db.users.insertOne({ firstName: 'Jane', lastName: 'Doe'   }).insertedId;

// ---------------------------------------------------------------------------
// books
// ---------------------------------------------------------------------------
const spiderMan1Id = db.books.insertOne({
  title:       'The Amazing Spider-Man #1',
  year:        1963,
  description: 'The first solo Spider-Man comic, featuring the Chameleon as the villain.',
  coverArt:    { source: 'https://example.com/images/asm1.jpg', alt: 'Amazing Spider-Man #1 cover' },
}).insertedId;

const batman1Id = db.books.insertOne({
  title:       'Batman #1',
  year:        1940,
  description: 'The first solo Batman comic, introducing the Joker and Catwoman.',
  coverArt:    { source: 'https://example.com/images/batman1.jpg', alt: 'Batman #1 cover' },
}).insertedId;

const xMen1Id = db.books.insertOne({
  title:       'X-Men #1',
  year:        1963,
  description: 'The debut of the X-Men, featuring Cyclops, Marvel Girl, Beast, Iceman, and Angel.',
  coverArt:    { source: 'https://example.com/images/xmen1.jpg', alt: 'X-Men #1 cover' },
}).insertedId;

// ---------------------------------------------------------------------------
// usersBooks
// ---------------------------------------------------------------------------

// John owns Amazing Spider-Man #1 and X-Men #1; wants Batman #1
db.usersBooks.insertOne({
  userId:    user1Id,
  bookId:    spiderMan1Id,
  grade:     8.5,
  status:    'owned',
  pricePaid: 1500.00,
});

db.usersBooks.insertOne({
  userId:    user1Id,
  bookId:    xMen1Id,
  grade:     7.0,
  status:    'owned',
  pricePaid: 800.00,
});

db.usersBooks.insertOne({
  userId: user1Id,
  bookId: batman1Id,
  status: 'wanted',
});

// Jane owns Batman #1; wants Amazing Spider-Man #1
db.usersBooks.insertOne({
  userId:    user2Id,
  bookId:    batman1Id,
  grade:     6.5,
  status:    'owned',
  pricePaid: 2200.00,
});

db.usersBooks.insertOne({
  userId: user2Id,
  bookId: spiderMan1Id,
  status: 'wanted',
});

// ---------------------------------------------------------------------------
// booksPricesAnalyses
// ---------------------------------------------------------------------------
db.booksPricesAnalyses.insertOne({
  bookId:      spiderMan1Id,
  runDate:     new Date('2024-03-01'),
  sampleCount: 42,
  confidence:  0.9,
  prices: [
    { grade: 4.0, lowPrice:  280.00, highPrice:  340.00 },
    { grade: 6.0, lowPrice:  550.00, highPrice:  650.00 },
    { grade: 8.0, lowPrice: 1100.00, highPrice: 1300.00 },
    { grade: 9.0, lowPrice: 2400.00, highPrice: 2800.00 },
    { grade: 9.8, lowPrice: 8500.00, highPrice: 9500.00 },
  ],
});

db.booksPricesAnalyses.insertOne({
  bookId:      batman1Id,
  runDate:     new Date('2024-03-01'),
  sampleCount: 28,
  confidence:  0.8,
  prices: [
    { grade: 4.0, lowPrice:  900.00,  highPrice: 1100.00  },
    { grade: 6.0, lowPrice: 1800.00,  highPrice: 2200.00  },
    { grade: 8.0, lowPrice: 5000.00,  highPrice: 6000.00  },
    { grade: 9.0, lowPrice: 12000.00, highPrice: 15000.00 },
  ],
});

print('Database seeded successfully.');
