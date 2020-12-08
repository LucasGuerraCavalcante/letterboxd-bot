const readlineSync = require('readline-sync');

async function loginLetterboxd(page) {
    await page.waitForSelector('.sign-in-menu');

    const login = readlineSync.question('Username or Email: ');
    const senha = readlineSync.question('Password: ', { hideEchoBack: true });
    console.log('\n')

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

async function findFilm(page, film) {
    await page.waitForSelector('.js-nav-search-toggle');

    // const film = readlineSync.question('Search: ');

    // Film search
    console.log(`Searching for: ${film}`);
    
    await page.click('.js-nav-search-toggle');
    await page.waitForSelector('#search-q');
    await page.type('#search-q', film);

    await page.keyboard.press('Enter'); 

    // Selecting the first result
    await page.waitForSelector('.film-title-wrapper');
    await page.click('.film-title-wrapper');
}

async function checkView(page) {
    console.log("Checking film as watched...");

    await page.waitForSelector('.-watch');
    await page.click('.-watch');
    
} 

async function readFileLinesAndCheckFilms(page, lines) {
    try {
        for (const film of lines) {
            try { 
                await findFilm(page, film) 
            } 
            catch (error) {
                console.log(`Something went wrong while searching for ${film}: `, error);
            }
        
            try { 
                await checkView(page) 
            } 
            catch (error) {
                console.log(`Something went wrong while checking ${film} as watched: `, error);
            } 
            finally {
                console.log(`${film} was checked as watched :)`, "\n");
            }          
        }
    } catch (error) {
        console.log("Something went wrong while reading the file: ", error);
    }
    
} 

module.exports = { loginLetterboxd, readFileLinesAndCheckFilms };
