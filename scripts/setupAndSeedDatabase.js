import { setup } from './setupSchema.js';
import { seed } from './seedDatabase.js';

await setup();
await seed();
