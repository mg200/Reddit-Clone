import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

let communityName = 'threaditTest__1';

test('userA creates Community', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByText('Create a community').click();
  await page.getByLabel('*').click();
  await page.getByLabel('*').fill(communityName);
  await page.getByTestId('submit-button').click();
  // Assertion: Check if the community is created
  const communityTitle = await page.getByText(communityName);
  expect(communityTitle).not.toBeNull();
});

test ('userB joins the created Community', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userB.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userB.password);
  await page.getByRole('button', { name: 'Log In' }).click();

  const loggedInElement = await page.getByRole('button', { name: 'User Avatar Expand user menu' });
  expect(loggedInElement).not.toBeNull();
  
  await page.waitForLoadState();
  
  await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().click();
  await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().fill('r/' + communityName);
  await page.locator('input[type="text"][name="q"][placeholder="Search Reddit"]').first().press('Enter');
  await page.getByTestId('search-community').getByLabel('r/' + communityName).click();
  await page.getByRole('button', { name: 'Join' }).click();
  await page.getByRole('button', { name: 'Join' }).click();
  const joinedCommunity = await page.getByRole('button', { name: 'Joined' });
  expect(joinedCommunity).not.toBeNull();
});

test ('userA posts in the Community', async ({ page }) => {
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();

  const loggedInElement = await page.getByRole('button', { name: 'User Avatar Expand user menu' });
  if (!loggedInElement) {
    throw new Error('User is not logged in');
  }

  await page.waitForLoadState();
  
  await page.locator('input[type="text"][placeholder="Search Reddit"]').first().click();
  await page.locator('input[type="text"][placeholder="Search Reddit"]').first().fill('r/' + communityName);
  await page.locator('input[type="text"][placeholder="Search Reddit"]').first().press('Enter');
  await page.getByTestId('search-community').getByLabel('r/' + communityName).click();
  await page.getByRole('link', { name: 'Create Create post' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('This is a test post');
  // await page.locator('textarea.PqYQ3WC15KaceZuKcFI02._1ec_Oj5SWdypd8L-VELKg-[placeholder="Title"]').click();
  // await page.locator('textarea.PqYQ3WC15KaceZuKcFI02._1ec_Oj5SWdypd8L-VELKg-[placeholder="Title"]').fill('test post title');
  
  // await page.getByRole('button', { name: 'Post' }).click(); // this is the old locator; it is not working 
  // post button locator
  await page.locator('button.Z1w8VkpQ23E1Wdq_My3U4.j1Q89sB76i7EBRDhnQhlr').click();

  const postTitle = await page.getByRole('heading', { name: 'This is a test post' });
  expect(postTitle).not.toBeNull();

});

