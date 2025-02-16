import { test as base } from "@playwright/test";
import { LoginPage } from "@pages/loginPage";
import { DashboardPage } from "@pages/dashboardPage";

export const test = base.extend<{
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  }
});

export { expect } from "@playwright/test";
