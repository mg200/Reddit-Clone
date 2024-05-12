import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

test.beforeEach('Log in', async ({ page }) => {
    // await page.setViewportSize({width: 1920, height: 1080});
    // await page.evaluate(() => window.screen.availWidth);
    // await page.evaluate(() => window.screen.availHeight);
    await page.setViewportSize({width: 1366, height: 720});
    await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
    
    // Enter the correct email-password combination
    await page.getByLabel('Password *').click();
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    await page.getByTestId('login-btn').click();

    // Assertion: Check if logged in by verifying some element that only appears when logged in
    const loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();
});

test('Copy Link', async ({ page }) => {
    await page.locator('.share').first().click();
    // await page.locator('div:nth-child(3) > .post-container > .post-buttons > .share > .share-button').click(); // This works as well
    await page.getByRole('button', { name: 'Copy Link' }).click();
    const AssertionElement = await page.getByText('Link copied to clipboard').click();
    expect(AssertionElement).not.toBeNull();
});

test.describe('POSTING', () => {
    test ('Create Post', async ({ page }) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('tab', { name: 'Post' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Test Post');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Test Comment');
        await page.getByTestId('post').click();
        let AssertionElement =  await page.getByRole('link', { name: 'Test Post' });
        expect(AssertionElement).not.toBeNull();
        AssertionElement = await page.getByRole('link', { name: 'Test Comment' });
        expect(AssertionElement).not.toBeNull();
    });

    
});

// We need to login and navigate to the settings page before running any tests
test('Create Post/Comment, Save it, Hide it, Delete it', async ({ page }) => {

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

    await page.goto(dummyLib.paths.webPath + '/CreatePost');
    await page.getByTestId('title').click();
    await page.getByTestId('title').fill('Testing Post 1');

    await page.getByTestId('text').fill('');
    await page.getByTestId('text').fill('test text 1');

    page.once('dialog', dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        dialog.dismiss().catch(() => {});
    });

    await page.getByTestId('post').click();
    await page.goto(dummyLib.paths.webPath + '/UserPost');

    await page.click('body');

    await page.getByLabel('upvote').first().click();

    await page.goto(dummyLib.paths.webPath + '/profile');

    await page.getByRole('tab', { name: 'Posts' }).click();
    
    // expect to see the post
    await page.waitForLoadState();
    let tmp = await page.getByText('Testing Post 1');
    expect(tmp).not.toBeNull();
    
    
    // ADD A COMMENT
    await page.getByRole('link', { name: '0' }).nth(1).click();
    await page.getByText('Add a comment').click();
    await page.getByRole('textbox').fill('test comment 1');
    await page.getByRole('button', { name: 'Comment' }).click();
    
    // ASSERT THAT THE COMMENT IS ADDED
    await page.goto(dummyLib.paths.webPath + '/UserPost');
    await page.waitForLoadState();
    tmp = await page.getByText('test comment 1');
    expect(tmp).not.toBeNull();

    // SAVE THE POST
    await page.getByRole('button').first().click();
    await page.getByText('Save').click();
    
    // ASSERT THAT THE POST IS SAVED
    await page.goto(dummyLib.paths.webPath + '/profile');
    await page.getByRole('tab', { name: 'Saved' }).click();
    
    await page.waitForLoadState();
    tmp = await page.getByText('Testing Post 1');
    expect(tmp).not.toBeNull();


    // DELETE THE POST    
    await page.goto(dummyLib.paths.webPath + '/UserPost');
    await page.locator('.options-button').first().click();
    await page.getByText('Delete').click();

    await page.waitForLoadState();
    tmp = await page.getByText('Post deleted');
    expect(tmp).not.toBeNull();
    
    await page.locator('body').press('Control+r');
    
    // ASSERT THAT THE POST IS DELETED
    await page.waitForLoadState();
    tmp = await page.getByText('hasn\'t posted yet');
    expect(tmp).not.toBeNull();

});

test('Photo Post', async ({ page }) => {

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

    await page.goto(dummyLib.paths.webPath + '/CreatePost', { waitUntil: 'load' });

    await page.getByRole('tab', { name: 'Image & Video' }).click();
    await page.getByTestId('title').click();

    await page.getByTestId('title').fill('Photo Post');
    await page.getByTestId('content').click();

    await page.getByTestId('content').setInputFiles('myLogo.png');

    let tmp = await page.getByText('myLogo.png');
    expect(tmp).not.toBeNull(); 

    await page.locator('#deleteicon1').click();
    
    await page.getByRole('tab', { name: 'Link' }).click();tmp = await page.getByText('myLogo.png');
    expect(tmp).toBeNull(); 
});


test('Create Community and navigate to create post', async ({ page }) => {
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

    await page.goto(dummyLib.paths.webPath + '/home', { waitUntil: 'load' });

    await page.getByRole('link', { name: 'Create a community' }).click();
    await page.getByLabel('Name').click();
    await page.getByLabel('Name').fill('newCommunity');
    await page.getByText('Public').click();
    await page.getByRole('button', { name: 'Create t/newCommunity' }).click();
    
    await page.goto(dummyLib.paths.webPath + '/r/newCommunity');


    let tmp = await page.getByText('t.Persona3');
    expect(tmp).not.toBeNull(); 

    await page.getByRole('link', { name: 'Create a post' }).click();

    tmp = await page.getByText('Create a post');
    expect(tmp).not.toBeNull();
});

