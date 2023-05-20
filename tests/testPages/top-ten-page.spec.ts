import { test, expect } from '@playwright/test';
import { testingFindText } from '../../src/controllers/misc.ts';

test('test top 10 main page', async ({ page }) => {
  await page.goto('http://localhost:5173/top10');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(content, ['Select Top 10 Board', 'Completed'], 'top 10');
});

test('test top 10 specific page', async ({ page }) => {
  await page.goto('http://localhost:5173/top10/bus_fares_earned');
  await page.waitForTimeout(1500);
  const content = await page.content();
  testingFindText(content, ['Player', 'Bus Driver: Total Fares', 'Updated'], 'top 10 specific page');
});
