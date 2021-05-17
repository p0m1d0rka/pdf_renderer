const puppeteer = require('puppeteer');
const express = require('express')

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

const app = express()

async function getReport(url, week, year, file_name) {
    const PDF_PATH = `reports/${file_name}_${Date.now()}.pdf`
    browser = await puppeteer.launch(
    {
        headless: true
    }
    );
    const prepared_url = `${url}?week=${week}&year=${year}`
    const page = await browser.newPage();
    await page.goto(url);
    await sleep(1000);
    // await page.screenshot({
    //   path: 'example.png',
    //   fullPage: true
    // });
    // await page.emulateMediaType('screen') 
    await page.pdf({
      landscape: true,
      format: 'A4',
      path: PDF_PATH,
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
    return PDF_PATH
  };


app.get('/', async function (req, res) {
    const year = req.query.year
    const week = req.query.week
    const url = req.query.url
    const file_name = req.query.file_name
    pdf_path = await getReport(url, week, year, file_name)
    const file = `${__dirname}/${pdf_path}`;
    res.download(file);     
})
 
app.listen(3000)