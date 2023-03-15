import { test, expect } from "@playwright/test";
import moment from "moment";
import { SuperflyPage } from "./superfly.spec";

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
    await expect(await superfly.getSuperflyLogoSrc()).toBe("/images/logo_black.png");
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

  test("Search for flights", async ({ page }) => {
    test.setTimeout(30000);

    await page.getByRole("combobox").first().selectOption("Harare Domestic");
    await page.getByRole("combobox").nth(1).selectOption("Chikwenya");
    await page.getByText("1 Adult").click();
    await page
      .getByRole("tooltip", { name: "Adults 1 Children 0-12 years 0" })
      .getByRole("button")
      .nth(1)
      .click();

    const departDate = moment(new Date())
      .add(1, "day")
      .format("dddd, MMMM Do, YYYY");

    const returnDate = moment().add(1, "month").format("dddd, MMMM Do, YYYY");

    await page.locator("span").filter({ hasText: "Depart" }).click();

    await page.getByRole("option", { name: `Choose ${departDate}` }).click();

    await page.getByRole("button", { name: "Next Month" }).click();

    await page.getByRole("option", { name: `Choose ${returnDate}` }).click();

    await page.getByRole("button", { name: "Search" }).click();

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
