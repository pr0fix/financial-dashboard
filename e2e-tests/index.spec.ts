import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("");
});

test("index page has the correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Acme Dashboard/);
});

test("should navigate to the login page", async ({ page }) => {
  await page.getByText("Log in").click();

  await expect(page).toHaveURL("/login");

  await expect(page.locator("h1")).toContainText("Please log in to continue.");
});

test("should navigate to the sign up page", async ({ page }) => {
  await page.getByText("Sign up").click();

  await expect(page).toHaveURL("/sign-up");

  await expect(page.locator("h1")).toContainText("Create your account");
});
