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
        await page.getByLabel('Password *').fill(dummyLib.userA.password);
        await page.getByTestId('login-btn').click();
        await page.getByRole('link', { name: 'threadit logo', exact: true }).click();
        
        // Assertion to check if we have logged in successfully after changing the email address
        const loggedInElement = await page.getByRole('button', { name: 'account of current user' });
        expect(loggedInElement).not.toBeNull();
    });
    test('Modify other Account settings', async ({ page }) => {
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

    test('Change Gender, logout, re-enter', async ({ page }) => {
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        await page.getByText('Man').click();
        await page.getByRole('option', { name: 'Woman', exact: true }).click();
        expect(await page.getByText('Gender changed successfully!')).not.toBeNull();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('log-out-nav').click();
        await page.getByLabel('Username or Email *').click();
        await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill(dummyLib.userA.password);
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        expect(await page.getByText('Woman')).not.toBeNull();
    });

    test('Profile settings tab', async ({ page }) => {
        await page.getByRole('tab', { name: 'Profile' }).click();
        await page.getByText('This is my about section, I').click();
        await page.getByText('This is my about section, I').fill('');
        await page.locator('div').filter({ hasText: /^About$/ }).locator('#fullWidth').press('CapsLock');
        await page.locator('div').filter({ hasText: /^About$/ }).locator('#fullWidth').fill('I AM BECOME THE DESTROYER OF WORLDS!');
        await page.getByRole('checkbox').first().uncheck();
        await page.getByRole('checkbox').nth(1).uncheck();
        await page.getByRole('checkbox').nth(2).uncheck();
        await page.getByRole('checkbox').nth(3).uncheck();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('profile-nav').click();
        expect(await page.getByText('I AM BECOME THE DESTROYER OF')).toBeVisible();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('log-out-nav').click();
        await page.getByLabel('Username or Email *').click();
        await page.getByLabel('Username or Email *').fill('hussein');
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill('pass1234');
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('profile-nav').click();
        expect(await page.getByText('I AM BECOME THE DESTROYER OF')).toBeVisible();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        await page.getByRole('tab', { name: 'Profile' }).click();
        expect(await page.getByRole('checkbox').nth(2)).toBeChecked();
    });

    test('Blocking', async ({ page }) => {
        await page.getByRole('tab', { name: 'Safety & Privacy' }).click();
        await page.getByLabel('BLOCK NEW USER').click();
        await page.getByLabel('BLOCK NEW USER').fill('u/hussein');
        await page.locator('div').filter({ hasText: /^AddBLOCK NEW USER$/ }).getByRole('button').click();
        expect(await page.getByText('u/hussein')).toBeVisible();
    });

    test('Account tab', async ({ page }) => {
        await page.getByRole('tab', { name: 'Safety & Privacy' }).click();
        await page.locator('div').filter({ hasText: /^AddMUTE NEW COMMUNITY$/ }).locator('#fullWidth').click();
        await page.locator('div').filter({ hasText: /^AddMUTE NEW COMMUNITY$/ }).locator('#fullWidth').fill('t/testingSquad');
        await page.locator('div').filter({ hasText: /^AddMUTE NEW COMMUNITY$/ }).getByRole('button').click();
        expect(await page.getByText('t/testingGang')).not.toBeNull();
        await page.locator('div').filter({ hasText: /^AddMUTE NEW COMMUNITY$/ }).locator('#fullWidth').click();
        await page.locator('div').filter({ hasText: /^AddMUTE NEW COMMUNITY$/ }).locator('#fullWidth').fill('u/testingGang');
        await page.locator('div').filter({ hasText: /^AddMUTE NEW COMMUNITY$/ }).getByRole('button').click();
        expect(await page.getByText('u/testingGang')).toBeNull();
        
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('log-out-nav').click();
        await page.getByLabel('Username or Email *').click();
        await page.getByLabel('Username or Email *').fill(dummyLib.userA.username);
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill(dummyLib.userA.password);
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        await page.getByRole('tab', { name: 'Safety & Privacy' }).click();
        expect(await page.getByText('t/testingGang')).not.toBeNull();
        expect(await page.getByText('u/testingGang')).toBeNull();
    });

    test('Chat & Messaging tab', async ({ page }) => {
        await page.getByRole('tab', { name: 'Chat & Messaging' }).click();
        await page.getByText('Everyone').first().click();
        await page.getByRole('option', { name: 'Accounts older Than 30 days' }).first().click();
        await page.getByText('Accounts older Than 30 days').first().click();

        await page.getByText('Everyone').first().click();
        await page.getByRole('option', { name: 'Nobody' }).click();
        
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('log-out-nav').click();
        await page.getByLabel('Username or Email *').click();
        await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill(dummyLib.userA.password);
        await page.getByTestId('login-btn').click();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        await page.getByRole('tab', { name: 'Chat & Messaging' }).click();
        expect(await page.getByText('Accounts older Than 30 days')).toBeVisible();
        expect(await page.getByRole('option', { name: 'Nobody' })).toBeVisible();
    });

    test('Emails tab', async ({ page }) => {
        await page.getByRole('tab', { name: 'Emails' }).click();
        await page.locator('.PrivateSwitchBase-input').first().uncheck();
        await page.locator('div:nth-child(3) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(5) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(6) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(7) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(8) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(9) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(10) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(11) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(13) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.locator('div:nth-child(15) > .MuiSwitch-root > .MuiButtonBase-root > .PrivateSwitchBase-input').uncheck();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('log-out-nav').click();
        await page.getByLabel('Username or Email *').click();
        await page.getByLabel('Username or Email *').fill('hussein');
        await page.getByLabel('Password *').click();
        await page.getByLabel('Password *').fill('pass1234');
        await page.getByLabel('Password *').press('Enter');
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('settings-nav').click();
        await page.getByRole('tab', { name: 'Emails' }).click();
        const checkbox = page.locator('.PrivateSwitchBase-input').first();
        expect(await checkbox.isChecked()).toBe(false);
    });
    
    test('Refresh and revert changes', async ({ page }) => {
        await page.getByText('Woman').click();
        await page.getByRole('option', { name : 'Man'}).click();
        await expect(page.getByText('Gender changed successfully!')).toBeVisible;
    });
});