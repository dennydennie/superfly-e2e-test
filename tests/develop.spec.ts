import { test, expect } from "@playwright/test";
import moment from "moment";

test.describe("", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://develop.superfly.aero/");
  });

  test.describe("Should test craft images", async () => {
    test("Take Screenshot of the home page", async ({ page }) => {
      await page.screenshot({ path: getScreenShotName(), fullPage: true });
    });

    test("Should select the first emptyleg", async ({ page }) => {
      await page.locator(".hidden > div > div > div").first().click();
      await expect(page).toHaveURL("https://develop.superfly.aero/empty-leg");
    });

    test("Should take a screen shot of the empty legs page", async ({
      page,
    }) => {
      await page.locator(".hidden > div > div > div").first().click();

      await expect(page).toHaveURL("https://develop.superfly.aero/empty-leg");

      await page.waitForLoadState("networkidle");

      await page.screenshot({ path: getScreenShotName(), fullPage: true });
    });

    test("Should select book now from the empty legs page", async ({
      page,
    }) => {
      await page.locator(".hidden > div > div > div").first().click();

      await expect(page).toHaveURL("https://develop.superfly.aero/empty-leg");

      await page.goto("https://develop.superfly.aero/empty-leg");

      await page.getByRole("button", { name: "BOOK NOW" }).click();

      await page.waitForLoadState("networkidle");

      await expect(page).toHaveURL("https://develop.superfly.aero/confirm");

      await page.screenshot({ path: getScreenShotName(), fullPage: true });
    });
  });
});

function getScreenShotName() {
  const dateTime = moment().format("YYYYMMDDhhmmss");
  const screenshotName = dateTime + "_" + "craft_image.png";
  return screenshotName;
}
