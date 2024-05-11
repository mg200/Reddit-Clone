import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test('Feed', async ({ page }) => {

    // await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });

    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    
    await page.getByTestId('login-btn').click();
    
    // Assertion: Check if logged in by verifying some element that only appears when logged in
    const loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
    await page.waitForTimeout(2000);

    await page.goto(dummyLib.paths.webPath + '/home');


    await page.locator('a').filter({ hasText: 'theHazem04/16/2024, 01:51' }).first().click();

    await page.getByText('Add a comment').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('test comment');
    await page.getByRole('button', { name: 'Comment' }).click();


    await page.locator('#postcontainer').getByRole('button').first().click();
    await page.getByText('Save').click();

    await page.goto(dummyLib.paths.webPath + '/profile', { waitUntil: 'load' });

    let tmp = await page.getByText('u/se7sbond');
    expect(tmp).not.toBeNull();

    await page.getByRole('tab', { name: 'Saved' }).click();

    tmp = await page.getByText('MoAshrafPT');
    expect(tmp).not.toBeNull();


    await page.getByRole('tab', { name: 'Comments' }).click();


    tmp = await page.getByText('new test comment');
    expect(tmp).not.toBeNull();


    await page.locator('.share-button').first().click();
    
    await page.getByRole('button', { name: 'Copy Link' }).click();


    await page.getByTestId('create-post-nav').click();
    await page.getByTestId('title').click();
    await page.getByTestId('title').fill('copied link');
    await page.getByTestId('text').click();
    await page.getByTestId('text').fill(dummyLib.paths.webPath + '/comments/661dd18eec3c9d48bf69d512/');
    await page.getByRole('button', { name: 'Save Draft' }).click();
    await page.getByRole('tab', { name: 'Link' }).click();
    await page.getByTestId('title').click();
    await page.getByTestId('title').fill('Link');
    await page.getByTestId('title').press('Home');
    await page.getByTestId('title').fill('Copied Link');
    await page.getByTestId('title').press('End');
    await page.getByTestId('title').fill('Copied Link Post');
    await page.getByTestId('text').click();
    await page.getByTestId('text').fill(dummyLib.paths.webPath + '/comments/661dd18eec3c9d48bf69d512/');
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
});