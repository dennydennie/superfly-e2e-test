import { test, expect } from "@playwright/test";
import moment from "moment";
import { SuperflyPage } from "./superfly";
import { SearchPage } from "./search-page";

let superfly: SuperflyPage;

test.describe("Superfly Navigation", async () => {
  test.beforeEach(async ({ page }) => {
    superfly = new SuperflyPage(page);
    await superfly.goto();
  });

  test("Clicking the login link should open Superfly login page", async () => {
    await superfly.clickLoginLink();
    await expect(superfly.page).toHaveURL("https://superfly.aero/login");
  });

  test("Clicking the signup link should open Superfly signup page", async () => {
    await superfly.clickSignupLink();
    await expect(superfly.page).toHaveURL("https://superfly.aero/signup");
  });

  test("Clicking contact link should open Superfly contact us page", async () => {
    await superfly.clickContactLink();
    await expect(superfly.page).toHaveURL("https://superfly.aero/contact");
  });

  test("Clicking the find flights link should open Superfly find flights page", async () => {
    await superfly.clickFindFlightsLink();
    await expect(superfly.page).toHaveURL("https://superfly.aero");
  });

  test("Clicking the about link should open Superfly about page", async () => {
    await superfly.clickAboutLink();
    await expect(superfly.page).toHaveURL("https://superfly.aero/about");
  });

  test("superfly logo", async () => {
    await expect(await superfly.getSuperflyLogoSrc()).toBe(
      "/images/logo_black.png"
    );
  });

  test("Clicking Facebook icon should open Superfly Facebook page", async () => {
    await superfly.clickFacebookLink();
    await expect(superfly.page).toHaveURL(
      "https://www.facebook.com/SuperFly.Aero"
    );
  });

  test("Clicking Instagram icon should open Superfly Instagram page", async () => {
    await superfly.clickInstagramLink();
    await expect(superfly.page).toHaveURL(
      "https://www.instagram.com/superfly.aero/"
    );
  });
});

test.describe("Search for flights", async () => {
  test.beforeEach(async ({ page }) => {
    superfly = new SuperflyPage(page);
    await superfly.goto();
  });

  test.only("Search for flights", async ({ page }) => {
    test.setTimeout(30000);

    const searchPage = new SearchPage(page);

    await searchPage.selectDepartureAirport("Harare Domestic");
    await searchPage.selectDestinationAirport("Chikwenya");
    await searchPage.selectPassengers();

    const departDate = moment(new Date())
      .add(1, "day")
      .format("dddd, MMMM Do, YYYY");
    const returnDate = moment().add(1, "month").format("dddd, MMMM Do, YYYY");

    await searchPage.selectDepartureDate(departDate);
    await searchPage.selectReturnDate(returnDate);
    await searchPage.clickSearchButton();

    await expect(page).toHaveURL("https://superfly.aero/search");
  });
});

test.describe("Footer", async () => {
  test.beforeEach(async ({ page }) => {
    superfly = new SuperflyPage(page);
    await superfly.goto();
  });

  test("Clicking the privacy policy link should open Superfly privacy policy page", async ({
    page,
  }) => {
    await page.click("text=Privacy Policy");

    await expect(page).toHaveURL("https://superfly.aero/privacy-policy");
  });

  test("Clicking the terms and conditions link should open terms and conditions page", async ({
    page,
  }) => {
    await page.click("text=Terms and Conditions");

    await expect(page).toHaveURL("https://superfly.aero/terms-and-conditions");
  });

  test("Clicking the Superfly text should not open any link", async ({
    page,
  }) => {
    await page.click("text=© 2022 SuperFly");

    await expect(page).toHaveURL("https://superfly.aero/");
  });
});
