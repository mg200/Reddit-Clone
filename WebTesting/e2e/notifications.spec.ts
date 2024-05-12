import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test('Navigate Notifications', async ({ page }) => {

    await page.setViewportSize({width: 1366, height: 720});
    await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });

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

    await page.goto(dummyLib.paths.webPath +'/home', { waitUntil: 'load' });


    await page.locator('#navbarSupportedContent').getByRole('button').click();
    await page.getByRole('link', { name: 'See all Notifications' }).click();

    let tmp = await page.getByText('Notifications');
    expect(tmp).not.toBeNull();

    await page.getByRole('tab', { name: 'Messages' }).click();

    tmp = await page.getByText('Send a Private Message');
    expect(tmp).not.toBeNull();


    await page.getByLabel('To:').click();
    await page.getByLabel('To:').fill('u/moashraf5');

    await page.getByLabel('Subject:').click();
    await page.getByLabel('Subject:').fill('Testing Messages');

    await page.getByLabel('Message:').click();
    await page.getByLabel('Message:').fill('Viva Palestine');

    await page.getByRole('button', { name: 'Send Message' }).click();
    await page.getByText('Message sent successfully').click();

    await page.getByRole('tab', { name: 'Sent' }).click();

    tmp = await page.getByText('Viva Palestine');
    expect(tmp).not.toBeNull();
});