import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test vehicles page', async ({ page }) => {
  await page.goto('http://localhost:5173/topvehicles');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(content, ['Updated', 'Vehicle / Class', 'Active', 'Hours'], 'vehicles page');
});
