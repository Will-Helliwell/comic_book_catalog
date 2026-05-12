const BASE_URL = 'https://pluckyinnovation.com/crankyoldmangaming/CrankyMarvel/CrankyComics/';

/**
 * Parses a single tbody <tr> element from the Cranky Comics table into
 * structured book and price analysis objects.
 *
 * @param {import('cheerio').CheerioAPI} $ - Cheerio instance
 * @param {import('cheerio').Element} row - A <tr> element from #marvel tbody
 * @returns {{ book: object, pricesAnalysis: object }}
 */
export function parseRow($, row) {
  const cells = $(row).find('td');

  const imgTd     = cells.eq(0);
  const imgSrc    = imgTd.find('img').attr('src');
  const imgAlt    = imgTd.find('img').attr('alt');

  const year      = parseInt(cells.eq(2).text().trim(), 10);
  const coverGrade = parseFloat(cells.eq(3).text().trim());
  const description = cells.eq(4).text().trim();

  const title     = cells.eq(6).text().trim();
  const volume    = parseInt(cells.eq(7).text().trim(), 10);
  const issue     = parseInt(cells.eq(8).text().trim(), 10);
  const variant   = cells.eq(9).text().trim();
  const expense   = parseFloat(cells.eq(10).text().trim());

  const { runDate, sampleCount, confidence, prices } = parsePricesCell(cells.eq(5).text());

  return {
    book: {
      title, volume, issue, variant, year, coverGrade, expense, description,
      coverArt: { source: `${BASE_URL}${imgSrc}`, alt: imgAlt },
    },
    pricesAnalysis: {
      bookRef: imgAlt,  // e.g. "A-Force_vol1_1A" — resolved to ObjectId at seed time
      runDate,
      sampleCount,
      confidence,
      prices,
    },
  };
}

/**
 * Parses the ML Value cell text into price analysis fields.
 * First line format: "{sampleCount}: {MM/DD/YY} {confidence}"
 * Price line format: "{grade}:${rawPrice}&nbsp/&nbsp${slabPrice}"
 *
 * @param {string} cellText
 * @returns {{ runDate: string, sampleCount: number, confidence: number, prices: object[] }}
 */
function parsePricesCell(cellText) {
  const lines = cellText.trim().split('\n').map(l => l.trim()).filter(Boolean);
  const [headerLine] = lines;

  const headerMatch = headerLine.match(/^(\d+):\s+(\S+)\s+([\d.]+)/);
  const sampleCount = parseInt(headerMatch[1], 10);
  const confidence  = parseFloat(headerMatch[3]);

  const dateStr = headerMatch[2];
  const runDate = dateStr.includes('/')
    ? new Date(`20${dateStr.split('/')[2]}-${dateStr.split('/')[0]}-${dateStr.split('/')[1]}`).toISOString()
    : null;

  const priceRegex = /([\d.]+):\$([\d.]+)[\s ]*\/[\s ]*\$([\d.]+)/g;
  const prices = [...cellText.matchAll(priceRegex)].map(([, grade, raw, slab]) => ({
    grade:     parseFloat(grade),
    rawPrice:  parseFloat(raw),
    slabPrice: parseFloat(slab),
  }));

  return { runDate, sampleCount, confidence, prices };
}
