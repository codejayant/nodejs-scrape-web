const puppeteer = require('puppeteer');

let scrape = async () => {
  // Actual Scraping goes Here...
  const browser =  await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('http://books.toscrape.com/');
  await page.waitFor(1000);

  // scrape
  await page.click('#default > div.container-fluid.page > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');

  const result = await page.evaluate(() => {
    let title = document.querySelector('h1').innerText;
    let price = document.querySelector('.price_color').innerText;
    return {
      title,
      price
    }
  });

  browser.close();

  // Return a value
  return result;
};

scrape().then((value) => {
    console.log(value); // Success!
});