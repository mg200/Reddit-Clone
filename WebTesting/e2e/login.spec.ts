// import { test, expect } from '@playwright/test';
const { test, expect } = require("playwright-test-coverage");
import * as dummyLib from '../dummiesLibrary.ts';


test('Log in', async ({ page }) => {
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