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
  const userName = page.locator("input#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("input#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy ");
  await password.fill("learn");
  await signIn.click();
  await expect(page.locator("[style*='block']")).toContainText(
    "Incorrect username/password"
  );
  await userName.fill("");
  await password.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await page.locator("input[type='radio'][value='admin']").click();
  await page.locator("input[type='checkbox']").check();
  signIn.click();
  // console.log(await page.locator("[style*='block']").textContent());
  await page.waitForTimeout(10000);
});
