const readlineSync = require('readline-sync');

async function loginLetterboxd(page) {
    await page.waitForSelector('.sign-in-menu');

    const login = readlineSync.question('Username or Email: ');
    const senha = readlineSync.question('Password: ', { hideEchoBack: true });

    try {
        await page.click('.sign-in-menu');
        await page.type('input[type="email"]', login);
        await page.type('input[type="password"]', senha);
    
        await page.click('input[type="submit"]');
        await page.waitForNavigation();
    }
    catch (error) {
        console.log("Login falied")
        console.log(error)
    }

}

async function findFilm(page) {
    await page.waitForSelector('.js-nav-search-toggle');

    const film = readlineSync.question('Search: ');

    // Film search
    
    await page.click('.js-nav-search-toggle');
    await page.waitForSelector('#search-q');
    await page.type('#search-q', film);

    await page.keyboard.press('Enter'); 

    // Selecting the first result

    await page.waitForSelector('.film-detail-content');
    await page.click('.film-title-wrapper');
}

async function checkView(page) {
    await page.waitForSelector('.-watch');
    await page.click('.-watch');
    
} 

module.exports = { loginLetterboxd, findFilm, checkView };
