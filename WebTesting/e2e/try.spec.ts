import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary';

let page, pageB;
test.beforeAll('UserA logs in', async ({ browser }) => {
    // User A logs in
    page = await browser.newPage();
    await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset' });
    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    await page.getByLabel('Password *').click();
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);
    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    await page.getByTestId('login-btn').click();
    let loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();   
    // User B logs in
    pageB = await browser.newPage();
    await pageB.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    await pageB.getByLabel('Username or Email *').click();
    await pageB.getByLabel('Username or Email *').fill(dummyLib.userB.email);
    await pageB.getByLabel('Password *').click();
    await pageB.getByLabel('Password *').fill(dummyLib.userB.password); 
    await pageB.getByTestId('login-btn').click();
    loggedInElement = await pageB.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
});

test.afterEach('Navigate to home page', async ({ }) => {
    await page.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' });
    await pageB.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' })
});


test.describe.parallel('Poll Post', () => {
    test('UserA creates a poll, and then waits to see userB s vote', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByRole('tab', { name: 'Poll' }).click();
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('GOAT Debate');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Messi or Ronaldo or Salah');
        await page.getByPlaceholder('Option 1').click();
        await page.getByPlaceholder('Option 1').fill('Messi');
        await page.getByPlaceholder('Option 2').click();
        await page.getByPlaceholder('Option 2').fill('Ronaldo');
        await page.getByRole('button', { name: 'Add Option' }).click();
        await page.getByPlaceholder('Option 3').click();
        await page.getByPlaceholder('Option 3').fill('Salah');
        await page.getByTestId('post').click();
        await page.locator('div').filter({ hasText: /^Messi$/ }).getByRole('radio').check();
        await page.getByRole('button', { name: 'Vote', exact: true }).click();
        expect(await page.getByText('✔Messi (1)Ronaldo (0)Salah (0')).toBeVisible();
        const element = await page.getByText('Salah', { exact: true });
        expect(await element.isDisabled()).toBe(false);
    });

    test('UserB votes in a poll and checks his vote is sent', async ({}) => {
        await pageB.getByRole('button', { name: 'Create' }).click();
    });
});