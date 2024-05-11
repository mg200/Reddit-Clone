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
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.username);
    await page.getByRole('link', { name: 'All results for ' + dummyLib.search_test_data.username }).click();
    await page.getByRole('tab', { name: 'Users' }).click();
    await page.getByRole('link', { name: dummyLib.search_test_data.username + ' u/' + dummyLib.search_test_data.username + ' Karma:' }).click(); 
    const AssertionElement = await page.getByRole('heading', { name: 'u/' + dummyLib.search_test_data.username });
    expect(AssertionElement).not.toBeNull();
});

test ('Search by subreddit', async ({ page }) => {
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.subreddit);
    await page.getByRole('link', { name: 'icon t/' + dummyLib.search_test_data.subreddit }).click();
    await page.getByRole('heading', { name: 't/' + dummyLib.search_test_data.subreddit }).click();
    const AssertionElement = await page.getByRole('heading', { name: dummyLib.search_test_data.subreddit });
    expect(AssertionElement).not.toBeNull();
});

test('Search by post', async ({ page }) => {
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.post_title);
    await page.getByPlaceholder('Search…').press('Enter');
    await page.getByRole('tab', { name: 'Posts' }).click();
    // await page.getByRole('link', { name: dummyLib.search_test_data.post_title }).first().click(); // equivalent to the next line
    await page.getByRole('link', { name: dummyLib.search_test_data.post_title }).nth(0).click();
    await page.getByRole('link', { name: dummyLib.search_test_data.post_title }).click();
    const AssertionElement = await page.getByRole('heading', { name: dummyLib.search_test_data.post_title });
    expect(AssertionElement).not.toBeNull();
});


test ('Search by comment', async ({ page }) => {
    await page.getByPlaceholder('Search…').click();
    await page.getByPlaceholder('Search…').fill(dummyLib.search_test_data.comment);
    await page.getByPlaceholder('Search…').press('Enter');
    await page.getByRole('tab', { name: 'Comments' }).click();
    const AssertionElement = await page.getByText(dummyLib.search_test_data.comment);
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
// test('Search by empty search term', async ({ page }) => {
//     await page.getByPlaceholder('Search…').click();
//     await page.getByPlaceholder('Search…').press('Enter');
//     let AssertionElement =  await page.getByRole('heading', { name: 'Search Results for ""' });
//     expect(AssertionElement).not.toBeNull();
//     AssertionElement =  await page.getByRole('heading', { name: 'No users found' });
//     expect(AssertionElement).not.toBeNull();
// });


// test('Copy Link', async ({ page }) => {
//     await page.locator('.share').first().click();
//     // await page.locator('div:nth-child(3) > .post-container > .post-buttons > .share > .share-button').click(); // This works as well
//     await page.getByRole('button', { name: 'Copy Link' }).click();
//     const AssertionElement = await page.getByText('Link copied to clipboard').click();
//     expect(AssertionElement).not.toBeNull();
// });

