import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test.describe('CHATTING', () => {   
    // test.beforeEach('Log in', async ({ page }) => {
    //     await page.setViewportSize({width: 1366, height: 720});
    //     await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
        
    //     await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
        
    //     await page.getByLabel('Password *').click();
    //     await page.getByLabel('Username or Email *').click();
    //     await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    //     await page.getByLabel('Password *').fill(dummyLib.userA.password);
    //     await page.getByTestId('login-btn').click();

    //     const loggedInElement = await page.getByAltText('threadit logo');
    //     expect(loggedInElement).not.toBeNull();    
    // });
  
    test('UserA creates a chatroom with user B', async ({page, browser}) => {
            
            // User A logs in and creates a chatroom with User B
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
    
            await page.goto(dummyLib.paths.webPath + '/chat');
            await page.getByRole('tab', { name: 'Create Chatroom' }).click();
            
            await page.getByLabel('To:').click();
            await page.getByLabel('To:').fill('u/hussein');
    
            await page.getByLabel('Subject:').click();
            await page.getByLabel('Subject:').fill('Dummy Chatroom Subject');
    
            await page.getByRole('button', { name: 'Create Chatroom' }).click();
    });

    test('UserA chats with UserB', async ({page, browser}) => {

    });

    test('UserA follows UserB, UserB is notified', async ({page, browser}) => {

    });

    test('UserA unfollows UserB', async ({page, browser}) => {

    });
    
    test('UserA ', async ({page, browser}) => {

    });



});