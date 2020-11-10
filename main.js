const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');

async function loginLetterboxd(page) {
    await page.waitForSelector('.sign-in-menu');

    const login = readlineSync.question('Username or Email: ');
    const senha = readlineSync.question('Password: ');

    await page.click('.sign-in-menu');
    await page.type('input[type="email"]', login);
    await page.type('input[type="password"]', senha);

    await page.click('input[type="submit"]');
    await page.waitForNavigation();
}

async function findFilm(page) {
    await page.waitForSelector('.js-nav-search-toggle');

    const film = readlineSync.question('Search: ');
    
    await page.click('.js-nav-search-toggle');
    await page.waitForSelector('#search-q');
    await page.type('#search-q', film);

    await page.keyboard.press('Enter'); 

    await page.waitForSelector('.film-detail-content');
    await page.click('.film-title-wrapper');
}

async function checkView(page) {
    await page.waitForSelector('.-watch');
    await page.click('.-watch');
    
}

async function letterboxdBot() {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://letterboxd.com');

    await loginLetterboxd(page)

    const cookies = await page.cookies();
    await page.setCookie(...cookies);

    await findFilm(page)

    await checkView(page)
  
    await browser.close();
};

// lucasguerratee@gmail.com
// WSB144589Lucas@

letterboxdBot();