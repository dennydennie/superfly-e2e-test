import { expect, test } from "@playwright/test";
import { SearchPage } from "./search-page";

let searchPage: SearchPage;

test.describe("Search for flights", async () => {
  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    await searchPage.gotoSearchPage();
  });

  test.only("Clicking book now should open confirm page", async ({ page }) => {
    test.setTimeout(60000);

    searchPage.clickBookNowButton();

    await expect(page).toHaveURL("https://superfly.aero/confirm");
  });
});
