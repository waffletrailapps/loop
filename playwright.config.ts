import { defineConfig } from '@playwright/test';
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config(); // Load environment variables

export default defineConfig({
  reporter: [['html', { outputFolder: 'test-results/report', open: 'never' }]],
  outputDir: 'test-results/', // Ensures all test artifacts go here

  use: {
    browserName: "chromium",
    headless: true,
    screenshot: "on",
    baseURL: process.env.BASE_URL,
    storageState: fs.existsSync("storageState.json") ? "storageState.json" : undefined,
    trace: 'on', 
  }
});
