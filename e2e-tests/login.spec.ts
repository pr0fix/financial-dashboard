import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("login page has the correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Login/);
});

test("should navigate user to dashboard after successful login", async ({
  page,
}) => {
  await page.getByLabel("Email").fill("user@nextmail.com");
  await page.getByLabel("Password").fill("123456");

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL("/dashboard");
  await expect(page).toHaveTitle(/Home/);
  await expect(page.locator("h1")).toContainText("Dashboard");
});

test("should display an error message when credentials are incorrect", async ({
  page,
}) => {
  await page.getByLabel("Email").fill("user@nextmail.com");
  await page.getByLabel("Password").fill("wrongpassword");

  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page.getByText("Invalid credentials.")).toBeVisible();
  await expect(page).toHaveURL("/login");
  await expect(page).toHaveTitle(/Login/);
});

test("should navigate to sign up page from login", async ({ page }) => {
  await page.getByRole("link", { name: "Sign up" }).click();

  await expect(page).toHaveURL("/sign-up");
  await expect(page).toHaveTitle(/Sign up | Acme Dashboard/);
  await expect(page.locator("h1")).toContainText("Create your account");
});
