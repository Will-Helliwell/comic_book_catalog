// Run from the project root: mongosh scripts/setupSchema.js
// Drops the existing database and recreates it with validators.

load("scripts/config.js");

db = db.getSiblingDB(config.dbName);
db.dropDatabase();
db = db.getSiblingDB(config.dbName);

// ---------------------------------------------------------------------------
// users
// ---------------------------------------------------------------------------
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName"],
      properties: {
        firstName: { bsonType: "string" },
        lastName: { bsonType: "string" },
      },
    },
  },
});

// ---------------------------------------------------------------------------
// books
// Note: `year` is stored as an integer (e.g. 1963) — MongoDB has no
// year-only date type.
// ---------------------------------------------------------------------------
db.createCollection("books", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title"],
      properties: {
        title: { bsonType: "string" },
        year: { bsonType: "int" },
        description: { bsonType: "string" },
        coverArt: {
          bsonType: "object",
          properties: {
            source: { bsonType: "string" },
            alt: { bsonType: "string" },
          },
        },
      },
    },
  },
});

// ---------------------------------------------------------------------------
// usersBooks
// Note: `grade` and `pricePaid` are optional (e.g. for "wanted" books).
// ---------------------------------------------------------------------------
db.createCollection("usersBooks", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "bookId", "status"],
      properties: {
        userId: { bsonType: "objectId" },
        bookId: { bsonType: "objectId" },
        grade: { bsonType: "double" },
        status: { bsonType: "string", enum: ["owned", "wanted"] },
        pricePaid: { bsonType: "double" },
      },
    },
  },
});

// ---------------------------------------------------------------------------
// booksPricesAnalyses
// `prices` is an array of grade/price-range entries.
// ---------------------------------------------------------------------------
db.createCollection("booksPricesAnalyses", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["bookId", "runDate", "sampleCount", "confidence", "prices"],
      properties: {
        bookId: { bsonType: "objectId" },
        runDate: { bsonType: "date" },
        sampleCount: { bsonType: "int" },
        confidence: { bsonType: "double" },
        prices: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["grade", "lowPrice", "highPrice"],
            properties: {
              grade: { bsonType: "double" },
              lowPrice: { bsonType: "double" },
              highPrice: { bsonType: "double" },
            },
          },
        },
      },
    },
  },
});

print("Schema created successfully.");
