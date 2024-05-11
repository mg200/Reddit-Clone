import { test, expect } from '@playwright/test';
import * as dummyLib from '../dummiesLibrary.ts';

// Note: this is not necessarily executable; the actual Reddit prompts the user to enter a CAPTCHA or select from a set of images
// which is not possible to automate (Or at least not easily).
// This is just a demonstration of how the tests would look like in our case.
// SIGN UP
test ('SIGN UP', async ({ page }) => {

    // await page.setViewportSize({width: 1366, height: 720});
    // await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });

    await page.goto(dummyLib.paths.LocalHost + '/signup');

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
    
    await page.goto(dummyLib.paths.LocalHost + '/login', { waitUntil: 'load' });

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
});

test('LOG IN  - LOG OUT', async ({ page }) => {

    await page.setViewportSize({width: 1366, height: 720});
    await page.evaluate(() => { (document.body.style as any).zoom = 'reset'; });

    await page.goto(dummyLib.paths.LocalHost + '/login', { waitUntil: 'load' });

    await page.getByLabel('Username or Email *').click();
    await page.getByLabel('Username or Email *').fill(dummyLib.userA.email);

    await page.getByLabel('Password *').click();
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
//     await page.goto(dummyLib.paths.LocalHost + '/login', { waitUntil: 'load' });
//     const page1Promise = page.waitForEvent('popup');
//     await page.getByRole('button', { name: 'Login with Google' }).click();
//     const page1 = await page1Promise;
//     await page1.getByLabel('Email or phone').fill('alhussein.ali02@eng-st.cu.edu.eg');
//     await page1.getByRole('button', { name: 'Next' }).click();
//     await page1.getByLabel('Enter your password').fill('gaMaleNg@2025_');
//     await page1.getByRole('button', { name: 'Next' }).click();
//     await page1.goto('https://accounts.google.com.eg/accounts/SetSID?ssdc=1&sidt=ALWU2csNXp8ys962TCN7sh2bF9hQEIF4HOn/K2eoGoI19hIlfq8LgmWuLvwfGzfCu1qFzKnMfsnamZ3oMKS89q8slTDNNVcPfIfPROVOABImw%2BAD5U%2BpyYfeU6VVwjnboWHi2c8HSaD1xCFiyvoldIwLO0wGxevkOHPLJLd4hZy6jQSo3jTfreVzzR3DaxikQ15jC%2Bd3%2BHAwb%2BVT92t%2BKptD688dne785n%2B409bYebIReIXyxvvBaDkOxKiztMxRMZU0l7mW%2Beh61nEXHzT9JXz0uWoDZN51YrIeF996L9osdGCnriZRYhRhsidfsgMUvNxC3AD3xvL90tqGCsOxC1AiL7%2B3B7WlnScEg8qJ9dQICu3Hh8x/ZEuw8bJScslrMChz4Q82/kW3L41oXl9KguEZ1fgNZXSPyWBBJ7Ovn4ZdXFaZPzpMpN5JBXHklOG7d8E3X4SxxCL9MB0i7iGJk/SJzDpEVg6Fuc7jvphTNIutiMbCBwu5ISvM/HgIV1uYZGht1e6/vi6zNUpYcOEE8y9cKg%2BaS/%2BwOuZqXFRyf6Hvq6%2Bsk8F25Cg6f6e02pIDuXjs/NYTSxV3clTuQaFA4LHHbuU5jMzdhYHQBLNaN2Z20pynT65LtrfFZYGClEiAiecFZcmAI/C2nGyXPOXOpOr3qbVKuLEhgjDYnrlVB1CBpUMY6av46vyQ/zmM8VWN2CKTAMsddi1PayHmTZSd22bn6L6MRREFUGakRDOGUeGUJg0pFk5fJ%2BO5ZXYPqAjkGl2shzRHDL82cp1ds1teE5YGUJXOQnmssg%3D%3D&continue=https://accounts.google.com/signin/oauth/consent?authuser%3D0%26part%3DAJi8hAN5XNihpovGGuuAXLaYo2hHya7tRBenU791WBznUc45sdU3i3E_YmsNF4skG0IFkbsD2FcwM8RFinInV1dU4hYnan5ijW0HjRLDXxisExYB1sadUEy4Na1W64NiaIBmSnSX_BIkb7J_OwQQ8kmTK4Mcee7Ald5fJ-Ljqi1Q_b7Q2eJ6o0yYy5_BwVDy6PQpecHExpB_UAR35niVeh8Traa8BnflvokaPNMcGZP7SSCLJyyobRszSqvqraSgq_ygOcoJZ2-DVgiHiHZKZOF5A1n4F7v61QOuNOX8gqAN0OL0geFbkCVDdkFuQ1qopiZdSEKkTlOS4zqj7GdFw-G3_w4NLm2Iao5QJ5huy_Y9MMvqwHexgFwaeK7XmtaFKaeWQW7ZzPB7uq91UTCQZhu1nKTSf0KaRCQAeCmXAMMLaoXsoB_X2T8cL5lD2Y8MuUiNrfSnm8QGXZknFZG596EC6VgRBnEfVZqslYI-cMZ_UpxV1B6nxv8%26flowName%3DGeneralOAuthFlow%26as%3DS-268364928%253A1713298159974359%26client_id%3D500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com%26theme%3Dmn%26rapt%3DAEjHL4N8Y1mTvF850eETUYlcH7SxuPy0V6G9UdhSu2dM4vmSpt_yrJKigKfiK7neBif6T_8f8gdhaGhLaHNmqk6k6Fu6i2lt9_h2GJ0WwFOEj3SwR_k-Tmg%23&tcc=1');
//     await page1.goto('https://accounts.google.com.eg/accounts/SetSID');
//     await page1.goto('https://accounts.google.com/signin/oauth/error?authError=Cg1hY2Nlc3NfZGVuaWVkEtEBVGhlIGRldmVsb3BlciBoYXNu4oCZdCBnaXZlbiB5b3UgYWNjZXNzIHRvIHRoaXMgYXBwLiBJdOKAmXMgY3VycmVudGx5IGJlaW5nIHRlc3RlZCBhbmQgaXQgaGFzbuKAmXQgYmVlbiB2ZXJpZmllZCBieSBHb29nbGUuIElmIHlvdSB0aGluayB5b3Ugc2hvdWxkIGhhdmUgYWNjZXNzLCBjb250YWN0IHRoZSBkZXZlbG9wZXIgKG1vLmFzaHJhZi5tY3NAZ21haWwuY29tKS4aRGh0dHBzOi8vc3VwcG9ydC5nb29nbGUuY29tL2FjY291bnRzL2Fuc3dlci8zNDY2NTIxP3A9YXBwX25vdHZlcmlmaWVkIJMDKhYKDXJlc3BvbnNlX3R5cGUSBXRva2VuKkAKDHJlZGlyZWN0X3VyaRIwc3RvcmFnZXJlbGF5Oi8vaHR0cC9sb2NhbGhvc3Q6MzAwMD9pZD1hdXRoMzkxMTk3KhgKBnByb21wdBIOc2VsZWN0X2FjY291bnQqVQoJY2xpZW50X2lkEkg1MDAwMjA0MTEzOTYtbDdzb3E0OHFwYXNyZHM5aXBnbzVuZmY1NjU2aTBpYWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20qHgoWaW5jbHVkZV9ncmFudGVkX3Njb3BlcxIEdHJ1ZSoOCglnc2l3ZWJzZGsSATMqFQoLYWNjZXNzX3R5cGUSBm9ubGluZSodChVlbmFibGVfc2VyaWFsX2NvbnNlbnQSBHRydWUqqAEKBXNjb3BlEp4Bb3BlbmlkIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWV0YWRhdGEucmVhZG9ubHkyigEIBBqFAWh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2lkZW50aXR5L3Byb3RvY29scy9vYXV0aDIvcHJvZHVjdGlvbi1yZWFkaW5lc3MvYnJhbmQtdmVyaWZpY2F0aW9uP2hsPWVuI3Byb2plY3RzLXVzZWQtaW4tZGV2LXRlc3Qtc3RhZ2U%3D&client_id=500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com&app_domain=http%3A%2F%2Flocalhost%3A3000&authuser=0');
//     await page1.goto('https://accounts.google.com/signin/oauth/error/v2?authError=Cg1hY2Nlc3NfZGVuaWVkEtEBVGhlIGRldmVsb3BlciBoYXNu4oCZdCBnaXZlbiB5b3UgYWNjZXNzIHRvIHRoaXMgYXBwLiBJdOKAmXMgY3VycmVudGx5IGJlaW5nIHRlc3RlZCBhbmQgaXQgaGFzbuKAmXQgYmVlbiB2ZXJpZmllZCBieSBHb29nbGUuIElmIHlvdSB0aGluayB5b3Ugc2hvdWxkIGhhdmUgYWNjZXNzLCBjb250YWN0IHRoZSBkZXZlbG9wZXIgKG1vLmFzaHJhZi5tY3NAZ21haWwuY29tKS4aRGh0dHBzOi8vc3VwcG9ydC5nb29nbGUuY29tL2FjY291bnRzL2Fuc3dlci8zNDY2NTIxP3A9YXBwX25vdHZlcmlmaWVkIJMDKhYKDXJlc3BvbnNlX3R5cGUSBXRva2VuKkAKDHJlZGlyZWN0X3VyaRIwc3RvcmFnZXJlbGF5Oi8vaHR0cC9sb2NhbGhvc3Q6MzAwMD9pZD1hdXRoMzkxMTk3KhgKBnByb21wdBIOc2VsZWN0X2FjY291bnQqVQoJY2xpZW50X2lkEkg1MDAwMjA0MTEzOTYtbDdzb3E0OHFwYXNyZHM5aXBnbzVuZmY1NjU2aTBpYWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20qHgoWaW5jbHVkZV9ncmFudGVkX3Njb3BlcxIEdHJ1ZSoOCglnc2l3ZWJzZGsSATMqFQoLYWNjZXNzX3R5cGUSBm9ubGluZSodChVlbmFibGVfc2VyaWFsX2NvbnNlbnQSBHRydWUqqAEKBXNjb3BlEp4Bb3BlbmlkIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8ucHJvZmlsZSBodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsIGh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvZHJpdmUubWV0YWRhdGEucmVhZG9ubHkyigEIBBqFAWh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2lkZW50aXR5L3Byb3RvY29scy9vYXV0aDIvcHJvZHVjdGlvbi1yZWFkaW5lc3MvYnJhbmQtdmVyaWZpY2F0aW9uP2hsPWVuI3Byb2plY3RzLXVzZWQtaW4tZGV2LXRlc3Qtc3RhZ2U%3D&client_id=500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com&app_domain=http%3A%2F%2Flocalhost%3A3000&authuser=0');
//     await page1.getByRole('link', { name: 'error details' }).click();
//     await page1.getByRole('button', { name: 'Done' }).click();
// });