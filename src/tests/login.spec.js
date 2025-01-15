import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { LoginPage } from "../pages/login.page";
import { validUsers, problemUsers } from "../test-data/users";

test.describe('Login Page', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('Choose company from select list', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(loginPage.getSelectCompany()).not.toBeNull();
    });

    test('Filled Username and password', async ({ loginPage }) => {
        await loginPage.fillUserPassword('6501', '1234');
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getPassword()).not.toBeNull();
    });
});

// test('Input fields should display as the data that was filled', async ({ loginPage }) => {
//     await loginPage.fillUserPassword('testuser', 'password');
//     expect(await loginPage.getUsername()).toBe('testuser');
//     expect(await loginPage.getPassword()).toBe('password');
// });

// test('Should show an error message if log in without a username', async ({ loginPage }) => {
//     await loginPage.fillUserPassword('', 'password'); 
//     // await loginPage.clickLogin();

//     // const message = await loginPage.getErrorMessage();
//     // expect(message).toContain('is required');
//     // expect(loginPage.isValidUrl()).toBe(true);

//     loginPage.isValidUrl();
// });

// test('Should show an error message if log in without a password', async ({ loginPage }) => {
//     await loginPage.fillUserPassword('usertest', ''); 
//     await loginPage.clickLogin();

//     const message = await loginPage.getErrorMessage();
//     expect(message).toContain('is required');
//     expect(loginPage.isValidUrl()).toBe(true);
// });

// test('Should show an error message if log in with both fields blank', async ({ loginPage }) => {
//     await loginPage.fillUserPassword('', ''); 
//     await loginPage.clickLogin();

//     const message = await loginPage.getErrorMessage();
//     expect(message).toContain('is required');
//     expect(loginPage.isValidUrl()).toBe(true);
// });

// validUsers.forEach(({ username, password}) => {
//     test(`Should logged in successfully with valid credentials: ${username}`, async ({ loginPage }) => {
//         await loginPage.fillUserPassword(username, password);
//         await loginPage.clickLogin();
//         expect(await loginPage.getErrorMessage()).not.toContain('is required');
//         expect(loginPage.isValidUrl()).toBe(false);
//     });
// });

// test ('Selected and filled data should display as the data that was selected and filled', async ({ loginPage }) => {
//     await loginPage.clickSelectCompany('OumforTest');
//     await loginPage.fillUserPassword('6501', '1234');
//     await loginPage.clickLogin();
//     await loginPage.isValidUrl();

//     expect(await loginPage.getSelectCompany()).toBe('OumforTest');
//     expect(await loginPage.getUsername()).toBe('6501');
//     expect(await loginPage.getPassword()).toBe('1234');
// });


// test ('filled only username should display as the data that was selected and filled', async ({ loginPage }) => {
//     await loginPage.clickSelectCompany('OumforTest');
//     await loginPage.fillUserPassword('6501', '1234');
//     await loginPage.clickLogin();
//     await loginPage.isValidUrl();

//     expect(await loginPage.getSelectCompany()).toBe('OumforTest');
//     expect(await loginPage.getUsername()).toBe('6501');
//     expect(await loginPage.getPassword()).toBe('1234');
// });