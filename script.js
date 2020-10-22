var fs = require('fs');
var readline = require('readline');
var { google } = require('googleapis');
const service = google.youtube('v3');
const cron = require('node-cron');
const puppeteer = require('puppeteer');
var OAuth2 = google.auth.OAuth2;

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/youtube-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/youtube.force-ssl'];
var TOKEN_DIR = __dirname + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'ytapi.json';


task = () => {
    // Load client secrets from a local file.
    fs.readFile('client_secret.json', (err, content) => {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the YouTube API.
        authorize(JSON.parse(content), addItems);
    });

}

task();
// cron.schedule("* * * * *", () => {
//   task(); //runs every midnight
//   console.log('again');
// })

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */

const authorize = (credentials, callback) => {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            callback(oauth2Client);
        }
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */

function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) throw err;
        console.log('Token stored to ' + TOKEN_PATH);
    });
}

let scrape = async () => {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            userDataDir: "./user_data",
            // slowMo: 250
        });

        const page = await browser.newPage();
        await page.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded' });
        await page.waitForXPath('//*[@id="pane-side"]/div[1]/div/div/div[1]/div/div/div[2]/div[2]/div[2]/span[1]/div', 5000);
        const element1 = await page.$x('//*[@id="pane-side"]/div[1]/div/div/div[1]/div/div/div[2]/div[2]/div[2]/span[1]/div')
        if (element1) element1[0].click()
        await page.waitForXPath('/html/body/div[1]/div/div/div[4]/div/header', 5000);
        const element2 = await page.$x('/html/body/div[1]/div/div/div[4]/div/header')
        if (element2) element2[0].click()
        await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div/div[1]/div[2]/div[1]/div/div/div[2]', 5000);
        const element3 = await page.$x('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div/div[1]/div[2]/div[1]/div/div/div[2]')
        if (element3) element3[0].click()
        await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[1]/button[3]', 5000);
        const element4 = await page.$x('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[1]/button[3]')
        if (element4) element4[0].click()
        await page.waitForXPath("/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[2]/span/div/div/div/div[5]",5000);


        const array = await page.evaluate(() => {

            // Poor choice of names ?!, ik :)
            let x = document.querySelectorAll('._2o2ZR')
            var y = [...x]
            var z = y.map(p => p.href)
            let a = document.querySelectorAll('._1vUBq')
            var b = [...a]
            var c = b.filter(q => q.title.includes("youtube.com") || q.title.includes("youtu.be"))
            var d = c.map(p => p.title)
            var res = z.concat(d);
            var result = res.map(url => url.replace("http://", "").replace("https://", "").replace("www.", "").replace("youtu.be/", "youtube.com/watch?v=").slice(20))
            debugger;
            return result;

        });

        await browser.close();
        return array;

    }
    catch (error) {
        console.log('error :(', error.message);
    }

};

/**
 * Add items to playlist
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const addItems = async (auth) => {
    video_id = await scrape();
    if (video_id) {   // For the sake of UnhandledPromiseRejection warning :O
        index = video_id.length - 1;
        addall(index);
    }
    function addall(index) {
        service.playlistItems.insert({
            auth: auth,
            part: 'snippet',
            resource: {
                snippet: {
                    playlistId: 'WL',
                    position: 0,
                    resourceId: {
                        kind: 'youtube#video',
                        videoId: video_id[index]
                    }
                }
            }
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err.message);
                return;
            }
            else {
                console.log('API executed succesfully');
                setTimeout(function () {
                    index--;
                    if (index >= (video_id.length-5))
                        addall(index); //Good ol' recursion
                }, 3000);
            }
        });
    }
}