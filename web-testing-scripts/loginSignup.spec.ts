import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';


// Note: this is not necessarily executable; the actual Reddit prompts the user to enter a CAPTCHA or select from a set of images
// which is not possible to automate (Or at least not easily).
// This is just a demonstration of how the tests would look like in our case.
test('signup', async ({ page }) => {
  // SIGN UP
  await page.goto('https://www.reddit.com/register/');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill(dummyLib.userB.username);
  await page.getByRole('button', { name: 'Continue' }).click();
  // await page.locator('input[name="username"]').click(); // If we choose to change the auto-generated username
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userB.password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Man', exact: true }).click();
  await page.getByRole('checkbox', { name: 'ChatGPT' }).first().click();
  await page.getByRole('button', { name: 'Continue' }).click();
});



test('login-logout', async ({ page }) => {
  // LOG IN
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  
  // Assertion: Check if logged in by verifying some element that only appears when logged in
  const loggedInElement = await page.getByRole('button', { name: 'User Avatar Expand user menu' });
  expect(loggedInElement).not.toBeNull();

  // LOG OUT
  await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
  await page.locator('#logout-list-item div').click();

  // Assertion: Check if logged out by verifying some element that appears when logged out
  const loggedOutElement = await page.getByRole('button', { name: 'Log In' });
  expect(loggedOutElement).not.toBeNull();
});

