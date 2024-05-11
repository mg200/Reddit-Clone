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
  
test ('communities', async ({ page }) => {
    await page.getByRole('link', { name: 'Create a community' }).click();
    await page.getByLabel('Name').fill(dummyLib.communities_test_data.newCommunityName);
    await page.getByTestId('PublicIcon').click();
    await page.getByRole('button', { name: 'Create t/' + dummyLib.communities_test_data.newCommunityName }).click();
    expect(await page.getByRole('heading', { name: 't/' + dummyLib.communities_test_data.newCommunityName })).not.toBeNull();
    await page.getByRole('link', { name: 'Communities' }).click();
    await page.getByRole('link', { name: 't/' + dummyLib.communities_test_data.newCommunityName +' Members:' }).click();

    expect(await page.getByRole('heading', { name: 't/' + dummyLib.communities_test_data.newCommunityName })).not.toBeNull();
    // Add community to favorites
    await page.locator('#item-4').getByRole('button').nth(1).click();
    await page.getByRole('menuitem', { name: 'Favorite' }).click();
    await page.locator('.MuiBackdrop-root').first().click();
    let AssertionElement =  await page.locator('details').filter({ hasText: 'FAVORITES t/' + dummyLib.communities_test_data.newCommunityName }).getByRole('link');
    expect(AssertionElement).not.toBeNull();
    await page.getByRole('link', { name: 't/' + dummyLib.communities_test_data.newCommunityName }).first().click();
    expect(await page.getByRole('heading', { name: 't/' + dummyLib.communities_test_data.newCommunityName })).not.toBeNull();

    // Remove community from favorites
    await page.locator('#item-4').getByRole('button').nth(1).click();
    await page.getByRole('menuitem', { name: 'Favorite' }).click();
    await page.locator('.MuiBackdrop-root').first().click();
    AssertionElement =  await page.locator('details').filter({ hasText: 'FAVORITES t/' + dummyLib.communities_test_data.newCommunityName }).getByRole('link');

    await page.locator('#item-4').getByRole('button').nth(1).click();
    await page.getByTestId('FavoriteBorderIcon').click();
    await page.locator('.MuiBackdrop-root').first().click();
    expect(await page.locator('summary').filter({ hasText: 'FAVORITES' }).getByRole('img')).not.toBeNull();
    
});