import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test top jobs', async ({ page }) => {
  await page.goto('http://localhost:5173/topjobs');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(content, ['Job', 'Hours', 'Active', '%', 'Updated'], 'top jobs');
});
