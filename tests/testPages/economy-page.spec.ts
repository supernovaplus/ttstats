import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test economy', async ({ page }) => {
  await page.goto('http://localhost:5173/economy');
  await page.waitForTimeout(1000);
  const content = await page.content();
  testingFindText(content, ['Date', 'Mil', 'Updated', '2023'], 'economy');
});
