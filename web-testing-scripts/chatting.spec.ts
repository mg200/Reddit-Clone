import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test('UserA chats with B', async ({page, browser}) => {

  // User A logs in
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();

  const loggedInElement_A = await page.getByRole('button', { name: 'User Avatar Expand user menu' });
  expect(loggedInElement_A).not.toBeNull();

  await page.waitForLoadState();

    // User A searches for user B and sends a message
  await page.waitForSelector('input[type="text"][name="q"][placeholder="Search Reddit"]');
  await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().click();
  // await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().click();
  await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().fill('u/' + dummyLib.userB.username);
  await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().press('Enter');

  await page.getByRole('link', { name: 'u/' + dummyLib.userB.username }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByLabel('Open chat').click();
  const page1 = await page1Promise;
  await page1.getByPlaceholder('Message').click();
  await page1.getByPlaceholder('Message').fill('Hello, this is my first test message!');
  await page1.getByPlaceholder('Message').fill('How are you doing?');


  // User B logs in from a new browser context
  const newContext = await browser.newContext();
  const pageB = await newContext.newPage();
  await pageB.goto('https://www.reddit.com');
  await pageB.getByRole('link', { name: 'Log In' }).click();
  await pageB.locator('input[name="username"]').click();
  await pageB.locator('input[name="username"]').fill(dummyLib.userB.username);
  await pageB.locator('input[name="password"]').click();
  await pageB.locator('input[name="password"]').fill(dummyLib.userB.password);
  await pageB.getByRole('button', { name: 'Log In' }).click();

  const loggedInElement_B = await pageB.getByRole('button', { name: 'User Avatar Expand user menu' });
  expect(loggedInElement_B).not.toBeNull();



  // User B accepts the chat invite and replies
  
  const pageB1Promise = pageB.waitForEvent('popup');
  await pageB.getByRole('link', { name: 'Open chat' }).click();
  const pageB1 = await pageB1Promise;
  await pageB1.goto('https://chat.reddit.com/');
  await pageB1.getByText('Requests 1').click();
  await pageB1.getByRole('link', { name: 'User Avatar ' + dummyLib.userA.username }).click();
  await pageB1.getByRole('button', { name: 'Accept' }).click();
  await pageB1.getByPlaceholder('Message').fill('Good, thank you! How about you?');
  await pageB1.getByPlaceholder('Message').fill('Have a nice testing!!');
  await pageB1.getByPlaceholder('Message').fill('Bye for now!');


  // User A sees the reply in the notification
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