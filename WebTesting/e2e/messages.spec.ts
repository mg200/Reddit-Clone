import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';
import { time } from 'console';


// test.beforeEach('Log in', async ({ page }) => {
//     await page.setViewportSize({width: 1366, height: 720});
//     await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
//     await page.goto(dummyLib.paths.LocalHost + '/login', { waitUntil: 'load' });
    
//     // Enter the correct email-password combination
//     await page.getByLabel('Password *').click();
//     await page.getByLabel('Username or Email *').click();
//     await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

//     await page.getByLabel('Password *').fill(dummyLib.userA.password);
//     await page.getByTestId('login-btn').click();

//     // Assertion: Check if logged in by verifying some element that only appears when logged in
//     const loggedInElement = await page.getByAltText('threadit logo');
//     expect(loggedInElement).not.toBeNull();
//   });


test ('UserA sends a message to UserB', async ({page, browser}) => {

    // User A logs in and sends a message to User B
    await page.goto(dummyLib.paths.webPath + '/login');

    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    
    await page.getByTestId('login-btn').click();
    
    // Assertion: Check if logged in by verifying some element that only appears when logged in
    let loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
    await page.waitForTimeout(1000);

    await page.getByLabel('show 17 new notifications').getByRole('button').click();
    await page.getByRole('button', { name: 'Messages' }).click();
    await page.getByLabel('To:').click();
    await page.getByLabel('To:').fill('u/' + dummyLib.userB.username);
    await page.getByLabel('Subject:').click();
    await page.getByLabel('Subject:').fill('Test Message Subject');
    await page.getByLabel('Message:').click();
    await page.getByLabel('Message:').fill('Test Message Content');
    await page.getByRole('button', { name: 'Send Message' }).click();
    expect(await page.getByText('Message sent successfully')).not.toBeNull();

    await page.getByRole('tab', { name: 'Sent' }).click();
    
    await page.waitForLoadState();
    let tmp = await page.getByText('Test Message Content');
    expect(tmp).not.toBeNull();


    // User B logs in from a new browser context
    const newContext = await browser.newContext();
    const pageB = await newContext.newPage();
    await pageB.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });

    await pageB.getByLabel('Username or Email *').click();
    await pageB.getByLabel('Username or Email *').fill(dummyLib.userB.email);

    await pageB.getByLabel('Password *').click();
    await pageB.getByLabel('Password *').fill(dummyLib.userB.password); 

    await pageB.getByTestId('login-btn').click();

    loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
    
    await page.waitForTimeout(1000);

    // Check message notification
    await page.getByLabel('show 17 new notifications').getByRole('button').click();
    expect(await page.getByRole('heading', { name: 'Message Notification' })).not.toBeNull();
    expect(await page.getByText('u/hussein sent you a message').first()).not.toBeNull();


    // User B checks the inbox and reads the message
    await pageB.goto(dummyLib.paths.webPath + '/messages');

    await pageB.getByRole('tab', { name: 'Inbox' }).click();
    await pageB.waitForLoadState();
    
    tmp = await pageB.getByText('Message sent successfully');
    expect(tmp).not.toBeNull();

    
    tmp = await page.getByText('End of messages');
    expect(tmp).not.toBeNull();
    
    // Select the <button> element with the text "Unread"

    // A received message should be in the unread messages list
    let button = await page.$('button:has-text("Unread")');
    if (button) {
        await button.click();
    }
    tmp = await pageB.getByText('Message sent successfully');
    expect(tmp).not.toBeNull();

    button = await page.$('button:has-text("All")');
    if (button) {
        await button.click();
    }
    
    await pageB.getByText('Mark Read').click();

    await page.waitForTimeout(1000);
    await pageB.waitForLoadState();

    button = await page.$('button:has-text("Unread")');
    if (button) {
        await button.click();
    }
    tmp = await pageB.getByText('Message sent successfully');
    //
    expect(tmp).not.toBeNull();

    button = await page.$('button:has-text("All")');
    if (button) {
        await button.click();
    }
    await pageB.getByText('Mark Unread').click();

    button = await page.$('button:has-text("Unread")');
    if (button) {
        await button.click();
    }
    tmp = await pageB.getByText('Message sent successfully');
    expect(tmp).not.toBeNull(); 

    // Delete the message
    button = await page.$('button:has-text("All")');
    if (button) {
        await button.click();
    }

    await pageB.getByText('Delete').click();
    await page.waitForTimeout(1000);
    button = await page.$('button:has-text("All")');
    if (button) {
        await button.click();
    }
    tmp = await pageB.getByText('Message sent successfully');
    expect(tmp).not.toBeNull();

    await page.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' });
    await pageB.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' })
});


test('UserA replies ', async ({page, browser}) => {
    // User A logs in and sends a message to User B
    await page.goto(dummyLib.paths.webPath + '/login');

    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    
    await page.getByTestId('login-btn').click();
    
    // Assertion: Check if logged in by verifying some element that only appears when logged in
    let loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
    await page.waitForTimeout(1000);

    
});