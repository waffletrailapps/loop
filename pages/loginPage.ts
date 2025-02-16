import { Page } from "@playwright/test";
import { ENV } from "../config/env";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    if (!ENV.BASE_URL) {
      throw new Error("BASE_URL is not defined in environment variables.");
    }
    await this.page.goto(ENV.BASE_URL);
  }

  async login() {
    if (!ENV.ADMIN_EMAIL || !ENV.ADMIN_PASSWORD) {
      throw new Error("Login credentials are not defined in environment variables.");
    }

    await this.page.getByRole("textbox", { name: "Username" }).fill(ENV.ADMIN_EMAIL);
    await this.page.getByRole("textbox", { name: "Password" }).fill(ENV.ADMIN_PASSWORD);
    await this.page.getByRole("button", { name: "Sign in" }).click();
  }

  getPage(): Page {
    return this.page;
  }
}
