const { test, expect } = require("@playwright/test");

test.only("Pop up", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  expect(await page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  expect(await page.locator("#displayed-text")).toBeHidden();
  await page.locator("#confirmbtn").click();
  await page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#mousehover").hover();
  await page.waitForTimeout(10000);
});
