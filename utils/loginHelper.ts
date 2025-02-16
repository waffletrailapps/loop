import { Page, BrowserContext } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config();

const STORAGE_STATE_PATH = 'storageState.json';

export async function loginWithSession(context: BrowserContext, page: Page) {
  if (fs.existsSync(STORAGE_STATE_PATH)) {
    await context.addInitScript(STORAGE_STATE_PATH);
    return;
  }

  console.log('🔐 Storage state not found. Logging in manually...');
  await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
  await page.fill('input[name="email"]', process.env.ADMIN_EMAIL!);
  await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD!);
  await page.click('button[type="submit"]');

  // Wait for login
  await page.waitForURL('**/dashboard', { timeout: 5000 });

  // Save storage state
  await context.storageState({ path: STORAGE_STATE_PATH });
  console.log('✅ Storage state saved successfully.');
}
