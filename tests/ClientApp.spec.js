const { test, expect } = require("@playwright/test");

test("Login and verify", async ({ page }) => {
  const email = "naveennagarajan34@gmail.com";
  const pwd = "Naveen@123";
  const neededProduct = "ZARA COAT 3";
  const emailField = page.locator("input[type='email']");
  const password = page.locator("input[type='password']");
  const loginBtn = page.locator("input[type='submit'][id='login']");

  await page.goto("https://rahulshettyacademy.com/client");
  await emailField.fill(email);
  await password.fill(pwd);
  await loginBtn.click();
  await expect(page.locator("div[id='toast-container']")).toHaveText(
    "Login Successfully"
  );

  // await page.locator("div.card-body b").last().waitFor();  // wait until the elements are loaded
  // const productTitles = await page.locator("div.card-body b").allTextContents();
  // console.log(productTitles);

  await page
    .locator(".card-body:has-text('" + neededProduct + "') >> text=Add To Cart")
    .click();
  await expect(page.locator("div[id='toast-container']")).toHaveText(
    "Product Added To Cart"
  );
  await page.locator("button[routerLink*='/cart']").click();
  await expect(page.locator("div.cartSection h3")).toHaveText(neededProduct);

  await page.locator("button:has-text('Checkout')").click();
  await page.locator("//div[contains(text(),'CVV Code')]/../input").fill("123");
  await page.locator("//div[contains(text(),'Name')]/../input").fill("Naveen");
  await page
    .locator("//div[contains(text(),'Coupon')]/../input")
    .fill("rahulshettyacademy");
  await page.locator("button:has-text('Apply Coupon')").click();
  await expect(
    page.locator("//div[contains(text(),'Coupon')]/../p")
  ).toHaveText("* Coupon Applied");
  await page
    .locator("input[placeholder='Select Country']")
    .pressSequentially("Ind");
  await page.locator("section.ta-results >> text='India'").click();
  await page.locator("//a[contains(text(),'Place Order ')]").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  let orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  orderId = orderId.replace(/\|/g, "").trim();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForTimeout(10000); // pauses for 5000 ms = 10 seconds
  const orderIds = await page.locator("tbody tr th").allTextContents();
  console.log(orderIds);
  expect(orderIds).toContain(orderId);
  await page
    .locator(
      `//th[contains(text(),'${orderId}')]/parent::tr//button[text()='Delete']`
    )
    .click();
  await page.waitForTimeout(10000);
});

//th[contains(text(),'6822015afd2af1c99e1c73dd')]/parent::tr//button[text()='Delete']
