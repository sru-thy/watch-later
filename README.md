
Watch Later 
---

A WhatsApp Bot that scrapes the YouTube links sent by a contact and adds them to your watch later playlist.

:stars: Developed Using [Puppeteer](https://developers.google.com/web/tools/puppeteer)
> Checkout the legailty of web scraping [here](https://www.tutorialspoint.com/python_web_scraping/legality_of_python_web_scraping.htm) before diving into the code
> 
Usage
---
- Clone this repo, `cd watch-later`
- Go to [Google Developers Console](https://console.developers.google.com/) 
- Create a new project, enable the YouTube API and create an OAuth 2.0 Client ID
- Download the client_secret.json file and add it to your current directory
- Login to WhatsApp web on chrome or chromium browser
- Make a copy of the [User Data Directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md) of the browser on your current directory or provide a relative path at [L116](https://github.com/sru-thy/watch-later/blob/master/script.js#L116)
- Install all the required dependencies by running

```
npm install
```

- Serve the bot and authorize the app 

```
npm start
```
:rocket: And there you have it.. The bot is up and scraping
 
:thinking: Why you might need this !
---
- You're too lazy to do a task that takes less than a second to do 
- If you're friends with someone like [@fillerInk](https://github.com/fillerInk) who likes to spam the chat with YouTube videos
- Because WhatsApp sucks :lizard:
- Remember when YouTube chat existed.. yes i miss it too :coffin:

:arrow_forward: Play Around
---
 - The browser is launched headless by default. See the browser in action by changing `headless: false` at [L115](https://github.com/sru-thy/watch-later/blob/master/script.js#L115)
 - [Puppeteer](https://github.com/puppeteer/puppeteer#puppeteer) downloads chromium by default. Using [puppeteer-core](https://github.com/puppeteer/puppeteer#puppeteer-core)  you can connect to an existing browser installation 

PS - WhatsApp does not allow bots . Use their [official API](https://www.whatsapp.com/business/api) instead !
