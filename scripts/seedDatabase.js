// Run from the project root: mongosh scripts/seedDatabase.js
// Seeds the existing comicBookCatalog database. Run setupSchema.js first.

load("scripts/config.js");

const db = db.getSiblingDB(config.dbName);

// ---------------------------------------------------------------------------
// users
// ---------------------------------------------------------------------------
const user1Id = db.users.insertOne({
  firstName: "John",
  lastName: "Smith",
}).insertedId;
const user2Id = db.users.insertOne({
  firstName: "Jane",
  lastName: "Doe",
}).insertedId;

// ---------------------------------------------------------------------------
// books
// ---------------------------------------------------------------------------
const spiderMan1Id = db.books.insertOne({
  title: "The Amazing Spider-Man #1",
  year: 1963,
  description:
    "The first solo Spider-Man comic, featuring the Chameleon as the villain.",
  coverArt: {
    source: "https://example.com/images/asm1.jpg",
    alt: "Amazing Spider-Man #1 cover",
  },
}).insertedId;

const batman1Id = db.books.insertOne({
  title: "Batman #1",
  year: 1940,
  description:
    "The first solo Batman comic, introducing the Joker and Catwoman.",
  coverArt: {
    source: "https://example.com/images/batman1.jpg",
    alt: "Batman #1 cover",
  },
}).insertedId;

const xMen1Id = db.books.insertOne({
  title: "X-Men #1",
  year: 1963,
  description:
    "The debut of the X-Men, featuring Cyclops, Marvel Girl, Beast, Iceman, and Angel.",
  coverArt: {
    source: "https://example.com/images/xmen1.jpg",
    alt: "X-Men #1 cover",
  },
}).insertedId;

// ---------------------------------------------------------------------------
// usersBooks
// ---------------------------------------------------------------------------

// John owns Amazing Spider-Man #1 and X-Men #1; wants Batman #1
db.usersBooks.insertOne({
  userId: user1Id,
  bookId: spiderMan1Id,
  grade: Double(8.5),
  status: "owned",
  pricePaid: Double(1500),
});

db.usersBooks.insertOne({
  userId: user1Id,
  bookId: xMen1Id,
  grade: Double(7.0),
  status: "owned",
  pricePaid: Double(800),
});

db.usersBooks.insertOne({
  userId: user1Id,
  bookId: batman1Id,
  status: "wanted",
});

// Jane owns Batman #1; wants Amazing Spider-Man #1
db.usersBooks.insertOne({
  userId: user2Id,
  bookId: batman1Id,
  grade: Double(6.5),
  status: "owned",
  pricePaid: Double(2200),
});

db.usersBooks.insertOne({
  userId: user2Id,
  bookId: spiderMan1Id,
  status: "wanted",
});

// ---------------------------------------------------------------------------
// booksPricesAnalyses
// ---------------------------------------------------------------------------
db.booksPricesAnalyses.insertOne({
  bookId: spiderMan1Id,
  runDate: new Date("2024-03-01"),
  sampleCount: 42,
  confidence: Double(0.9),
  prices: [
    { grade: Double(4.0), lowPrice: Double(280), highPrice: Double(340) },
    { grade: Double(6.0), lowPrice: Double(550), highPrice: Double(650) },
    { grade: Double(8.0), lowPrice: Double(1100), highPrice: Double(1300) },
    { grade: Double(9.0), lowPrice: Double(2400), highPrice: Double(2800) },
    { grade: Double(9.8), lowPrice: Double(8500), highPrice: Double(9500) },
  ],
});

db.booksPricesAnalyses.insertOne({
  bookId: batman1Id,
  runDate: new Date("2024-03-01"),
  sampleCount: 28,
  confidence: Double(0.8),
  prices: [
    { grade: Double(4.0), lowPrice: Double(900), highPrice: Double(1100) },
    { grade: Double(6.0), lowPrice: Double(1800), highPrice: Double(2200) },
    { grade: Double(8.0), lowPrice: Double(5000), highPrice: Double(6000) },
    { grade: Double(9.0), lowPrice: Double(12000), highPrice: Double(15000) },
  ],
});

print("Database seeded successfully.");
