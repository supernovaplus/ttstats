import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test main page / server list', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(
    content,
    ['NY-2 (Beta)', 'Connect', 'skill boost', 'Info', 'DXP'],
    'main page / server list'
  );
});
