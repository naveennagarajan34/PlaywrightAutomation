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

test("Login Page", async ({ page }) => {
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

test("Handling dropdown and checkbox", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("input#username");
  const password = page.locator("[type='password']");
  const signInBtn = page.locator("input#signInBtn");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await page.selectOption("select.form-control", "Teacher");

  await page.locator("input[type='radio'][value='user']").check();
  await page.locator("button#okayBtn").click();
  console.log(
    await page.locator("input[type='radio'][value='user']").isChecked()
  );
  await expect(page.locator("input[type='radio'][value='user']")).toBeChecked();
  await page.locator("input[type='checkbox']").check();
  expect(await page.locator("input[type='checkbox']").isChecked()).toBeTruthy();
  await page.waitForTimeout(5000);
  const blinkElement = page.locator("a[href*=documents]");
  await expect(blinkElement).toHaveAttribute("class", "blinkingText");
  // await signInBtn.click();
});

test("Child Window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkElement = page.locator("a[href*=documents]");

  const [childPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkElement.click(),
  ]);
  console.log(await childPage.title());
});
