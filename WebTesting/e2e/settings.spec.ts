import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';
import { describe } from 'node:test';


test.beforeEach('Log in', async ({ page }) => {
    await page.setViewportSize({width: 1366, height: 720});
    await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    
    await page.getByLabel('Password *').click();
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    await page.getByTestId('login-btn').click();

    const loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();    
});


test.describe('Profile Settings', () => {
    test.beforeEach('Navigate to Profile Settings Tab', async ({ page }) => {
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        await page.getByRole('tab', { name: 'Account' }).click();
    });

    test('Change email address', async ({page}) => {
        // Change email address
        await page.locator('.MuiButton-root:has-text("Change")').first().click();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.locator('.MuiButton-root:has-text("Change")').first().click();
        await page.getByLabel('New Email Address').click();
        await page.getByLabel('New Email Address').fill(dummyLib.userA.modified_email);
        await page.getByRole('button', { name: 'Change' }).click();
        expect(await page.getByText('Email changed successfully!')).toBeVisible();
        
        // Log out
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('log-out-nav').click();

        // Log in with the new email address
        await page.getByLabel('Username or Email *').click();
        await page.getByLabel('Username or Email *').fill(dummyLib.userA.modified_email);
        
        // should be the new email address, but we are using the old one to log in since the change is not actually done (The feature is not implemented completely)
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill('pass1234');
        await page.getByTestId('login-btn').click();
        await page.getByRole('link', { name: 'threadit logo', exact: true }).click();
        
        // Assertion to check if we have logged in successfully after changing the email address
        const loggedInElement = await page.getByRole('button', { name: 'account of current user' });
        expect(loggedInElement).not.toBeNull();
    });



    test('empty test', async ({ page }) => {
        // empty test
    });

    test('Modify other settings', async ({ page }) => {
        // Change email address


        // Change Gender
        await page.getByText('Man').click();
        await page.getByRole('option', { name: 'Woman' }).click();
        await expect(page.getByText('Gender changed successfully!')).toBeVisible;

        // Change Language
        await page.getByText('English (US)').click();
        await page.getByRole('option', { name: 'Arabic' }).click();
        await expect(page.getByText('Language changed successfully!')).toBeVisible;

        // change content languages
        await page.getByRole('button', { name: 'Change' }).nth(1).click();
        await page.getByLabel('English').check();
        await page.getByLabel('Arabic').check();
        await page.getByLabel('French').check();
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByText('Languages changed').click();
        await page.getByRole('button', { name: 'Change' }).nth(1).click();
        let isChecked = await page.getByLabel('English').isChecked();
        expect(isChecked).toBe(true);
        isChecked = await page.getByLabel('Arabic').isChecked();
        expect(isChecked).toBe(true);
        isChecked = await page.getByLabel('French').isChecked();
        expect(isChecked).toBe(true);
        // await page.getByLabel('English').uncheck();
        // await page.getByLabel('Arabic').uncheck();
        // await page.getByLabel('French').uncheck();
        await page.getByRole('button', { name: 'Save' }).click();

    });

    test('Refresh and revert changes', async ({ page }) => {
        await page.getByText('Woman').click();
        await page.getByRole('option', { name : 'Man'}).click();
        await expect(page.getByText('Gender changed successfully!')).toBeVisible;
    });
});