const puppeteer = require('puppeteer');

const { loginLetterboxd, findFilm, checkView } = require('./services');

async function letterboxdBot() {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://letterboxd.com');

    try { await loginLetterboxd(page) } catch (error) {
        console.log("Something went wrong during login: ", error)
    }

    const cookies = await page.cookies();
    await page.setCookie(...cookies);

    try { await findFilm(page) } catch (error) {
        console.log("Something went wrong while searching for the movie: ", error)
    }

    try { await checkView(page) } catch (error) {
        console.log("Something went wrong while checking as watched: ", error)
    }
  
    await browser.close();
};

letterboxdBot();