import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';
test('userA follows userB', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.goto('https://www.reddit.com');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('u/' + dummyLib.userB.username);
  await page.getByRole('textbox').press('Enter');
  await page.getByRole('link', { name: 'u/' + dummyLib.userB.username }).click();
  await page.getByRole('button', { name: 'Follow' }).click();

    // Assertion: Check if the user is followed
  const Followed = await page.getByRole('button', { name: 'Following' });
  expect(Followed).not.toBeNull();
});