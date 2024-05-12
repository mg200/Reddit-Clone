import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test.beforeEach('Log in', async ({ page }) => {
    await page.setViewportSize({width: 1366, height: 720});
    await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    
    // Enter the correct email-password combination
    await page.getByLabel('Password *').click();
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    await page.getByTestId('login-btn').click();

    // Assertion: Check if logged in by verifying some element that only appears when logged in
    const loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
  });

//  SEARCH TESTS
test('Search by username', async ({ page }) => {
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.userB.username);
    await page.getByRole('link', { name: 'All results for ' + dummyLib.userB.username }).click();
    await page.getByRole('tab', { name: 'Users' }).click();
    await page.getByRole('link', { name: dummyLib.userB.username + ' u/' + dummyLib.userB.username + ' Karma:' }).click(); 
    const AssertionElement = await page.getByRole('heading', { name: 'u/' + dummyLib.userB.username });
    expect(AssertionElement).not.toBeNull();
});

test ('Search by subreddit', async ({ page }) => {
    await page.getByRole('link', { name: 'Create a community' }).click();
    await page.getByLabel('Name').fill(dummyLib.search_test_data.subreddit);
    await page.getByTestId('PublicIcon').click();
    await page.getByRole('button', { name: 'Create t/' + dummyLib.search_test_data.subreddit }).click();
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.subreddit);
    await page.getByRole('link', { name: 'icon t/' + dummyLib.search_test_data.subreddit }).click();
    await page.getByRole('heading', { name: 't/' + dummyLib.search_test_data.subreddit }).click();
    const AssertionElement = await page.getByRole('heading', { name: dummyLib.search_test_data.subreddit });
    expect(AssertionElement).not.toBeNull();
});

test('Search by post', async ({ page }) => {
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('tab', { name: 'Post' }).click();
    await page.locator('#community-dropdown').selectOption('username');
    await page.getByTestId('title').click();
    await page.getByTestId('title').fill(dummyLib.search_test_data.post_title);
    await page.getByTestId('text').click();
    await page.getByTestId('text').fill(dummyLib.search_test_data.post_content);
    await page.getByTestId('post').click();

    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.post_title);
    await page.getByPlaceholder('Search…').press('Enter');
    await page.getByRole('tab', { name: 'Posts' }).click();
    await page.getByRole('link', { name: dummyLib.search_test_data.post_title }).nth(0).click();
    await page.getByRole('link', { name: dummyLib.search_test_data.post_title }).click();
    const AssertionElement = await page.getByRole('heading', { name: dummyLib.search_test_data.post_title });
    expect(AssertionElement).not.toBeNull();
});


test ('Search by comment', async ({ page }) => {
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('tab', { name: 'Post' }).click();
    await page.locator('#community-dropdown').selectOption('username');
    await page.getByTestId('title').click();
    await page.getByTestId('title').fill(dummyLib.search_test_data.post_title_2);
    await page.getByTestId('text').click();
    await page.getByTestId('text').fill(dummyLib.search_test_data.post_content_2);
    await page.getByTestId('post').click();
    await page.getByText('Add a comment').click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill(dummyLib.search_test_data.comment_2);
    await page.getByRole('button', { name: 'Comment' }).click();
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.comment_2);
    await page.getByPlaceholder('Search…').press('Enter');
    await page.getByRole('tab', { name: 'Comments' }).click();
    const AssertionElement = await page.getByText(dummyLib.search_test_data.comment_2);
    expect(AssertionElement).not.toBeNull();
});

test('Search by invalid search term', async ({ page }) => {
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.invalid_search_term);
    await page.getByPlaceholder('Search…').press('Enter');
    let AssertionElement =  await page.getByRole('heading', { name: 'Search Results for "invalid' });
    expect(AssertionElement).not.toBeNull();
    AssertionElement =  await page.getByRole('heading', { name: 'No users found' });
    expect(AssertionElement).not.toBeNull();
    await page.getByRole('tab', { name: 'Communities' }).click();
    AssertionElement = await page.getByRole('heading', { name: 'No communities found' });
    expect(AssertionElement).not.toBeNull();
    await page.getByRole('tab', { name: 'Media' }).click();
    AssertionElement = await page.getByRole('heading', { name: 'No Media found' });
    expect(AssertionElement).not.toBeNull();
    await page.getByRole('tab', { name: 'Comments' }).click();
    AssertionElement = await page.getByRole('heading', { name: 'No Comments found' });
    expect(AssertionElement).not.toBeNull();
    await page.getByRole('tab', { name: 'Posts' }).click();
    AssertionElement = await page.getByRole('heading', { name: 'No Posts found' });
    expect(AssertionElement).not.toBeNull();
});

// This case is not handled in the code, neither is the case of whitespace search term
test('Search by empty search term', async ({ page }) => {
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').press('Enter');
    let AssertionElement =  await page.getByRole('heading', { name: 'Search Results for ""' });
    expect(AssertionElement).not.toBeNull();
    AssertionElement =  await page.getByRole('heading', { name: 'No users found' });
    expect(AssertionElement).not.toBeNull();
});




