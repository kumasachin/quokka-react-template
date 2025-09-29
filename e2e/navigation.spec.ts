import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should display all navigation tabs", async ({ page }) => {
    await page.goto("/");

    // Check that all navigation tabs are present
    const tabs = [
      { selector: '[data-testid="nav-tab-home"]', label: "Dashboard" },
      { selector: '[data-testid="nav-tab-devices"]', label: "Devices" },
      { selector: '[data-testid="nav-tab-patches"]', label: "Patches" },
      { selector: '[data-testid="nav-tab-firewall"]', label: "Firewall" },
      { selector: '[data-testid="nav-tab-policies"]', label: "Policies" },
      { selector: '[data-testid="nav-tab-settings"]', label: "Settings" },
    ];

    for (const tab of tabs) {
      await expect(page.locator(tab.selector)).toBeVisible();
      await expect(page.locator(tab.selector)).toContainText(tab.label);
    }
  });

  test("should navigate to devices page", async ({ page }) => {
    await page.goto("/");

    // Click on devices tab
    await page.locator('[data-testid="nav-tab-devices"]').click();

    // Check URL and page content
    await expect(page).toHaveURL("/devices");
    await expect(
      page.locator("h1, h2, h3").filter({ hasText: /device/i })
    ).toBeVisible();
  });

  test("should navigate to patches page", async ({ page }) => {
    await page.goto("/");

    // Click on patches tab
    await page.locator('[data-testid="nav-tab-patches"]').click();

    // Check URL and page content
    await expect(page).toHaveURL("/patches");
    await expect(
      page.locator("h1, h2, h3").filter({ hasText: /patch/i })
    ).toBeVisible();
  });

  test("should navigate to firewall page", async ({ page }) => {
    await page.goto("/");

    // Click on firewall tab
    await page.locator('[data-testid="nav-tab-firewall"]').click();

    // Check URL and page content
    await expect(page).toHaveURL("/firewall");
    await expect(
      page.locator("h1, h2, h3").filter({ hasText: /firewall/i })
    ).toBeVisible();
  });

  test("should navigate to policies page", async ({ page }) => {
    await page.goto("/");

    // Click on policies tab
    await page.locator('[data-testid="nav-tab-policies"]').click();

    // Check URL and page content
    await expect(page).toHaveURL("/policies");
    await expect(page.locator("text=Policies Management")).toBeVisible();
  });

  test("should navigate to settings page", async ({ page }) => {
    await page.goto("/");

    // Click on settings tab
    await page.locator('[data-testid="nav-tab-settings"]').click();

    // Check URL and page content
    await expect(page).toHaveURL("/settings");
    await expect(
      page.locator("h1, h2, h3").filter({ hasText: /setting/i })
    ).toBeVisible();
  });

  test("should navigate back to home from other pages", async ({ page }) => {
    // Start on devices page
    await page.goto("/devices");

    // Click on home/dashboard tab
    await page.locator('[data-testid="nav-tab-home"]').click();

    // Check we're back on home page
    await expect(page).toHaveURL("/");
    await expect(page).toHaveTitle("CyberSmart");
  });

  test("should maintain navigation state when refreshing", async ({ page }) => {
    await page.goto("/policies");

    // Refresh the page
    await page.reload();

    // Check we're still on the same page
    await expect(page).toHaveURL("/policies");
    await expect(page.locator("text=Policies Management")).toBeVisible();

    // Check navigation is still visible
    await expect(page.locator('[data-testid="navigation-tabs"]')).toBeVisible();
  });
});
