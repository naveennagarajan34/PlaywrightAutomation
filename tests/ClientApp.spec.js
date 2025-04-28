const { test, expect } = require("@playwright/test");

test("Login and verify", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  const emailField = page.locator("input[type='email']");
  const password = page.locator("input[type='password']");
  const loginBtn = page.locator("input[type='submit'][id='login']");
  await emailField.fill("naveennagarajan34@gmail.com");
  await password.fill("Naveen@123");
  await loginBtn.click();
  await expect(page.locator("div[id='toast-container']")).toHaveText(
    "Login Successfully"
  );
  await page.locator("div.card-body b").first().waitFor();
  const productTitles = await page.locator("div.card-body b").allTextContents();
  console.log(productTitles);
  await page.waitForTimeout(5000);
});
