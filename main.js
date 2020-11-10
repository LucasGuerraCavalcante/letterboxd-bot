const fs = require('fs');
const puppeteer = require('puppeteer');

const { loginLetterboxd, readFileLinesAndCheckFilms } = require('./services');

async function letterboxdBot() {
    // const browser = await puppeteer.launch({ headless: true });
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    
    await page.goto('https://letterboxd.com');

    // Login
    try { await loginLetterboxd(page) } catch (error) {
        console.log("Something went wrong during login: ", error)
    }

    // Using page cookies
    const cookies = await page.cookies();
    await page.setCookie(...cookies);

    // Reading films file
    const data = fs.readFileSync('films.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    // Reading line by line and checking the films
    await readFileLinesAndCheckFilms(page, lines)

    await browser.close();
};

letterboxdBot();