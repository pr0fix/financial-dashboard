import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/dashboard/customers");
});

test("customers page has correct title", async ({ page }) => {
  await expect(page).toHaveTitle(/Customers/i);
});

test("customers table displays correctly", async ({ page }) => {
  const table = page.getByTestId("customers-table");

  const isMobile = await page.evaluate(() => window.innerWidth < 768);

  if (isMobile) {
    const customerCards = page.locator(".md\\:hidden > div");
    await expect(customerCards.first()).toBeVisible();

    const firstCustomerName = await customerCards
      .first()
      .locator("p")
      .nth(0)
      .textContent();
    expect(firstCustomerName).not.toBeNull();

    const actions = customerCards.first().locator(".flex.gap-2").first();
    await expect(actions).toBeVisible();

    const actionChildCount = await actions.locator("> *").count();
    expect(actionChildCount).toBeGreaterThan(0);
  } else {
    await expect(table).toBeVisible();

    const headers = [
      "Name",
      "Email",
      "Total Invoices",
      "Total Pending",
      "Total Paid",
    ];

    for (const header of headers) {
      await expect(
        table.getByRole("columnheader", { name: header })
      ).toBeVisible();
    }

    const rows = table.locator("tbody tr");
    await expect(rows).not.toHaveCount(0);

    const firstRow = rows.first();
    await expect(firstRow.locator("td").first()).toContainText(/./);

    const lastCell = firstRow.locator("td").last();
    await expect(lastCell).toBeVisible();

    const actionElements = lastCell.locator("button, [role='button'], a");
    const actionCount = await actionElements.count();
    expect(actionCount).toBeGreaterThan(0);
  }
});

test("delete customer action opens a confirmation dialog", async ({ page }) => {
  const firstRow = page
    .getByTestId("customers-table")
    .locator("tbody tr")
    .first();

  const lastCell = firstRow.locator("td").last();

  const deleteButton = lastCell.locator("button.hover\\:bg-red-500").first();

  await expect(deleteButton).toBeVisible();

  await deleteButton.click();

  const dialog = page.getByTestId("confirm-dialog");
  await expect(dialog).toBeVisible();

  const cancelButton = page.getByTestId("cancel-button");
  await cancelButton.click();

  await expect(dialog).not.toBeVisible();
});
