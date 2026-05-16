const puppeteer = await import('puppeteer');
const fs = require('fs');

(async () => {
  console.log("מפעיל דפדפן ומנסה למשוך נתונים...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    await page.goto('https://kick.com/api/v2/channels/odedsvr/leaderboards', {
      waitUntil: 'networkidle2',
    });

    const content = await page.evaluate(() => document.body.innerText);
    const jsonData = JSON.parse(content);
    
    // שומר את הנתונים לקובץ באותה תיקייה
    fs.writeFileSync('data.json', JSON.stringify(jsonData, null, 2));
    console.log("הנתונים נשמרו בהצלחה בקובץ data.json!");
  } catch (error) {
    console.error("שגיאה במשיכת הנתונים:", error);
  }

  await browser.close();
})();
