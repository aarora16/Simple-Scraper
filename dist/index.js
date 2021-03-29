"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const url = 'https://finance.yahoo.com/quote/aapl';
const AxiosInstance = axios_1.default.create(); 
AxiosInstance.get(url)
    .then(
response => {
    const html = response.data; 
    const $ = cheerio_1.default.load(html); 
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
    .catch(console.error); 
const pruneHash = (object) => {
    return object['0']['children'][0]['children'][0]['data'];
};
