const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function duckduckgoSearch() {
    const search = readlineSync.question('Search: ');

    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://duckduckgo.com');

    await page.type('#search_form_input_homepage', search);
    await page.keyboard.press('Enter');
    
    await page.waitForSelector('#r1-0');
    await page.click('.result__a');
  
    await browser.close();
};

duckduckgoSearch();