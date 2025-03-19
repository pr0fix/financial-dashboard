import { test, expect } from "@playwright/test";

test("customers page loads correctly", async ({ page }) => {
  await page.goto("/dashboard/customers");
  await expect(page).toHaveTitle(/Customers/i);
});
