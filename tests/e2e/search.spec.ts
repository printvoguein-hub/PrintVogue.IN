import { test, expect } from "@playwright/test";

test("search suggestion and navigate", async ({ page }) => {
  await page.goto("/");
  await page.fill('input[placeholder*="Search products"]', "Red");
  await page.waitForSelector('text=Red T-Shirt');
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/search\?q=Red/i);
});
