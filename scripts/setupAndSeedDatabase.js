// Run from the project root: mongosh scripts/setupAndSeedDatabase.js
// Drops the database, recreates the schema, then seeds it with example data.
// config.js is loaded transitively by each script below.

load("scripts/setupSchema.js");
load("scripts/seedDatabase.js");
