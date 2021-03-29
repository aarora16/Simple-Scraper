import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://finance.yahoo.com/quote/aapl';
const AxiosInstance = axios.create(); 

AxiosInstance.get(url)
  .then(
    response => {
      const html = response.data;
      const $ = cheerio.load(html);

      const closeValue: Cheerio = $('*[data-test="PREV_CLOSE-value"]');
      const openValue: Cheerio = $('*[data-test="OPEN-value"]');
      const daysRangeValue: Cheerio = $('*[data-test="DAYS_RANGE-value"]')
      const yearRangeValue: Cheerio = $('*[data-test="FIFTY_TWO_WK_RANGE-value"]')
      const volumeValue: Cheerio = $('*[data-test="TD_VOLUME-value"]')
      const avgVolumeValue: Cheerio = $('*[data-test="AVERAGE_VOLUME_3MONTH-value"]')
      const marketCapValue: Cheerio = $('*[data-test="MARKET_CAP-value"]')

      console.log(`Previous Close Value: ${pruneHash(closeValue)}`);
      console.log(`Open Value: ${pruneHash(openValue)}`);
      console.log(`Days Range: ${daysRangeValue.text()}`);
      console.log(`Year Range: ${yearRangeValue.text()}`);
      console.log(`Volume: ${pruneHash(volumeValue)}`);
      console.log(`Average Volume: ${pruneHash(avgVolumeValue)}`);
      console.log(`Market Cap: ${pruneHash(marketCapValue)}`);
    }
  )
  .catch(console.error); // Error handling

const pruneHash = (object) => {
  return object['0']['children'][0]['children'][0]['data'];
}
