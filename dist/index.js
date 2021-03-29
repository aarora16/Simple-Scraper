"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = 'https://finance.yahoo.com/quote/aapl'; // URL we're scraping
const AxiosInstance = axios_1.default.create(); // Create a new Axios Instance
// Send an async HTTP Get request to the url
AxiosInstance.get(url)
    .then(// Once we have data returned ...
// Once we have data returned ...
response => {
    const html = response.data; // Get the HTML from the HTTP request
    const $ = cheerio_1.default.load(html); // Load the HTML string into cheerio
    const closeValue = $('*[data-test="PREV_CLOSE-value"]');
    const openValue = $('*[data-test="OPEN-value"]');
    const daysRangeValue = $('*[data-test="DAYS_RANGE-value"]');
    const yearRangeValue = $('*[data-test="FIFTY_TWO_WK_RANGE-value"]');
    const volumeValue = $('*[data-test="TD_VOLUME-value"]');
    const avgVolumeValue = $('*[data-test="AVERAGE_VOLUME_3MONTH-value"]');
    const marketCapValue = $('*[data-test="MARKET_CAP-value"]');
    console.log(`Previous Close Value: ${pruneHash(closeValue)}`);
    console.log(`Open Value: ${pruneHash(openValue)}`);
    console.log(`Days Range: ${daysRangeValue.text()}`);
    console.log(`Year Range: ${yearRangeValue.text()}`);
    console.log(`Volume: ${pruneHash(volumeValue)}`);
    console.log(`Average Volume: ${pruneHash(avgVolumeValue)}`);
    console.log(`Market Cap: ${pruneHash(marketCapValue)}`);
})
    .catch(console.error); // Error handling
const pruneHash = (object) => {
    return object['0']['children'][0]['children'][0]['data'];
};
//# sourceMappingURL=index.js.map