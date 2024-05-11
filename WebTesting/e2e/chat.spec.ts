import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

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
    // User C logs in
    pageB = await browser.newPage();
    await pageB.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    await pageB.getByLabel('Username or Email *').click();
    await pageB.getByLabel('Username or Email *').fill(dummyLib.userC.username);
    await pageB.getByLabel('Password *').click();
    await pageB.getByLabel('Password *').fill(dummyLib.userC.password); 
    await pageB.getByTestId('login-btn').click();
    loggedInElement = await pageB.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
});

// test.afterEach('Navigate to home page', async ({ }) => {
//     await page.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' });
//     await pageB.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' })
// });



test.describe.parallel('chatting', () => {
    test('UserA creates a chatroom', async ({}) => {
        await page.locator('#grid-0').getByRole('button').nth(1).click();
        await page.getByText('Chatroom1').click();
        await page.getByTestId('react-input-emoji--input').click();
        await page.getByTestId('react-input-emoji--input').fill('Hi there TAG4');
        await page.locator('.input-container-Message-Input-From > .MuiButtonBase-root').click();
        await page.getByTestId('react-input-emoji--input').click();
        await page.getByTestId('react-input-emoji--input').fill('TAG4 How are you today?');
        await page.locator('.react-input-emoji--button').click();
        await page.getByLabel('😊').click();
        expect(await page.getByText('Hi Hussein, I am fine TAG4').first()).not.toBeNull();
        await page.getByTestId('react-input-emoji--input').click();
        await page.getByTestId('react-input-emoji--input').fill('that is great to hear TAG4');
        await page.locator('.input-container-Message-Input-From > .MuiButtonBase-root').click();
        await expect(await page.getByText('that is great to hear TAG4')).not.toBeNull();
        // dock the chat window
        await page.locator('button:nth-child(2)').click();
        // undock the chat window
        await page.getByRole('button', { name: 'Chat' }).click();

        expect(await page.getByRole('heading', { name: 'Chats' })).not.toBeNull();
        await page.locator('div').filter({ hasText: /^Chats$/ }).getByRole('button').click();
        expect(await page.getByText('Create new chat room')).not.toBeNull();
        expect(await page.getByPlaceholder('Write your chatroom name')).not.toBeNull();
        // exit the chat subwindow
        await page.locator('div').filter({ hasText: /^Create new chat room$/ }).getByRole('button').nth(2).click();

    });

    test('UserB chats with userA', async ({}) => {
        await pageB.locator('.MuiBox-root > div > div > .MuiButtonBase-root').click();
        await pageB.getByText('Chatroom1').click();
        expect(await pageB.getByText('TAG4 How are you today?😊')).not.toBeNull();
        expect(await pageB.getByText('Hi there TAG4')).not.toBeNull();
        await pageB.getByTestId('react-input-emoji--input').fill('Hi Hussein, I am fine TAG4');
        await pageB.locator('.input-container-Message-Input-From > .MuiButtonBase-root').click();
        expect(await pageB.getByText('that is great to hear TAG4').first()).not.toBeNull();
    });
});

