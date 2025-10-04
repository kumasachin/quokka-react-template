import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./auth-helpers";

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await loginAsAdmin(page);

    // Check if the page loads
    await expect(page).toHaveTitle("cybero");

    // Check for main content
    await expect(page.locator("h1, h2, h3").first()).toBeVisible();
  });

  test("should have navigation", async ({ page }) => {
    await loginAsAdmin(page);

    // Check if navigation exists
    const nav = page.locator('[data-testid="navigation-tabs"]');
    await expect(nav).toBeVisible();
  });
});
