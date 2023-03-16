import { expect, test } from "@playwright/test";
import { ConfirmPage } from "./confirm";
import { Page } from "@playwright/test";
{
}

let confirmPage: ConfirmPage;

test.describe("Confirm and pay", async () => {
  test.beforeEach(async ({ page }) => {
    confirmPage = new ConfirmPage(page);
    await confirmPage.gotoConfirmPage();
  });

  test("fill out passenger details", async ({ page }) => {
    test.setTimeout(60000);

    await page.getByLabel("Depart Time").selectOption("1678948200");
    await page.getByLabel("Return Time").selectOption("1678955400");

    await page
      .getByPlaceholder("Email Address")
      .fill("dennismarumahoko@gmail.com");
    await page
      .getByRole("combobox", { name: "Phone number country" })
      .selectOption("Zimbabwe (+263)");
    await page.getByPlaceholder("Phone Number").fill("0772 123 456");
    await page.getByRole("textbox", { name: "fullName0" }).fill("Dennis");
    await page
      .getByRole("textbox", { name: "passportNumber0" })
      .fill("123456789");
    await page.getByRole("spinbutton", { name: "bags0" }).fill("1");
    await page.getByRole("spinbutton", { name: "weight0" }).fill("10");

    await page.getByRole("textbox", { name: "fullName1" }).fill("Tinashe");
    await page
      .getByRole("textbox", { name: "passportNumber1" })
      .fill("123456789");
    await page.getByRole("spinbutton", { name: "bags1" }).fill("1");
    await page.getByRole("spinbutton", { name: "weight1" }).fill("10");
  });
});
