import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';


test('forget password', async ({ page }) => {

    // await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });

    await page.getByText('Forgot Password?').click();

    await page.getByLabel('Email Address').fill(dummyLib.userA.email);

    await page.getByLabel('Reset Password').locator('input[type="text"]').click();

    await page.getByLabel('Reset Password').locator('input[type="text"]').fill(dummyLib.userA.username);
    await page.getByRole('button', { name: 'Submit' }).click();
    
    let tmp = await page.getByText('An email has been sent to you');
    expect(tmp).not.toBeNull();
});

test('forget username', async ({ page }) => {
    
    // await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });

    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });

    await page.getByText('Forgot Username?').click();

    await page.getByLabel('Email Address').fill(dummyLib.userA.email);

    await page.getByRole('button', { name: 'Submit' }).click();

    let tmp = await page.getByText('An email has been sent to you for password recovery.');
    expect(tmp).not.toBeNull();
});


test('Modify Settings', async ({ page }) => {

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

    await page.goto(dummyLib.paths.webPath + '/settings', { waitUntil: 'load' });
    await page.getByRole('tab', { name: 'Account' }).click();
    await page.getByText('Man').click();
    await page.getByRole('option', { name: 'Woman' }).click();
    
    // ASSERTION: CHECK THE MESSAGE THAT APPEARS AFTER CHANGING THE GENDER
    let tmp = await page.getByText('Gender changed successfully!');
    expect(tmp).not.toBeNull();
    
    await page.getByText('English (US)').click();
    
    // ASSERTION: CHECK THE MESSAGE THAT APPEARS AFTER CHANGING THE LANGUAGE
    await page.getByRole('option', { name: 'Arabic' }).click();
    tmp = await page.getByText('Language changed successfully!');
    expect(tmp).not.toBeNull();

    await page.getByRole('tab', { name: 'Profile' }).click();

    await page.getByLabel('About (optional)').click();
    await page.getByLabel('About (optional)').fill('AlHussein Gamal');

    let checkbox = await page.$('.PrivateSwitchBase-input.MuiSwitch-input.css-1m9pwf3');
    // Uncheck and ensure it has been done
    if(checkbox){
        await checkbox.uncheck();
        let isChecked = await checkbox.isChecked();
        expect(isChecked).toBe(false);
    }
    else{
        console.log('checkbox not found');
    }
    // Recheck it and ensure it has been done.
    if(checkbox){
        await checkbox.check();
        let isChecked = await checkbox.isChecked();
        expect(isChecked).toBe(true);
    }
    else{
        console.log('checkbox not found');
    }
    // await page.getByRole('checkbox').first().check();
});