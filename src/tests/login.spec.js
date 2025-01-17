import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { LoginPage } from "../pages/login.page";
import { validUsers, problemUsers } from "../test-data/users";
import { log } from "console";

test.describe('Login Page', () => {
    
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });
    
    test('TC_001: Input fields without username and password', async ({ loginPage }) => {
        const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
        expect(loginButton).toBeDisabled();
    
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));
    
        await loginPage.fillUsername(null);
        expect(await loginPage.getUsername()).toBe('');
        
        await loginPage.fillPassword(null);
        expect(await loginPage.getPassword()).toBe('');
    
        expect(loginButton).toBeDisabled();
    
        // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    });

    test('TC_002: Input fields without username', async ({ loginPage }) => {
        const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
        expect(loginButton).toBeDisabled();

        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));
    
        await loginPage.fillUsername(null);
        expect(await loginPage.getUsername()).toBe('');
        
        await loginPage.fillPassword('1234');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('1234');
        
        const alertUsernameMessage = await loginPage.getAlertUsername();
        expect(alertUsernameMessage).toContain('กรุณาตรวจสอบชื่อผู้ใช้');  

        expect(loginButton).toBeDisabled();

        // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    });

    test('TC_003: Input fields without password', async ({ loginPage }) => {
        const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
        expect(loginButton).toBeDisabled();
        
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));
        
        await loginPage.fillPassword(null);
        expect(await loginPage.getPassword()).toBe('');
        
        await loginPage.fillUsername('6501');
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getUsername()).toBe('6501');

        const alertPasswordMessage = await loginPage.getAlertPassword();
        expect(alertPasswordMessage).toContain('กรุณาตรวจสอบรหัสผ่าน');  

        expect(loginButton).toBeDisabled();
    
        // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    });
    
    test('TC_004: Login fails with an error message when using invalid credentials', async ({ loginPage }) => {
        const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
        // expect(loginButton).toBeDisabled();
        
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));
        
        await loginPage.fillUsername('6501');
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getUsername()).toBe('6501');
        
        await loginPage.fillPassword('5678');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('5678');

        expect(loginButton).not.toBeDisabled();

        await loginPage.clickLogin();

        expect(await loginPage.locateLoginFailModal()).toBeVisible();

        const alertLoginFailMessage = await loginPage.getAlertLoginFailModal();
        expect(alertLoginFailMessage).toContain('ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง');

        await loginPage.clickConfirmModal();
        
        // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    });

    test('TC_005: Login successfully with valid credentials', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));
        
        await loginPage.fillUsername('6501');
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getUsername()).toBe('6501');
        
        await loginPage.fillPassword('1234');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('1234');
        
        await loginPage.clickLogin();
        await loginPage.getWelcomeUrl();
        expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/welcome');
    });
    
    test.only('TC_006: Click show password', async ({ loginPage }) => {
        await loginPage.fillPassword('1234');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('1234');
        
        // await loginPage.clickShowPassword();
        // const passwordInput = await loginPage.clickInputPassword();
        // expect(await expect(passwordInput).toHaveAttribute('type', 'text'));

        // ดึง input และปุ่มไอคอน show/hide
        const passwordInput = await loginPage.getPassword();
        const toggleButton = await loginPage.clickShowPassword();

        // ตรวจสอบว่าเริ่มต้น type เป็น "password"
        await expect(passwordInput).toHaveAttribute('type', 'password');

        // คลิกปุ่ม Show/Hide Password
        await toggleButton.click();

        // ตรวจสอบว่า type เปลี่ยนเป็น "text"
        await expect(passwordInput).toHaveAttribute('type', 'text');

        // คลิกอีกครั้งเพื่อซ่อนรหัสผ่าน
        await toggleButton.click();

        // ตรวจสอบว่า type กลับเป็น "password"
        await expect(passwordInput).toHaveAttribute('type', 'password');
    });
    
    // test('TC_006: Not Fill Password', async ({ loginPage }) => {
    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     await loginPage.fillUsername('6501');
    //     expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).toBe('6501');
        
    //     await loginPage.fillPassword('');
    //     expect(await loginPage.getPassword()).toBe('');
    //     await loginPage.clickInputUsername();
        
    //     const alertMessage = await loginPage.getAlertPassword();
    //     expect(alertMessage).toContain('กรุณาตรวจสอบรหัสผ่าน');  
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
    
    // test('TC_004: Filled Password', async ({ loginPage }) => {
    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('1234');
    // });
    
    



    test('TC_010 Selected company without username and password data to login', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany('OumforTest'));

        await loginPage.fillUsername('');
        expect(await loginPage.getUsername()).toBe('');
        
        await loginPage.fillPassword('');
        expect(await loginPage.getPassword()).toBe('');

        // await loginPage.clickLogin();
        // const isDisabled = (await loginPage.clickLogin()).isDisabled();
        // expect (isDisabled).toBe(true);

        expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    });
    
    test('TC_011: Click forget password', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        await page.locator('div').filter({ hasText: /^คืนค่ารหัสผ่าน$/ }).first().click();
    });
    
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

