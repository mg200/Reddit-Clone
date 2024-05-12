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
        await pageB.getByPlaceholder('Search…').click();
        await pageB.getByPlaceholder('Search…').fill('hussein');
        await pageB.getByPlaceholder('Search…').press('Enter');
        await pageB.getByRole('link', { name: 'hussein u/hussein Karma: 0' }).click();
        await pageB.getByRole('link', { name: 'GOAT Debate' }).click();
        

        await pageB.locator('div').filter({ hasText: /^Ronaldo$/ }).getByRole('radio').check();
        await pageB.getByRole('button', { name: 'Vote', exact: true }).click();
        expect(await pageB.getByText('✔Messi (1)✔Ronaldo (1)Salah (0')).toBeVisible;
    });
});

test.describe.parallel('Post notifications', () => {
    test('UserA posts, and is notified after userB comments', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByRole('tab', { name: 'Post' }).click();
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Text Post Testing');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Test Text');
        await page.getByTestId('post').click();
        await page.getByRole('link', { name: 'Text Post Testing' }).click();
        await page.getByLabel('show 17 new notifications').getByRole('button').click();
        expect(await page.getByText('u/AlHussein commented on your')).not.toBeNull();   
    });

    test('UserB comments', async ({}) => {
        await pageB.getByPlaceholder('Search…').click();
        await pageB.getByPlaceholder('Search…').fill(dummyLib.userA.username);
        await pageB.getByRole('link', { name: 'All results for ' + dummyLib.userA.username }).click();
        await pageB.getByRole('tab', { name: 'Users' }).click();
        await pageB.getByRole('link', { name: dummyLib.userA.username + ' u/' + dummyLib.userA.username + ' Karma:' }).click();
        await pageB.getByRole('link', { name: 'Text Post Testing' }).click();
        await pageB.getByText('Add a comment').click();
        await pageB.locator('textarea').click();
        await pageB.locator('textarea').fill('UserB comments');
        await pageB.getByRole('button', { name: 'Comment' }).click();
        expect(await pageB.getByText('UserB comments')).not.toBeNull();
    });
});

test.describe.parallel('Post and Comment mentions', () => {
    test('UserA mentions userB in a post, userB is notified', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('testingSquad');
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Testing Post Mentions');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Hello u/AlHussein');
        await page.getByTestId('post').click();
        await page.getByText('Add a comment').click();
        await page.locator('textarea').click();
        await page.locator('textarea').fill('And this is a comment mention u/AlHussein');
        await page.getByRole('button', { name: 'Comment' }).click();
    });

    test('UserB is notified in the notifications and the messages', async ({}) => {
        await pageB.getByLabel('show 17 new notifications').getByRole('button').click();
        expect(await pageB.getByText('u/hussein mentioned you')).not.toBeNull();
        expect(await pageB.getByText('Testing Post Mentions')).not.toBeNull();

        await pageB.getByRole('button', { name: 'Messages' }).click();
        await pageB.getByRole('tab', { name: 'Inbox' }).click();
        expect(await pageB.getByRole('heading', { name: 'hussein u/hussein How are you' })).not.toBeNull();
        await pageB.getByRole('tab', { name: 'Username Mentions' }).click();
        expect(await pageB.getByRole('heading', { name: 'hussein u/hussein How are you' })).not.toBeNull();
        await pageB.getByRole('tab', { name: 'Post Replies' }).click();
        expect(await pageB.getByRole('heading', { name: 'Message: u/hussein How are you' })).not.toBeNull();
        await pageB.getByRole('tab', { name: 'All' }).click();
        expect(await pageB.getByRole('heading', { name: 'Message: And this is a' }).first()).not.toBeNull();
        await pageB.getByRole('button', { name: 'Full Context' }).click();
        expect(await pageB.getByRole('link', { name: 'Testing Post Mentions' })).not.toBeNull();
        // await pageB.locator('#postcontainer').getByRole('link', { name: 'u/AlHussein' }).click();
        // expect(await pageB.getByRole('heading', { name: 'u/AlHussein' })).not.toBeNull();

    });
});


test.describe.parallel('Post Image', () => {
    test('UserA posts an image, userB sees the image', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByRole('tab', { name: 'Image & Video' }).click();
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Image Post');
        await page.getByTestId('content').click();
        const handle = page.locator('input[type="file"]');
        await handle.setInputFiles('D:/phase4/media/image.jfif');
        await page.getByTestId('post').click();
        await page.getByRole('link', { name: 'Image Post' }).click();
        await page.getByRole('img', { name: 'Post' }).click();
    });

    test('UserB views image', async ({}) => {
        await pageB.getByPlaceholder('Search…').click();
        await pageB.getByPlaceholder('Search…').fill('Image Post');
        await pageB.getByRole('link', { name: 'All results for ' +  'Image Post' }).click();
        await pageB.getByRole('tab', { name: 'Media' }).click();
        const image = await page.locator('img[src="https://res.cloudinary.com/dxy3lq6gh/image/upload/v1715390888/mngf97pvmxil5kxtnd3p.jpg"]');
        expect(image).not.toBeNull();
    });
});


test.describe.parallel('Post Image', () => {
    test('UserA posts an image, userB sees the image', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByRole('tab', { name: 'Post' }).click();
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Post Lock');
        await page.getByTestId('content').click();
        await page.getByTestId('post').click();
        await page.getByRole('link', { name: 'Image Post' }).click();
        await page.getByRole('img', { name: 'Post' }).click();
    });

    test('UserB views image', async ({}) => {
        await pageB.getByPlaceholder('Search…').click();
        await pageB.getByPlaceholder('Search…').fill('Image Post');
        await pageB.getByRole('link', { name: 'All results for ' +  'Image Post' }).click();
        await pageB.getByRole('tab', { name: 'Media' }).click();
        const image = await page.locator('img[src="https://res.cloudinary.com/dxy3lq6gh/image/upload/v1715390888/mngf97pvmxil5kxtnd3p.jpg"]');
        expect(image).not.toBeNull();
    });
});


// test.describe.parallel('Post Video', () => {
//     test('UserA posts a video, userB sees the video', async ({}) => {
//         await page.getByRole('button', { name: 'Create' }).click();
//         await page.locator('#community-dropdown').selectOption('username');
//         await page.getByRole('tab', { name: 'Image & Video' }).click();
//         await page.getByTestId('title').click();
//         await page.getByTestId('title').fill('Video Post');
//         await page.getByTestId('content').click();
//         const handle = page.locator('input[type="file"]');
//         await handle.setInputFiles('D:/phase4/media/video.mp4');
//         await page.getByTestId('post').click();
//         await page.getByRole('link', { name: 'Video Post' }).click();
//         await page.getByRole('img', { name: 'Post' }).click();
//     });

//     // test('UserB views image', async ({}) => {
//     //     await pageB.getByPlaceholder('Search…').click();
//     //     await pageB.getByPlaceholder('Search…').fill('Image Post');
//     //     await pageB.getByRole('link', { name: 'All results for ' +  'Image Post' }).click();
//     //     await pageB.getByRole('tab', { name: 'Media' }).click();
//     //     const image = await page.locator('img[src="https://res.cloudinary.com/dxy3lq6gh/image/upload/v1715390888/mngf97pvmxil5kxtnd3p.jpg"]');
//     //     expect(image).not.toBeNull();
//     // });
// });

test.describe.parallel('Post Link', () => {
    test('UserA posts a link, userB navigates sees the post and navigates to it', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('username');
        await page.getByRole('tab', { name: 'Link' }).click();
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Link Post');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('https://www.google.com');
        await page.getByTestId('post').click();
        await page.getByRole('link', { name: 'https://www.google.com' }).click();
        expect(await page.getByRole('img', { name: 'Google' })).not.toBeNull();
    });
});

test.describe.parallel('Post Spoiler', () => {
    test('Spoiler Post', async ({}) => {
        await page.getByRole('button', { name: 'Create' }).click();
        await page.locator('#community-dropdown').selectOption('testingSquad');
        await page.getByTestId('title').click();
        await page.getByTestId('title').fill('Spoiler Post');
        await page.getByTestId('text').click();
        await page.getByTestId('text').fill('Spoiler Text');
        await page.getByRole('button', { name: 'Spoiler' }).click();
        await page.getByTestId('post').click();
        expect(await page.getByRole('link', { name: 'Spoiler Text' })).not.toBeVisible();
        await page.getByRole('img', { name: 'Spoiler' }).click();
        expect(await page.getByRole('link', { name: 'Spoiler Text' })).toBeVisible();
    });

    test('UserB views spoiler and reads spoiler post', async ({}) => {
        await pageB.getByPlaceholder('Search…').click();
        await pageB.getByPlaceholder('Search…').fill('Spoiler Post');
        await pageB.getByRole('link', { name: 'All results for ' +  'Spoiler Post' }).click();
        await pageB.getByRole('tab', { name: 'Posts' }).click();
        await pageB.getByRole('link', { name: 'Spoiler Post' }).click();
        expect(await pageB.getByRole('link', { name: 'Spoiler Text' })).not.toBeVisible();
        await pageB.getByRole('link', { name: 'Spoiler Post' }).click();
        expect(await pageB.getByRole('link', { name: 'Spoiler Text' })).not.toBeNull();
    });
});

test('', async ({}) => {
    
});


test.afterAll('Clean up', async ({}) => {
    await page.locator('.options-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.locator('.options-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.locator('.options-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.locator('.options-button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.locator('#user-profile-grid-2').getByRole('button').first().click();
    await page.getByText('Delete').click();
    await page.getByRole('button', { name: 'Delete' }).click();

    await pageB.getByRole('button', { name: 'account of current user' }).click();
    await pageB.getByTestId('profile-nav').click();
    await pageB.locator('#user-profile-grid-2').getByRole('button').first().click();
    await pageB.getByText('Delete').click();
    await pageB.getByRole('button', { name: 'Delete' }).click();
});