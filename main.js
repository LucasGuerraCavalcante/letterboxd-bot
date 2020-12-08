const fs = require('fs');
const puppeteer = require('puppeteer');

const { loginLetterboxd, readFileLinesAndCheckFilms } = require('./services');

async function letterboxdBot() {
    // const browser = await puppeteer.launch({ headless: true });

    // ---------------------------------------------------------------------------------------------
    console.log("Opening browser...")

    const browser = await puppeteer.launch({ 
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ], 
        ignoreHTTPSErrors: true,
        headless: false 
    })
        .catch(error => {
            console.log("Something went wrong during puppeteer.launch: ", error)
        });

    const [ page ] = await browser.pages()
        .catch(error => {
            console.log("Something went wrong during browser.pages: ", error)
        });

    // ---------------------------------------------------------------------------------------------
    console.log("Opening Letterboxd...", "\n")
    
    await page.goto('https://letterboxd.com', {"waitUntil" : ['load', 'networkidle0', 'domcontentloaded']})
        .catch(error => {
            console.log("Something went wrong during page.goto letterboxd: ", error)
        });

    // ---------------------------------------------------------------------------------------------
    console.log("Sign in")

    // Login
    await loginLetterboxd(page)
        .catch(error => {
            console.log("Something went wrong during login: ", error)
        });

    // Using page cookies
    const cookies = await page.cookies();
    await page.setCookie(...cookies);

    // ---------------------------------------------------------------------------------------------
    // Reading films file
    const data = fs.readFileSync('films.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    // Reading line by line and checking the films
    await readFileLinesAndCheckFilms(page, lines)

    // ---------------------------------------------------------------------------------------------
    await browser.close();
};

letterboxdBot();