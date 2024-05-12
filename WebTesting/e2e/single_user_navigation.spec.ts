import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary';

test.describe('POSTING - Single User', () => {   
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

    test ('Create post, comment, save, hide, delete', async ({page}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('tab', { name: 'Post' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Test Post');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Test Content');
        await page.getByTestId('post').click();
        let AssertionElement =  await page.getByRole('link', { name: 'Test Post' });
        expect(AssertionElement).not.toBeNull();
        AssertionElement = await page.getByRole('link', { name: 'Test Content' });
        expect(AssertionElement).not.toBeNull()

        await page.getByText('Add a comment').click();
        await page.locator('textarea').click();
        await page.locator('textarea').fill('Test Comment');
        await page.getByRole('button', { name: 'Comment' }).click();
        
        AssertionElement = await page.getByRole('link', { name: 'Test Comment' });
        expect(AssertionElement).not.toBeNull();

        await page.locator('#postcontainer').getByRole('button').first().click();
        await page.getByText('Save').click();
        
        await expect(page.getByText('Post Saved')).toBeVisible();

        await page.locator('#postcontainer').getByRole('button').first().click();
        await page.getByText('Hide').click();
        await expect(page.getByText('Post Hidden')).toBeVisible();
        

        await page.getByRole('button', { name: 'Undo' }).click();
        await page.locator('#postcontainer').getByRole('button').first().click();
        expect(await page.getByRole('link', { name: 'Test Post' })).toBeVisible();
        expect(await page.getByRole('link', { name: 'Test Content' })).toBeVisible();
        
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('profile-nav').click();
        await page.getByRole('tab', { name: 'Saved' }).click();
        expect(await page.locator('a').filter({ hasText: 'Test Post' }).first()).not.toBeNull();
        expect(await page.locator('a').filter({ hasText: 'Test Content' }).first()).not.toBeNull();

        await page.locator('#postcontainer').getByRole('button').first().click();
        await page.getByText('Delete').click();
        await page.getByRole('button', { name: 'Delete' }).click();
        await page.getByRole('tab', { name: 'Posts' }).click();
        await expect(page.getByText('Test Post')).not.toBeVisible();
        await expect(page.getByText('Test Content')).not.toBeVisible();
    });

    test ('empty test', async ({page}) => {

    });
    test ('Edit Post', async ({page}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.getByRole('tab', { name: 'Post' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Test Post');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Test Content');
        await page.getByTestId('post').click();
        let AssertionElement =  await page.getByRole('link', { name: 'Test Post' });
        expect(AssertionElement).not.toBeNull();
        AssertionElement = await page.getByRole('link', { name: 'Test Content' });
        expect(AssertionElement).not.toBeNull()

        await page.locator('#postcontainer').getByRole('button').first().click();  
        await page.getByText('Edit').click();

        await page.getByLabel('Edit').getByText('Test Content').click();
        await page.locator('div').filter({ hasText: /^Test Content$/ }).nth(1).fill('Test Content Edited');
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByRole('link', { name: 'Test Post' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'Test Content Edited' })).toBeVisible();
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('profile-nav').click();
        await page.getByRole('tab', { name: 'Posts' }).click();
        await page.getByRole('link', { name: 'Test Content Edited' }).click();
        await expect(page.getByRole('link', { name: 'Test Content Edited' })).toBeVisible();
        await page.locator('#postcontainer').getByRole('button').first().click();
        await page.getByText('Delete').click();
        await page.getByRole('button', { name: 'Delete' }).click();
    });

    test ('Add Social Link', async ({page}) => {
        await page.getByRole('button', { name: 'account of current user' }).click();
        await page.getByTestId('profile-nav').click();
        await page.getByRole('button', { name: 'Add Social Links' }).click();
        await page.getByRole('button', { name: 'Add Other Link' }).click();
        await page.getByPlaceholder('Enter other link').click();
        await page.getByPlaceholder('Enter other link').fill('https://www.threadit.tech');
        await page.getByRole('button', { name: 'Save' }).click();
        await page.getByText('Other:').click();
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'https://www.threadit.tech' }).click();
        const page1 = await page1Promise;
        expect(await page1.getByRole('link', { name: 'threadit logo', exact: true })).not.toBeNull();
        await page.getByLabel('clear all').click();
        await page.getByRole('button', { name: 'Cancel' }).click();
    });
});