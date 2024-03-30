import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

// Note: running this test will require the user to have a chat request from userB in the first place

test('chat request acceptance notification', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Open inbox' }).click();

  // Assertion: Check if the notification is present
  const notification = await page.getByText(dummyLib.userB.username + ' accepted your chat invite!');
  expect(notification).not.toBeNull();
});


test('chat request rejection notification', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: 'Open inbox' }).click();

  // Assertion: Check if the notification is present
  const notification = await page.getByText(dummyLib.userB.username + ' rejected your chat invite!');
  expect(notification).not.toBeNull();
});


test('message notifications for starting a reddit community and for the post replies', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.goto('https://www.reddit.com');
  await page.getByRole('button', { name: 'Open inbox' }).click();
  await page.getByRole('link', { name: 'Messages' }).click();
  await page.goto('https://www.reddit.com/message/messages');

  // Assertions: Check if the notifications messages are present
  const communityCreationNotificationMessage = await page.frameLocator('#AppRouter-main-content iframe').getByText('You started a Reddit');
  expect(communityCreationNotificationMessage).not.toBeNull();

  await page.frameLocator('#AppRouter-main-content iframe').getByRole('link', { name: 'post replies' }).click();

  const postReplyNotificationMessage = await page.frameLocator('#AppRouter-main-content iframe').getByRole('link', { name: 'E2E 2nd test post' });
  expect(postReplyNotificationMessage).not.toBeNull();
});

