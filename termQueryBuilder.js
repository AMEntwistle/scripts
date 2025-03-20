const fs = require('fs');
const path = require('path');

// Read the JSON file
const jsonFilePath = path.join(__dirname, 'input.json');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Base SQL query
let sqlQuery = `
select * from ROYALTY_ACCOUNTING.TEST.E2E_ACC_RUN_STMT_DB_SALES_DISTRO_STAGING s
join orchard_app_reporting_v2.art_relations_prod_art_relations.country c on s.country_id = c.id
`;

// Add where clause conditions based on JSON data
const conditions = [];

if (jsonData.stores && jsonData.stores.length > 0) {
  const storeIds = jsonData.stores.join(', ');
  conditions.push(`store_id in (${storeIds})`);
}

if (jsonData.countries && jsonData.countries.length > 0) {
  const countryIds = jsonData.countries.map(country => `'${country}'`).join(', ');
  conditions.push(`c.iso3166a3 in (${countryIds})`);
}

if (jsonData.transactionTypes && jsonData.transactionTypes.length > 0) {
  const transactionTypeIds = jsonData.transactionTypes.join(', ');
  conditions.push(`transaction_type_id in (${transactionTypeIds})`);
}

if (jsonData.products && jsonData.products.length > 0) {
  const productIds = jsonData.products.map(product => `'${product}'`).join(', ');
  conditions.push(`UPC in (${productIds})`);
}

if (jsonData.tracks && jsonData.tracks.length > 0) {
  const trackIds = jsonData.tracks.map(track => `'${track}'`).join(', ');
  conditions.push(`ISRC in (${trackIds})`);
}

// Combine conditions into the SQL query
if (conditions.length > 0) {
  sqlQuery += 'where ' + conditions.join('\n  and ');
}

console.log(sqlQuery);