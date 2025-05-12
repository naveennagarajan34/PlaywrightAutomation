const { test, expect, request } = require("@playwright/test");
const loginPayLoad = {
  userEmail: "naveennagarajan34@gmail.com",
  userPassword: "Naveen@123",
};

let token;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayLoad,
    }
  );
  expect(loginResponse.ok()).toBeTruthy(); // Optional, but useful
  const loginResponseJson = await loginResponse.json(); // ✅ await added
  token = loginResponseJson.token;
});

test("Login Using Api token", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");
  page.pause();
});
