import { test, expect } from "./fixtures";
import { readCSV } from "../utils/csvHelper";

/**
 * Reads test cases from a CSV file to perform data-driven testing
 * on a web and mobile application board.
 */
const testCases = readCSV("data/projectBoardTestData.csv");

/**
 * Test suite for verifying task placement and attributes
 * within a project board application for different app types.
 */
test.describe("Data-Driven Testing for Web & Mobile Application Board", () => {
  
  /**
   * Before each test, navigate to the login page and authenticate the user.
   * @param {Object} loginPage - The login page object providing navigation and authentication methods.
   */
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login();
  });

  /**
   * Iterates through test cases retrieved from the CSV file,
   * verifying that specific tasks appear in the correct columns
   * with the appropriate tags for each application type.
   */
  for (const { appType, appName, taskName, columnName, tags } of testCases) {
    test(`[${appType}] Verify '${taskName}' is in '${columnName}' with correct tags`, async ({ dashboardPage }) => {
      /**
       * Navigates to the specified application within the project board.
       * @param {string} appName - The name of the application to navigate to.
       */
      await dashboardPage.navigateToApp(appName);
      
      /**
       * Verifies that the given task is located in the expected column.
       * @param {string} taskName - The name of the task to verify.
       * @param {string} columnName - The expected column where the task should be located.
       */
      await dashboardPage.verifyTaskInColumn(taskName, columnName);
      
      /**
       * Confirms that the task has the correct associated tags.
       * @param {string} taskName - The name of the task whose tags need verification.
       * @param {Array<string>} tags - The expected tags for the task.
       */
      await dashboardPage.confirmTags(taskName, tags);
    });
  }
});