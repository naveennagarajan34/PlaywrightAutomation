const { test, expect } = require("@playwright/test");

test("TC title", async ({ page }) => {
  // await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});

test("Test case 1", async ({ page }) => {
  // await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await page.goto("https://www.google.com/");
  console.log(await page.title());
  await page.goto("https://www.youtube.com/");
  await page.goBack();
  await expect(page).toHaveTitle("Google");
});

test.only("Login Page", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("input#username").fill("rahulshettyacademy ");
  await page.locator("[type='password']").fill("learnin");
  await page.locator("input[type='radio'][value='admin']").click();
  await page.locator("input[type='checkbox']").check();
  await page.locator("input#signInBtn").click();
  // console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password"
  );
  await page.waitForTimeout(10000);
});
