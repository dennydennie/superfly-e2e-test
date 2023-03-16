import { Page } from "@playwright/test";
import moment from "moment";
import { SuperflyPage } from "./superfly";

export class SearchPage {
  readonly page: Page;

  constructor(page) {
    this.page = page;
  }

  async gotoSearchPage() {
    const homepage = new SuperflyPage(this.page);
    homepage.goto();

    const departDate = moment(new Date())
      .add(1, "day")
      .format("dddd, MMMM Do, YYYY");
    const returnDate = moment().add(1, "month").format("dddd, MMMM Do, YYYY");

    await this.selectDepartureAirport("Harare Domestic");
    await this.selectDestinationAirport("Chikwenya");
    await this.selectPassengers();
    await this.selectDepartureDate(departDate);
    await this.selectReturnDate(returnDate);
    await this.clickSearchButton();
  }

  async selectDepartureAirport(departDestination) {
    await this.page
      .getByRole("combobox")
      .first()
      .selectOption(departDestination);
  }

  async selectDestinationAirport(arriveDestination) {
    await this.page
      .getByRole("combobox")
      .nth(1)
      .selectOption(arriveDestination);
  }

  async selectPassengers() {
    await this.page.getByText("1 Adult").click();
    await this.page
      .getByRole("tooltip", { name: "Adults 1 Children 0-12 years 0" })
      .getByRole("button")
      .nth(1)
      .click();
  }

  async selectDepartureDate(date: string) {
    await this.page.locator("span").filter({ hasText: "Depart" }).click();
    await this.page.getByRole("option", { name: `Choose ${date}` }).click();
  }

  async selectReturnDate(date: string) {
    await this.page.getByRole("button", { name: "Next Month" }).click();
    await this.page.getByRole("option", { name: `Choose ${date}` }).click();
  }

  async clickSearchButton() {
    await this.page.getByRole("button", { name: "Search" }).click();
  }

  async clickBookNowButton() {
    await this.page.getByRole("button", { name: "BOOK NOW" }).first().click();
  }
}
