import { Page } from "@playwright/test";
import { SearchPage } from "./search-page";

export class ConfirmPage {
  readonly page: Page;

  constructor(page) {
    this.page = page;
  }

  async gotoConfirmPage() {
    const searchpage = new SearchPage(this.page);
    searchpage.gotoSearchPage();
    searchpage.clickBookNowButton();
  }
}
