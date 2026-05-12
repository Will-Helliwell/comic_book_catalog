export const usersValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: { bsonType: "string" },
      lastName: { bsonType: "string" },
    },
  },
};

// Note: `year` is stored as an integer (e.g. 1963) — MongoDB has no year-only date type.
export const booksValidator = {
  $jsonSchema: {
    bsonType: "object",
    required: ["title"],
    properties: {
      title: { bsonType: "string" },
      volume: { bsonType: "int" },
      issue: { bsonType: "int" },
      variant: { bsonType: "string" },
      year: { bsonType: "int" },
      coverGrade: { bsonType: "double" },
      expense: { bsonType: "double" },
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
};

// Note: `grade` and `pricePaid` are optional (e.g. for "wanted" books).
export const usersBooksValidator = {
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
};

// `prices` is an array of grade/price-range entries.
export const booksPricesAnalysesValidator = {
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
          required: ["grade", "rawPrice", "slabPrice"],
          properties: {
            grade: { bsonType: "double" },
            rawPrice: { bsonType: "double" },
            slabPrice: { bsonType: "double" },
          },
        },
      },
    },
  },
};
