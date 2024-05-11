import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test.beforeEach('Log in', async ({ page }) => {
    await page.setViewportSize({width: 1366, height: 720});
    await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
    await page.goto(dummyLib.paths.LocalHost + '/login', { waitUntil: 'load' });
    
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
  
test ('Create community', async ({ page }) => {
    await page.getByRole('link', { name: 'Create a community' }).click();
    await page.getByLabel('Name').fill(dummyLib.communities_test_data.newCommunityName);
    await page.getByTestId('PublicIcon').click();
    await page.getByRole('button', { name: 'Create t/' + dummyLib.communities_test_data.newCommunityName }).click();
    
});

test('Join community', async ({ page }) => {

});

test('Leave community', async ({ page }) => {

});

test ('Add community to favorites', async ({ page }) => {
    await page.locator('#item-4').getByRole('button').nth(1).click();
    await page.getByRole('menuitem', { name: 'Favorite' }).click();
    await page.locator('.MuiBackdrop-root').first().click();
    const AssertionElement =  await page.locator('details').filter({ hasText: 'FAVORITES t/' + dummyLib.communities_test_data.communityName }).getByRole('link');
    expect(AssertionElement).not.toBeNull();
});


test ('Remove community from favorites', async ({ page }) => {
    await page.locator('#item-4').getByRole('button').nth(1).click();
    await page.getByRole('menuitem', { name: 'Favorite' }).click();
    await page.locator('.MuiBackdrop-root').first().click();
    const AssertionElement =  await page.locator('details').filter({ hasText: 'FAVORITES t/' + dummyLib.communities_test_data.communityName }).getByRole('link');
    expect(AssertionElement).toBeNull();
});