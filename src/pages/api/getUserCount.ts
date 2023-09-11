// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let driver;

  try {
    // 머리 없는 모드로 브라우저를 설정
    const options = new chrome.Options();
    options.headless();

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();

    await driver.get("https://trickcal.com/");

    const element = await driver.findElement(By.css("p.el.count"));
    const data = await element.getText();

    res.status(200).json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: "An error occurred while scraping data" });
  } finally {
    // WebDriver 인스턴스 종료
    if (driver) {
      await driver.quit();
    }
  }
}
