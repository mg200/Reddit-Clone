import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test('User Submission and Commenting', async ({ page, browser }) => {
  // User A logs in
  await page.goto('https://www.reddit.com');
  await page.getByRole('link', { name: 'Log In' }).click();
  await page.locator('input[name="username"]').click();
  await page.locator('input[name="username"]').fill(dummyLib.userA.username);
  await page.locator('input[name="password"]').click();
  await page.locator('input[name="password"]').fill(dummyLib.userA.password);
  await page.getByRole('button', { name: 'Log In' }).click();

  // User A creates a post
  
  await page.getByRole('link', { name: 'Create Create post' }).click();
  await page.goto('https://www.reddit.com/r/threadit/comments/1bnv6s2/e2e_3rd_test_post/');
  
  // User A verifies the post
  const postTitle = await page.getByRole('heading', { name: 'E2E 3rd test post' });
  expect(postTitle).not.toBeNull();


  // User B logs in from a new browser context
  const newContext = await browser.newContext();
  const newpage = await newContext.newPage();
  await newpage.goto('https://www.reddit.com');
  await newpage.getByRole('link', { name: 'Log In' }).click();
  await newpage.locator('input[name="username"]').click();
  await newpage.locator('input[name="username"]').fill(dummyLib.userB.username);
  await newpage.locator('input[name="password"]').click();
  await newpage.locator('input[name="password"]').fill(dummyLib.userB.password);
  await newpage.getByRole('button', { name: 'Log In' }).click();

  
  // User B finds the post
  await newpage.goto('https://www.reddit.com/r/threadit');
  const postLink = await newpage.getByText('E2E 3rd test post', { exact: true });
  expect(postLink).not.toBeNull();

  // User B upvotes the post and comments on it
  // await newpage.getByRole('button', { name: 'Upvote' }).click();
  
  await newpage.getByRole('link', { name: 'comments' }).click();
  await newpage.getByRole('button', { name: 'Add a comment' }).click();
  await newpage.locator('#main-content').getByRole('textbox').fill('dummy comment');
  await newpage.getByRole('button', { name: 'Comment', exact: true }).click();

  
  // user A upvotes the comment

  await page.goto('https://www.reddit.com/r/threadit/comments/1bnv6s2/e2e_3rd_test_post/');
  await page.locator('#comment-tree').getByRole('button', { name: 'Upvote' }).click();


  await page.getByRole('button', { name: 'Reply reply' }).click();
  await page.locator('#comment-tree').getByRole('textbox').fill('dummy reply');
  await page.getByRole('button', { name: 'Comment', exact: true }).click();
});