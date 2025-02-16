import { test, expect } from "./fixtures";

test.describe("Login Tests", () => {
  test("Admin should log in successfully", async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login();

    const page = loginPage.getPage(); 

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator("text=Welcome")).toBeVisible();
  });
});
