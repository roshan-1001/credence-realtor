#!/usr/bin/env node
/**
 * Fetches all pages from Alnair find API and merges into all_data.json
 * Run: node scripts/fetch-and-merge-all-data.mjs
 */

const ALNAIR_URL = 'https://api.alnair.ae/project/find';
const X_AUTH_TOKEN = process.env.ALNAIR_X_AUTH_TOKEN || 'cf1ed55abb0afdff68ebc730e743b016a1d9560f9ecc40606a5c3f890c290a1c';
const SEARCH_PARAMS = {
  limit: 100,
  'search_area[east]': 55.529708862304695,
  'search_area[north]': 25.24283273549745,
  'search_area[south]': 25.066319162978587,
  'search_area[west]': 54.99275207519532,
  has_cluster: 1,
  has_boundary: 0,
  zoom: 11,
};

// Fetch until we get an empty page or no more data
const OUTPUT_PATH = './src/data/all_data.json';

async function fetchPage(page) {
  const params = new URLSearchParams({ ...SEARCH_PARAMS, page: String(page) });
  const url = `${ALNAIR_URL}?${params}`;
  const res = await fetch(url, {
    headers: {
      'X-AUTH-TOKEN': X_AUTH_TOKEN,
      'X-App-Version': '14.2.2',
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function main() {
  const allItems = [];
  let page = 1;
  let totalPages = 23; // Will update from first response
  for (;;) {
    process.stdout.write(`Fetching page ${page}... `);
    const data = await fetchPage(page);
    const items = data?.data?.items || [];
    if (data?.pages) totalPages = data.pages;
    allItems.push(...items);
    console.log(`${items.length} items (total: ${allItems.length}, ${totalPages} pages)`);
    if (items.length === 0 || page >= totalPages) break;
    page++;
    await new Promise((r) => setTimeout(r, 300));
  }

  const output = {
    data: { items: allItems },
    count: allItems.length,
    page: 1,
    pages: totalPages,
  };

  const fs = await import('fs');
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 4), 'utf-8');
  console.log(`\nDone. Wrote ${allItems.length} projects to ${OUTPUT_PATH}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
