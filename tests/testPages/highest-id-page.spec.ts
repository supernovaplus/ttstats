import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test highest id', async ({ page }) => {
  await page.goto('http://localhost:5173/highest_id');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(content, ['#1', 'Name'], 'highest id');
});
