const puppeteer = require('puppeteer');

let scrape = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com', { waitUntil: 'domcontentloaded' });
    page.waitForTimeout(6000)
    .then(() => console.log('Waited  6 seconds!'));
  

    await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[2]/span/div/div/div')
    .then(async() => {
      await page.waitForTimeout(10000)
      .then(() => console.log('waited 10secs'));
      }
    );
    
    const array = await page.evaluate(() => {
      let x = document.querySelectorAll('._2o2ZR')
      var y = [...x]
      var z = y.map(p => p.href)
      let a = document.querySelectorAll('._1vUBq')
      var b = [...a]
      var res = b.filter(q => q.title.includes("youtube.com") || q.title.includes("youtu.be"))
      var d = res.map(p => p.title)
      var resu = z.concat(d);
      var result = resu.map(url => url.replace("http://", "").replace("https://", "").replace("www.", "").replace("youtu.be/", "youtube.com/watch?v=").slice(20))
      return result;
    });
    await browser.close();
    return array;
  }
  catch(error) {
    console.log('error :(',error.message);
  }

};

module.exports = { scrape };