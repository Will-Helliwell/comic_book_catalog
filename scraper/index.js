import * as cheerio from "cheerio";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseRow } from "./lib/parseRow.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, "..", "data");
const URL =
  "https://pluckyinnovation.com/crankyoldmangaming/CrankyMarvel/CrankyComics/index.php";

const html = await (await fetch(URL)).text();
const $ = cheerio.load(html);

const books = [];
const analyses = [];

$("#marvel tbody tr").each((_, row) => {
  const { book, pricesAnalysis } = parseRow($, row);
  books.push(book);
  analyses.push(pricesAnalysis);
});

mkdirSync(DATA_DIR, { recursive: true });
writeFileSync(
  join(DATA_DIR, "books.ndjson"),
  books.map((b) => JSON.stringify(b)).join("\n"),
);
writeFileSync(
  join(DATA_DIR, "booksPricesAnalyses.ndjson"),
  analyses.map((a) => JSON.stringify(a)).join("\n"),
);

console.log(`Scraped ${books.length} records.`);
