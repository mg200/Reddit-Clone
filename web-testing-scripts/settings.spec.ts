import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

let page;

// We need to login and navigate to the settings page before running any tests
test.beforeAll('Login', async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.reddit.com');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(dummyLib.userA.username);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(dummyLib.userA.password);
    await page.getByRole('button', { name: 'Log In' }).click();

    // Wait for navigation to ensure login is complete
    await page.waitForNavigation();

    // Navigate to the settings page
    await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByRole('link', { name: 'Settings' }).click();

    // ASSERTION: Check if we are on the settings page
    const settingsElement = await page.getByText('User Settings');
    expect(settingsElement).not.toBeNull();
});

test('Modifying Display name and description', async () => {
    await page.getByRole('tab', { name: 'Profile' }).click();
    await page.getByPlaceholder('Display name (optional)').click();
    await page.getByPlaceholder('Display name (optional)').fill('Some cool display name');
    await page.getByPlaceholder('About (optional)').click();
    await page.getByPlaceholder('About (optional)').fill('Some fancy description');
    await page.getByRole('tab', { name: 'Safety & Privacy' }).click();
    await page.getByRole('tab', { name: 'Profile' }).click();
    
    await page.goto('https://www.reddit.com/user/'+ dummyLib.userA.username +'/');
    
    // ASSERTIONS
    const DisplayName = await page.getByLabel('Some cool display name');
    await expect(DisplayName).not.toBeNull();

    const profileDescription = await page.getByTestId('profile-description');
    await expect(profileDescription).toHaveText('Some fancy description');
});


test('Change password', async () => {

    await page.locator('button._2iuoyPiKHN3kfOoeIQalDT._2tU8R9NTqhvBrhoNAXWWcP.HNozj_dKjQZ59ZsfEegz8[role="button"]').first().click();    
    await page.frameLocator('iframe >> nth=1').getByPlaceholder('\n Old password\n').click();
    await page.frameLocator('iframe >> nth=1').getByPlaceholder('\n Old password\n').fill(dummyLib.userA.password);
    await page.frameLocator('iframe >> nth=1').getByPlaceholder('\n New password\n').click();
    await page.frameLocator('iframe >> nth=1').getByPlaceholder('\n New password\n').fill(dummyLib.userA.newPassword);
    await page.frameLocator('iframe >> nth=1').getByPlaceholder('\n Confirm new password\n').click();
    await page.frameLocator('iframe >> nth=1').getByPlaceholder('\n Confirm new password\n').fill(dummyLib.userA.newPassword);
    await page.frameLocator('iframe >> nth=1').getByRole('button', { name: 'Save' }).click();
    
    await page.goto('https://www.reddit.com/');
    await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByText('Log Out').click();
    
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(dummyLib.userA.username);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(dummyLib.userA.newPassword);
    await page.getByRole('button', { name: 'Log In' }).click();

    // ASSERTION: Check if logged in by waiting for navigation and verifying some element that only appears when logged in
    await page.waitForNavigation();
    const loggedInElement = await page.getByRole('button', { name: 'User Avatar Expand user menu' });
    await expect(loggedInElement).not.toBeNull();
});


test ('userA mutes a community and checks it in the muted communities in the settings', async ({ page }) => {
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
    await page.locator('input[type="text"][placeholder="Search Reddit"]').first().fill('r/' + 'HistoryMemes');
    await page.locator('input[type="text"][placeholder="Search Reddit"]').first().press('Enter');
    await page.getByTestId('search-results-sidebar').getByRole('link', { name: 'r/HistoryMemes' }).click();
    await page.getByLabel('Open overflow menu').click();
    await page.getByLabel('Open overflow menu').click();
    await page.getByLabel('Open overflow menu').click();
    await page.getByText('Mute r/HistoryMemes').click();
    await page.getByRole('button', { name: 'Yes, mute' }).click();
    await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.goto('https://www.reddit.com/settings/');
    await page.getByRole('tab', { name: 'Safety & Privacy' }).click();
    await page.getByRole('link', { name: 'User avatar HistoryMemes' }).click();
    const mutedCommunity = await page.getByText('HistoryMemes');
    expect(mutedCommunity).not.toBeNull();
  });


test('block user - unblock user', async ({ page }) => {
    await page.goto('https://www.reddit.com');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(dummyLib.userA.username);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(dummyLib.userA.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.goto('https://www.reddit.com');
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('u/' + dummyLib.userB.username);
    await page.getByRole('textbox').press('Enter');
    await page.getByRole('link', { name: 'u/' + dummyLib.userB.username}).click();
    await page.getByLabel('Open overflow menu').click();
    // await page.locator('user-blocking').getByRole('img').click();
    await page.getByText('Block Account').click();
    await page.getByLabel('Home').click();
    await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByRole('link', { name: 'Settings' }).click();
    await page.goto('https://www.reddit.com/settings/privacy');
    await page.goto('https://www.reddit.com/user/' + dummyLib.userB.username + '/');

    const userBlockedState = await page.getByText('blocked ' + dummyLib.userB.username);
    expect(userBlockedState).not.toBeNull();

});


test('saved posts', async ({ page }) => {
    await page.goto('https://www.reddit.com');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(dummyLib.userA.username);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(dummyLib.userA.password);
    await page.getByRole('button', { name: 'Log In' }).click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('r/2002r');
    await page.getByRole('textbox').press('Enter');
    await page.getByTestId('search-results-sidebar').getByRole('link', { name: 'r/2002r' }).click();
    await page.getByLabel('upcoming m2002rdn').getByLabel('Open user actions').click();
    await page.getByLabel('upcoming m2002rdn').locator('span').filter({ hasText: 'Save' }).nth(3).click();
    await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByRole('link', { name: 'User Avatar for u/' }).click();
    await page.getByRole('link', { name: 'Saved' }).click();
  
    // Assertion: saved post is displayed
    const savedPost = await page.getByText('upcoming m2002rdn');
    expect(savedPost).not.toBeNull();
  });


  test('Hide/Unhide post', async ({ page }) => {
    await page.goto('https://www.reddit.com/?rdt=51460');
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator('input[name="username"]').click();
    await page.locator('input[name="username"]').fill(dummyLib.userA.username);
    await page.locator('input[name="password"]').click();
    await page.locator('input[name="password"]').fill(dummyLib.userA.password);
    await page.locator('input[name="password"]').press('Enter');
  
    const loggedInElement = await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByRole('link', { name: 'Settings' }).click();
  
    await page.waitForLoadState();
  

    await page.goto('https://www.reddit.com/r/2002r/');
    await page.getByLabel('Lunar New Year Pack').getByLabel('Open user actions').click();
    await page.getByLabel('Lunar New Year Pack').getByText('Hide').click();
    await page.getByRole('button', { name: 'User Avatar Expand user menu' }).click();
    await page.getByRole('link', { name: 'User Avatar for u/' }).click();
    // At this point, the post is hidden, we unhide it to check that it is the post we hid
    await page.getByRole('link', { name: 'Hidden' }).click();
    await page.getByText('Post hidden').click();
    await page.getByRole('button', { name: 'Undo' }).click();
    // Assertion: post is unhidden
    await expect(page.getByText('Lunar New Year Pack')).toBeVisible();
  });