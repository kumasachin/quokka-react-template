import { Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/login");

  // Fill in login form - target the input elements inside the TextField
  await page.locator('[data-testid="login-username"] input').fill("admin");
  await page.locator('[data-testid="login-password"] input').fill("password");

  // Submit form
  await page.locator('[data-testid="login-submit"]').click();

  // Wait for redirect to home
  await page.waitForURL("/");
}
