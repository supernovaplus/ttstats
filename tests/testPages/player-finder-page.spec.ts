

import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test player finder', async ({ page }) => {
  await page.goto('http://localhost:5173/playerfinder');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(content, ['Job', 'Server', '#1', 'Found', 'Filter Name Or ID'], 'player finder');
});
