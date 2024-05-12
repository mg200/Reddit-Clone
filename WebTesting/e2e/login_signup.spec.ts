import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

// Note: this is not necessarily executable; the actual Reddit prompts the user to enter a CAPTCHA or select from a set of images
// which is not possible to automate (Or at least not easily).
// This is just a demonstration of how the tests would look like in our case.
// SIGN UP
test ('SIGN UP', async ({ page }) => {

    // await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });

    await page.goto(dummyLib.paths.webPath + '/signup');

    let textContent = await page.textContent('body');
    expect(textContent).toContain('Signup');

    await page.getByLabel('Email').click();
    await page.getByLabel('Email').fill(dummyLib.userA.email); // email already taken
    await page.click('body'); // Click outside the 'Email' field to trigger the error message
    textContent = await page.textContent('body');
    expect(textContent).toContain('Email is already taken');

    await page.getByLabel('Email').fill(dummyLib.userD.email);
    await page.getByTestId('password').getByLabel('Password').click();
    await page.getByTestId('password').getByLabel('Password').fill(dummyLib.userD.password);
    await page.getByLabel('Confirm Password').click();
    await page.getByLabel('Confirm Password').fill(dummyLib.userD.non_matching_password);
    await page.click('body');
    textContent = await page.textContent('body');
    expect(textContent).toContain('Passwords do not match');

    await page.getByLabel('Confirm Password').click();
    await page.getByLabel('Confirm Password').fill(dummyLib.userD.password);

    await page.frameLocator('iframe[name="a-cnyxqihmfb8k"]').getByLabel('I\'m not a robot').click();

    await page.getByTestId('signup-btn').click();
    await page.getByLabel('Username *').click();

    // Username already taken
    await page.getByLabel('Username *').fill(dummyLib.userA.username);
    await page.click('body');
    textContent = await page.textContent('body');
    expect(textContent).toContain('Username is already taken');

    // Username is less than 6 characters
    await page.getByLabel('Username *').dblclick();
    await page.getByLabel('Username *').fill('hus');
    await page.click('body');
    textContent = await page.textContent('body');
    expect(textContent).toContain('Username must be 6 characters or above');

    // Username is valid
    await page.getByLabel('Username *').fill(dummyLib.userD.username);
    await page.getByTestId('signup-btn').click();

    await page.getByRole('button', { name: 'Man', exact: true }).click();

    await page.getByTestId('signup-btn').click();
    await page.getByRole('button', { name: 'NFL' }).click();
    await page.getByRole('button', { name: 'Memes' }).click();

    await page.getByTestId('signup-btn').click();
});

//  LOG IN
test('LOG IN with different scenarios', async ({ page }) => {

    // await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });
    
    await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });

    // Enter an invalid email-password combination
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userD.email);

    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill(dummyLib.userA.wrong_password);
    await page.click('body');
    
    // Check that the button with test id 'login-btn' is disabled
    let button = await page.getByTestId('login-btn');
    expect(await button.isDisabled()).toBe(true);

    // Enter an invalid password (not satisfying the password policy)
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill(dummyLib.userA.invalid_password);
    await page.click('body');
    
    button = await page.getByTestId('login-btn');
    expect(await button.isDisabled()).toBe(true);

    let textContent = await page.textContent('body');
    expect(textContent).toContain('Invalid Password');
    
    // Enter the correct email-password combination
    await page.getByLabel('Password *').click();
    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').fill(dummyLib.userA.password);
    await page.getByTestId('login-btn').click();

    // Assertion: Check if logged in by verifying some element that only appears when logged in
    const loggedInElement = await page.getByAltText('threadit logo');
    expect(loggedInElement).not.toBeNull();

    await page.getByRole('button', { name: 'account of current user' }).click();
    await page.getByTestId('log-out-nav').click();
    const loggedoutElement = await page.getByRole('heading', { name: 'Login' });
    expect(loggedoutElement).not.toBeNull();
});

// Not working yet due to the feature itself not working properly

// test('OAuth', async ({ page }) => {
//     await page.goto(dummyLib.paths.webPath + '/login', { waitUntil: 'load' });
//     const page2Promise = page.waitForEvent('popup');
//     await page.getByRole('button', { name: 'Login with Google' }).click();
//     const page2 = await page2Promise;
//     await page2.getByLabel('Email or phone').click();
//     await page2.getByLabel('Email or phone').fill('alhussein.ali02@eng-st.cu.edu.eg');
//     await page2.getByRole('button', { name: 'Next' }).click();
//     await page2.getByLabel('Enter your password').fill('GarbagePass');
//     await page2.getByRole('button', { name: 'Next' }).click();
//     await page2.getByText('2-Step Verification', { exact: true }).click();
//     await page2.goto('https://accounts.google.com.eg/accounts/SetSID?ssdc=1&sidt=ALWU2ctKqjgNN7BKtnh5Af7YVsENJspeH45Xw9iFsBE4%2BWykqmdr3Zkbeza7agpclnNfWn3xVvlhHnWE4eP7LY6D0%2BiwXJmAf4u66aABnQU4x2MJNrF1nHRa9g/aa/bZ6gg9C9aUq8xbzgohgtNsC8nx%2B%2BjSr/WGJnT4JF9%2BK6P4t60cTwVLJmV3E2U6eqLMI7vSrZdSofDeLvgKJBClmXhEZUxPTI3axoDAfToGx4nNLDWGmKQrfElouvqIO9jdE%2Bi8PZ4%2BUZTNu4b7miL4zj/7TCJ9F5i2X8BLZweVxAlsTpj6kO/ddp8hZP/W3odkOWfyFOcRqWgyQ/KV/QV/X6fXqJy9HM01GyEb3uk117htJLDwx9EaaEt8%2BsvwGxZuSOC60VRhmjpOYDMZFKnVvA5tqS1WDTEaO5uzX1t3gu/qSYSUCTGEpqr2o74cneSu1fSGFh1fyvZdSMSX8kfIlmjhhDx4US%2BtKNyplnZrzN3xtX61DPaIMRKe67N2ASgwKo84/UcsNiCPvsrYd4H4d6KFwSUt9fuMV3PA8N%2BCGHIWLAASnqYK%2BH3nNX2MSpvbYpUq2d2wle6kHmrLGGwQ2Nm/RHUqPHGEC4kr5w%2B29YEYKTL/UZ/ISbrVvAMqKgwOVDFwfwnLHbcF5LX%2BvsocMc%2BuZXNVfM%2BLkkh7mIwnr529CRM2kn/SbnxWI2XimhSPJlczcLz%2B5r%2BEt09hTuqJ5LTpROp4O74CKr6skJ4iQPJZ5xlsgF/pe8SWAsO7BMNLL8Gs92UNMIOt3VepoBxFgsiHnj/IWoQrJQ%3D%3D&continue=https://accounts.google.com/signin/oauth/consent?authuser%3D0%26part%3DAJi8hANyC0KrIjcxUMjkrNXcVqmTsvmq7GHphQIfctO217kaoGZLVI8R6JhMrOq2dm877clLmAShYJLMXNPPQA5DsymKy29B43SnXSZH1KOZTa_uaxypSgGmPi-7zvfnifiEV0g6BUYONXiuYhNHE8G4mFJx7INVlRPEvZkZS7V_QW_MqVWor4EoBDxsNROOJC4E9uvMLuKlHjc6nJJ6qCOvFrLylnJZnJFbw1V-KqQIEf0Pmz404V8pCrf5vb5_S5G-c3k7FhSLzKRZ3kNDp9mKCbq6Wj6PIh3H0MBlQhQKaAeOMHjbVRUx50AcPBSswUQg_B0qALLUdkbnxBQgWosKD7tzgyuSLnK_AMEZDeKe9G5-VWpe6BBPWDh2_hL6tDXm7KrzRLQPkXJ4whLzI4CYcDL0d8p2yWS6huxGthLJOiVLL3IRMVvRV-DdzKjB2u5x9zb_X8mptyrsAfsc5MQ-fQNbfKN9GwsMYYQh3ZHfQ6UqKhUgWJs%26flowName%3DGeneralOAuthFlow%26as%3DS1208014535%253A1715488257799177%26client_id%3D500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com%26rapt%3DAEjHL4P4W_mYRJGycP8mAbVOzGTm-Pk_-PR3HkXKAmL-6zPI89Zv5VQ10OEcacUWA6y_RBEHzLHKAY_I0_9fR4DJ9KnwkfC3n2OrIzZ_Tv9HgymjjJqpD-g%23&tcc=1');
//     await page2.goto('https://accounts.google.com.eg/accounts/SetSID');
//     await page2.goto('https://accounts.google.com/signin/oauth/error?authError=Cg1hY2Nlc3NfZGVuaWVkEtEBVGhlIGRldmVsb3BlciBoYXNu4oCZdCBnaXZlbiB5b3UgYWNjZXNzIHRvIHRoaXMgYXBwLiBJdOKAmXMgY3VycmVudGx5IGJlaW5nIHRlc3RlZCBhbmQgaXQgaGFzbuKAmXQgYmVlbiB2ZXJpZmllZCBieSBHb29nbGUuIElmIHlvdSB0aGluayB5b3Ugc2hvdWxkIGhhdmUgYWNjZXNzLCBjb250YWN0IHRoZSBkZXZlbG9wZXIgKG1vLmFzaHJhZi5tY3NAZ21haWwuY29tKS4aRGh0dHBzOi8vc3VwcG9ydC5nb29nbGUuY29tL2FjY291bnRzL2Fuc3dlci8zNDY2NTIxP3A9YXBwX25vdHZlcmlmaWVkIJMDKhYKDXJlc3BvbnNlX3R5cGUSBXRva2VuKkQKDHJlZGlyZWN0X3VyaRI0c3RvcmFnZXJlbGF5Oi8vaHR0cHMvd3d3LnRocmVhZGl0LnRlY2g_aWQ9YXV0aDc2ODYzMyoYCgZwcm9tcHQSDnNlbGVjdF9hY2NvdW50KlUKCWNsaWVudF9pZBJINTAwMDIwNDExMzk2LWw3c29xNDhxcGFzcmRzOWlwZ281bmZmNTY1NmkwaWFsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tKh4KFmluY2x1ZGVfZ3JhbnRlZF9zY29wZXMSBHRydWUqDgoJZ3Npd2Vic2RrEgEzKhUKC2FjY2Vzc190eXBlEgZvbmxpbmUqHQoVZW5hYmxlX3NlcmlhbF9jb25zZW50EgR0cnVlKqgBCgVzY29wZRKeAW9wZW5pZCBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5lbWFpbCBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLm1ldGFkYXRhLnJlYWRvbmx5MooBCAQahQFodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvb2F1dGgyL3Byb2R1Y3Rpb24tcmVhZGluZXNzL2JyYW5kLXZlcmlmaWNhdGlvbj9obD1lbiNwcm9qZWN0cy11c2VkLWluLWRldi10ZXN0LXN0YWdl&client_id=500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com&app_domain=https%3A%2F%2Fwww.threadit.tech&authuser=0');
//     await page2.goto('https://accounts.google.com/signin/oauth/error/v2?authError=Cg1hY2Nlc3NfZGVuaWVkEtEBVGhlIGRldmVsb3BlciBoYXNu4oCZdCBnaXZlbiB5b3UgYWNjZXNzIHRvIHRoaXMgYXBwLiBJdOKAmXMgY3VycmVudGx5IGJlaW5nIHRlc3RlZCBhbmQgaXQgaGFzbuKAmXQgYmVlbiB2ZXJpZmllZCBieSBHb29nbGUuIElmIHlvdSB0aGluayB5b3Ugc2hvdWxkIGhhdmUgYWNjZXNzLCBjb250YWN0IHRoZSBkZXZlbG9wZXIgKG1vLmFzaHJhZi5tY3NAZ21haWwuY29tKS4aRGh0dHBzOi8vc3VwcG9ydC5nb29nbGUuY29tL2FjY291bnRzL2Fuc3dlci8zNDY2NTIxP3A9YXBwX25vdHZlcmlmaWVkIJMDKhYKDXJlc3BvbnNlX3R5cGUSBXRva2VuKkQKDHJlZGlyZWN0X3VyaRI0c3RvcmFnZXJlbGF5Oi8vaHR0cHMvd3d3LnRocmVhZGl0LnRlY2g_aWQ9YXV0aDc2ODYzMyoYCgZwcm9tcHQSDnNlbGVjdF9hY2NvdW50KlUKCWNsaWVudF9pZBJINTAwMDIwNDExMzk2LWw3c29xNDhxcGFzcmRzOWlwZ281bmZmNTY1NmkwaWFsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tKh4KFmluY2x1ZGVfZ3JhbnRlZF9zY29wZXMSBHRydWUqDgoJZ3Npd2Vic2RrEgEzKhUKC2FjY2Vzc190eXBlEgZvbmxpbmUqHQoVZW5hYmxlX3NlcmlhbF9jb25zZW50EgR0cnVlKqgBCgVzY29wZRKeAW9wZW5pZCBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLnByb2ZpbGUgaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5lbWFpbCBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2RyaXZlLm1ldGFkYXRhLnJlYWRvbmx5MooBCAQahQFodHRwczovL2RldmVsb3BlcnMuZ29vZ2xlLmNvbS9pZGVudGl0eS9wcm90b2NvbHMvb2F1dGgyL3Byb2R1Y3Rpb24tcmVhZGluZXNzL2JyYW5kLXZlcmlmaWNhdGlvbj9obD1lbiNwcm9qZWN0cy11c2VkLWluLWRldi10ZXN0LXN0YWdl&client_id=500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com&app_domain=https%3A%2F%2Fwww.threadit.tech&authuser=0');
//     await page2.getByRole('heading', { name: 'Access blocked: threadit.tech' }).locator('span').click();
// });