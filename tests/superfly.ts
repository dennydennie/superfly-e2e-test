import { Page } from "@playwright/test";

export class SuperflyPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://superfly.aero/");
  }

  async clickLoginLink() {
    await this.page.getByRole("navigation").getByText("LOGIN").click();
  }

  async clickSignupLink() {
    await this.page.getByRole("navigation").getByText("SIGNUP").click();
  }

  async clickContactLink() {
    await this.page.getByRole("link", { name: "Contact" }).click();
  }

  async clickFindFlightsLink() {
    await this.page.getByRole("navigation").getByText("FIND FLIGHTS").click();
  }

  async clickAboutLink() {
    await this.page.getByRole("navigation").getByText("ABOUT").click();
  }

  async getSuperflyLogoSrc() {
    return await this.page
      .getByRole("img", { name: "logo" })
      .getAttribute("src");
  }

  async clickFacebookLink() {
    await this.page.locator("#content-wrap").getByRole("link").nth(1).click();
  }

  async clickInstagramLink() {
    await this.page.locator("#content-wrap").getByRole("link").nth(0).click();
  }
}
