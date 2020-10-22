const puppeteer = require('puppeteer');

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
    await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div/div[1]/div[3]/div[1]/div/div/div[2]', 5000);
    const element3 = await page.$x('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div/div[1]/div[3]/div[1]/div/div/div[2]')
    if (element3) element3[0].click()
    await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[1]/button[3]', 5000);
    const element4 = await page.$x('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[1]/button[3]')
    if (element4) element4[0].click()
    await page.waitForXPath('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[2]', 5000);
    const element5 = await page.$x('/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[2]', 5000)
    await element5[0].click()
    await page.waitForXPath("/html/body/div[1]/div/div/div[2]/div[3]/span/div/span/div/div[2]/span/div/div/div/div[5]");

    const array = await page.evaluate(() => {

      // Poor choice of variable names ?!, ik :)
      let x = document.querySelectorAll('._2o2ZR') 
      var y = [...x]
      var z = y.map(p => p.href)
      let a = document.querySelectorAll('._1vUBq')
      var b = [...a]
      var c = b.filter(q => q.title.includes("youtube.com") || q.title.includes("youtu.be"))
      var d = c.map(p => p.title)
      var res = z.concat(d);
      var result = res.map(url => url.replace("http://", "").replace("https://", "").replace("www.", "").replace("youtu.be/", "youtube.com/watch?v=").slice(20))
      return result;

    });
    
    await browser.close();
    return array;

  }
  catch (error) {
    console.log('error :(', error.message);
  }

};

module.exports = { scrape };