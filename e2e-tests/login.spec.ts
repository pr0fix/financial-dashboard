import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
});

test("login page has the correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Login | Acme Dashboard/);
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
