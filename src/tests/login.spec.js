import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { LoginPage } from "../pages/login.page";
import { validUsers, problemUsers } from "../test-data/users";

test.describe('Login Page', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test('TC_001: Choose company from select list', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
    });

    test('TC_002: Filled Username', async ({ loginPage }) => {
        await loginPage.fillUsername('6501');
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getUsername()).toBe('6501');
    });

    test('TC_003: Not fill Username', async ({ loginPage }) => {
        await loginPage.fillUsername('');
        expect(await loginPage.getUsername()).toBe('');

        await loginPage.clickInputPassword();

        const alertMessage = await loginPage.getAlertUsername();
        expect(alertMessage).toContain('กรุณาตรวจสอบชื่อผู้ใช้');  
    });
    
    test('TC_004: Filled Password', async ({ loginPage }) => {
        await loginPage.fillPassword('1234');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('1234');
    });
    
    test.only('TC_005: Not Fill Password', async ({ loginPage }) => {
        await loginPage.clickInputPassword();
        // await loginPage.fillPassword('');
        // expect(await loginPage.getPassword()).toBe('');
        await loginPage.clickInputUsername();

        const alertMessage = await loginPage.getAlertPassword();
        expect(alertMessage).toContain('กรุณาตรวจสอบรหัสผ่าน');  
    });

    test('TC_006: Click show password button', async ({ loginPage }) => {
    
    });

    test('TC_007: Selected and filled company, username and password data to login', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));

        await loginPage.fillUsername('6501');
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getUsername()).toBe('6501');
        
        await loginPage.fillPassword('1234');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('1234');

        await loginPage.clickLogin();
        expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/welcome');
    });

    test('TC_008: Choose company from select list', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
    });

    // test('TC_002: Filled Username', async ({ loginPage }) => {
    //     await loginPage.fillUsername('6501');
    //     expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).toBe('6501');
    // });

    // test.only('TC_003: Not fill Username', async ({ loginPage }) => {
    //     await loginPage.fillUsername('');
    //     expect(await loginPage.getUsername()).toBe('');

    //     await loginPage.fillPassword('1234');
    //     // expect(await loginPage.getPassword()).toBe('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();

    //     const message = await loginPage.getAlertUsername();
    //     expect(message).toContain('กรุณาตรวจสอบชื่อผู้ใช้');  
        
    //     await loginPage.clickLogin();
    //     expect(await loginPage.clickLogin()).toBeDisabled();
    // });
    
    // test('TC_004: Filled Password', async ({ loginPage }) => {
    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('1234');
    // });
    
    // test('TC_005: Not Filled Password', async ({ loginPage }) => {
    //     await loginPage.fillPassword('');
    //     expect(await loginPage.getPassword()).toBeNull();
    //     expect(await loginPage.getAlertPassword()).toBeVisible();
    //     expect(await loginPage.getAlertPassword()).toBe('กรุณาตรวจสอบรหัสผ่าน'); 
    // });

    // test('TC_006: Click show password button', async ({ loginPage }) => {
    //     await loginPage.fillPassword('');
    //     expect(await loginPage.getPassword()).toBeNull();
    //     expect(await loginPage.getAlertPassword()).toBeVisible();
    // });

    // test('TC_007: Selected and filled company, username and password data to login', async ({ loginPage }) => {
    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany('OumforTest'));

    //     await loginPage.fillUsername('6501');
    //     expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).not.toBe('6501');
        
    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).not.toBe('1234');

    //     await loginPage.clickLogin();
    //     expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/welcome');
    // });

    // test('TC_001: Choose company from select list', async ({ loginPage }) => {
    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');
    // });

    // test('TC_002: Filled Username', async ({ loginPage }) => {
    //     await loginPage.fillUsername('6501');
    //     expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).toBe('6501');
    // });

    // test.only('TC_003: Not fill Username', async ({ loginPage }) => {
    //     await loginPage.fillUsername('');
    //     expect(await loginPage.getUsername()).toBe('');

    //     await loginPage.fillPassword('1234');
    //     // expect(await loginPage.getPassword()).toBe('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();

    //     const message = await loginPage.getAlertUsername();
    //     expect(message).toContain('กรุณาตรวจสอบชื่อผู้ใช้');  
        
    //     await loginPage.clickLogin();
    //     expect(await loginPage.clickLogin()).toBeDisabled();
    // });
    
    // test('TC_004: Filled Password', async ({ loginPage }) => {
    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('1234');
    // });
    
    // test('TC_005: Not Filled Password', async ({ loginPage }) => {
    //     await loginPage.fillPassword('');
    //     expect(await loginPage.getPassword()).toBeNull();
    //     expect(await loginPage.getAlertPassword()).toBeVisible();
    //     expect(await loginPage.getAlertPassword()).toBe('กรุณาตรวจสอบรหัสผ่าน'); 
    // });

    // test('TC_006: Click show password button', async ({ loginPage }) => {
    //     await loginPage.fillPassword('');
    //     expect(await loginPage.getPassword()).toBeNull();
    //     expect(await loginPage.getAlertPassword()).toBeVisible();
    // });

    // test('TC_007: Selected and filled company, username and password data to login', async ({ loginPage }) => {
    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany('OumforTest'));

    //     await loginPage.fillUsername('6501');
    //     expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).not.toBe('6501');
        
    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).not.toBe('1234');

    //     await loginPage.clickLogin();
    //     expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/welcome');
    // });
});

