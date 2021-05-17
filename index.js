const puppeteer = require('puppeteer');
const express = require('express')
const DEBUG=0;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 
(async () => {
  
  if(DEBUG==1) {
    browser = await puppeteer.launch(
      { headless: false,
        slowMo: 500, 
      }
    );    
  } else {
    browser = await puppeteer.launch(
      {
        headless: true
      }
      // {args: ['--no-sandbox', '--disable-setuid-sandbox']}
    );
  }

  console.log("opened")
  const page = await browser.newPage();
  await page.goto(REPORT_URL);
  await sleep(2000);
  await page.screenshot({
    path: 'example.png',
    fullPage: true
  });
  // await page.emulateMediaType('screen') 
  await page.pdf({
    landscape: true,
    format: 'A4',
    path: 'pdf.pdf',
    printBackground: true,
    margin: {
      top: '10px',
      left: '50px',
      bottom: '50px',
      right: '50px'
    },
    // displayHeaderFooter: true,
  })
 
  await browser.close();
})();


const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)