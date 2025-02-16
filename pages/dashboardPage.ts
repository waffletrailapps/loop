import { Page, expect, test } from "@playwright/test";
import { DashboardPageLocators } from "../locators/dashboardPageLocators";
import fs from "fs";
import sharp from "sharp"; 

/**
 * Represents the Dashboard Page and provides methods for interacting
 * with elements on the page.
 */
export class DashboardPage {
  private page: Page;

  /**
   * Initializes the DashboardPage with a given Playwright Page object.
   * @param {Page} page - The Playwright Page instance.
   */
  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to a specific application on the dashboard.
   * @param {string} appName - The name of the application to navigate to.
   */
  async navigateToApp(appName: string) {
    await this.page.click(`text=${appName}`);
  }

  /**
   * Verifies that a specific task is located in the expected column.
   * Takes a screenshot highlighting the located task.
   * @param {string} taskName - The name of the task to verify.
   * @param {string} columnName - The expected column where the task should be located.
   */
  async verifyTaskInColumn(taskName: string, columnName: string) {
    const columnLocator = this.page.locator(DashboardPageLocators.column(columnName));
    const taskLocator = columnLocator.locator(DashboardPageLocators.task(taskName));

    await expect(columnLocator).toBeVisible();
    await expect(taskLocator).toBeVisible();

    // 📸 Capture a screenshot of the located task
    await this.captureScreenshot(taskLocator, `task_${taskName.replace(/\s/g, "_")}.png`);
  }

  /**
   * Confirms that a task has the correct associated tags and captures screenshots.
   * @param {string} taskName - The name of the task whose tags need verification.
   * @param {Array<string>} expectedTags - The expected tags for the task.
   */
  async confirmTags(taskName: string, expectedTags: string[]) {
    const tagSection = this.page.locator(DashboardPageLocators.taskTagSection(taskName));

    await expect(tagSection).toBeVisible(); // Ensure the tag section exists

    for (const tag of expectedTags) {
      const tagLocator = this.page.locator(DashboardPageLocators.taskTag(taskName, tag));
      await expect(tagLocator).toBeVisible();

      // 📸 Capture screenshot highlighting the tag
      await this.captureScreenshot(tagLocator, `tag_${taskName.replace(/\s/g, "_")}_${tag}.png`);
    }
  }

  /**
   * Captures a screenshot of a given element and highlights it within the image.
   * @param {any} locator - The Playwright locator for the element to capture.
   * @param {string} fileName - The name of the file where the screenshot will be saved.
   */
  async captureScreenshot(locator: any, fileName: string) {
    const screenshotDir = "test-results/screenshots";
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }

    // 📸 Capture full-page screenshot
    const fullScreenshotPath = `${screenshotDir}/full_${fileName}`;
    await this.page.screenshot({ path: fullScreenshotPath });

    // 📍 Get the bounding box of the element
    const box = await locator.boundingBox();
    if (!box) {
      console.error("Bounding box not found for locator:", locator);
      return;
    }

    // 🖼 Load the full screenshot and draw a rectangle around the element
    const highlightedScreenshotPath = `${screenshotDir}/${fileName}`;
    await sharp(fullScreenshotPath)
      .composite([
        {
          input: Buffer.from(
            `<svg width="${box.width}" height="${box.height}">
                <rect x="0" y="0" width="${box.width}" height="${box.height}" 
                fill="none" stroke="red" stroke-width="5"/>
            </svg>`
          ),
          top: Math.round(box.y),
          left: Math.round(box.x),
        },
      ])
      .toFile(highlightedScreenshotPath);

    // ✅ Attach the highlighted screenshot to Playwright's test report
    test.info().attach(fileName, {
      path: highlightedScreenshotPath,
      contentType: "image/png",
    });
  }
}
