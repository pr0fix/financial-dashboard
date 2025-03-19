import { test as setup, expect } from "@playwright/test";
import path from "path";
const authFile = path.join(__dirname, "../playwright/.auth/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@nextmail.com");
  await page.getByLabel("Password").fill("123456");
  await page.getByRole("button", { name: "Log in" }).click();

  await page.waitForURL("/dashboard");

  await expect(page).toHaveTitle(/Home/);

  await page.context().storageState({ path: authFile });
});
