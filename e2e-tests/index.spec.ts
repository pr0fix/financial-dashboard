import { test, expect } from "@playwright/test";

test("index page has the correct title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Acme Dashboard/);
});

test("should navigate to the login page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=Log in");

  await expect(page).toHaveURL("http://localhost:3000/login");

  await expect(page.locator("h1")).toContainText("Please log in to continue.");
});

test("should navigate to the sign up page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.click("text=Sign up");

  await expect(page).toHaveURL("http://localhost:3000/sign-up");

  await expect(page.locator("h1")).toContainText("Create your account");
});
