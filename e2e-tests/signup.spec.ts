import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/sign-up");
});

test("sign-up page has the correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Sign Up/);
});

test("should navigate user to dashboard after successful sign up", async ({
  page,
}) => {
  const uniqueEmail = `testuser_${Date.now()}_${Math.floor(
    Math.random() * 10000
  )}@user.com`;

  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill(uniqueEmail);
  await page.getByLabel("Password").fill("testpassword");

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page).toHaveURL("/dashboard");
  await expect(page).toHaveTitle(/Home/);
  await expect(page.locator("h1")).toContainText("Dashboard");
});

test("should display en error message when the email is already in use", async ({
  page,
}) => {
  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("user@nextmail.com");
  await page.getByLabel("Password").fill("testpassword");

  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(
    page.getByText("User with this email already exists.")
  ).toBeVisible();
  await expect(page).toHaveURL("/sign-up");
  await expect(page).toHaveTitle(/Sign Up/);
});

test("should navigate to login page from sign up", async ({ page }) => {
  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page).toHaveURL("/login");
  await expect(page).toHaveTitle(/Login/);
  await expect(page.locator("h1")).toContainText("Please log in to continue");
});
