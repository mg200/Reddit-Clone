import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test('Recent Posts', async ({page }) => {
    await page.setViewportSize({ width: 2000, height: 1500 });    
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

    await page.getByRole('button', { name: 'Create' }).click();
    await page.locator('#community-dropdown').selectOption('testingGang');
    await page.getByTestId('title').click();
    await page.getByTestId('title').fill('Testing Recent posts');
    await page.getByTestId('text').click();
    await page.getByTestId('text').fill('RecentText');
    await page.getByTestId('post').click();
    await page.getByLabel('upvote').click();

    await page.getByTestId('home-nav').click();
    expect(await page.getByRole('heading', { name: 'RECENT POSTS' })).not.toBeNull();
    expect(await page.getByText('Testing Recent posts')).not.toBeNull();
    expect(await page.getByText('upvotes: 1').nth(2)).not.toBeNull();
    expect(await page.getByText('comments: 0').nth(2)).not.toBeNull();
    
    // await page.getByTestId('home-nav').click();
    await page.getByText('Testing Recent posts').click();
    await page.locator('#postcontainer').getByRole('button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.getByTestId('home-nav').click();
    expect(await page.getByText('Testing Recent posts')).not.toBeNull();

});


test('feed', async ({ page }) => {
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

    
    await page.getByRole('link', { name: 'Let\'s create first post!🤯' }).click();
    expect(await page.getByRole('link', { name: '16' })).not.toBeNull();
    await page.getByText('Add a comment').click();
    await page.locator('textarea').click();
    await page.locator('textarea').fill('I am commenting in Flutter Community');
    await page.getByRole('button', { name: 'Comment' }).click();
    expect(await page.getByRole('link', { name: 'I am commenting in Flutter' })).not.toBeNull();
    await page.getByRole('button', { name: 'account of current user' }).click();
    await page.getByTestId('profile-nav').click();
    await page.getByRole('tab', { name: 'Comments' }).click();
    expect(await page.getByRole('link', { name: 'I am commenting in Flutter Community' })).not.toBeNull();
    await page.getByTestId('home-nav').click();
    expect(await page.getByRole('link', { name: '17' })).not.toBeNull();
});

test('Sort Options', async ({ page }) => {
    await page.getByRole('link', { name: 'Let\'s create first post!🤯' }).click();
    await page.getByRole('button', { name: 'best' }).click();
    await page.getByRole('link', { name: 'Hot' }).click();
    await page.getByRole('link', { name: 'Interesting Post!!!' }).click();
    await page.getByRole('button', { name: 'best' }).click();

    await page.getByRole('link', { name: 'New' }).click();
    await page.getByText('/10/2024, 08:28 PM').click();
    await page.getByText('/10/2024, 07:23 PM').click();
    await page.getByRole('button', { name: 'new', exact: true }).click();
    await page.getByRole('link', { name: 'Top', exact: true }).click();
    await page.getByRole('link', { name: 'WALA DARWISSSSSH' }).click();
    await page.getByRole('button', { name: 'best' }).click();
    await page.getByRole('link', { name: 'New' }).click();
    await page.getByRole('button', { name: 'new', exact: true }).click();
    await page.getByRole('link', { name: 'phase 4 post testing' }).click();

    await page.getByRole('button', { name: 'best' }).click();
    await page.getByRole('link', { name: 'Best', exact: true }).click();
    expect(await page.getByRole('link', { name: 'Let\'s create first post!🤯' })).not.toBeNull();
    
    await page.getByRole('button', { name: 'best' }).click();
    await page.getByRole('link', { name: 'Hot' }).click();
    await page.getByRole('link', { name: 'image' }).click();
});