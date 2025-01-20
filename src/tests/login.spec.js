import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { LoginPage } from "../pages/login.page";
import { validUsers, problemUsers } from "../test-data/users";
import { log } from "console";
import exp from "constants";

test.describe('Login Page', () => {
    
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });
    
    test('TC_001: Input fields without username and password', async ({ loginPage }) => {
        const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
        expect(loginButton).toBeDisabled();
    
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
    
        // await loginPage.fillUsername(null);
        // expect(await loginPage.getUsername()).toBe('');
        
        // await loginPage.fillPassword(null);
        // expect(await loginPage.getPassword()).toBe('');
    
        expect(loginButton).toBeDisabled();
    
        // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    });

    test('TC_002: Input fields without username', async ({ loginPage }) => {
        const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
        expect(loginButton).toBeDisabled();

        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
    
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
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
        
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
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
        
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
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');
        
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
    
    test('TC_006: Click show password', async ({ loginPage }) => {
        await loginPage.fillPassword('1234');
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe('1234');
        expect(await loginPage.getClickShowPassword()).toBe('password');

        await loginPage.clickShowPassword(); 
        expect(await loginPage.getClickShowPassword()).toBe('text');
        
        await loginPage.clickHidePassword();
        expect(await loginPage.getClickShowPassword()).toBe('password');
    });
    
    test('TC_007: Click forgot password', async ({ loginPage }) => {
        await loginPage.clickSelectCompany('OumforTest');
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe('OumforTest');

        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();

        const getCompanySelectionButton = await loginPage.getSelectCompanyAtResetPassword();
        expect(getCompanySelectionButton).not.toBeNull();
        expect(getCompanySelectionButton).toBe('OumforTest');
        
        expect (await loginPage.getSelectCompanyAtResetPassword() === await loginPage.getSelectCompany()).toBe(true);
    });

    test('TC_008: Modal reset password Input fields without username', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();
        
        const resetButton = await loginPage.locateResetButton();
        expect(resetButton).toBeDisabled();
    });
   
    test('TC_009: Modal reset password Input fields with invalid username select email', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();
        
        const resetButton = await loginPage.locateResetButton();
        expect(resetButton).toBeDisabled();
        
        await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
        expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
        expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

        await loginPage.fillUsernameAtResetPassword('1111');
        expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
        expect(await loginPage.getUsernameAtResetPassword()).toBe('1111');

        expect(resetButton).toBeEnabled();

        // await loginPage.clickEmailVertifyButton();

        await loginPage.clickResetPassword();

        expect(await loginPage.locateResetPasswordFailModal()).toBeVisible();

        const alertResetPasswordFailMessage = await loginPage.getAlertResetPasswordFailModal();
        expect(alertResetPasswordFailMessage).toContain('ผิดพลาด×ไม่สามารถคืนค่ารหัสผ่านได้');

        await loginPage.clickConfirmModal();

    });

    test('TC_010: Modal reset password Input fields with invalid username select phone', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();

        const resetButton = await loginPage.locateResetButton();
        expect(resetButton).toBeDisabled();
        
        await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
        expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
        expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

        await loginPage.fillUsernameAtResetPassword('1111');
        expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
        expect(await loginPage.getUsernameAtResetPassword()).toBe('1111');
        
        expect(resetButton).toBeEnabled();

        await loginPage.clickPhoneVertifyButton();

        await loginPage.clickResetPassword();

        expect(await loginPage.locateResetPasswordFailModal()).toBeVisible();

        const alertResetPasswordFailMessage = await loginPage.getAlertResetPasswordFailModal();
        // console.log('alertResetPasswordFailMessage ---> ', alertResetPasswordFailMessage)
        expect(alertResetPasswordFailMessage).toContain('ผิดพลาด×ไม่สามารถคืนค่ารหัสผ่านได้');

        await loginPage.clickConfirmModal();
    });

    test('TC_011: Modal reset password Input fields with valid username select email', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();

        const resetButton = await loginPage.locateResetButton();
        expect(resetButton).toBeDisabled();
        
        await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
        expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
        expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

        await loginPage.fillUsernameAtResetPassword('6501');
        expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
        expect(await loginPage.getUsernameAtResetPassword()).toBe('6501');
        
        expect(resetButton).toBeEnabled();

        // await loginPage.clickEmailVertifyButton();

        await loginPage.clickResetPassword();

        expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

        const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
        // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
        expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง Email ไปที่');

        await loginPage.clickConfirmModal();
    });

    test('TC_012: Modal reset password Input fields with valid username select email', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();

        const resetButton = await loginPage.locateResetButton();
        expect(resetButton).toBeDisabled();
        
        await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
        expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
        expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

        await loginPage.fillUsernameAtResetPassword('6501');
        expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
        expect(await loginPage.getUsernameAtResetPassword()).toBe('6501');
        
        expect(resetButton).toBeEnabled();

        await loginPage.clickPhoneVertifyButton();

        await loginPage.clickResetPassword();

        expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

        const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
        // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
        expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง ข้อความ ไปที่');

        await loginPage.clickConfirmModal();

        expect(await loginPage.locateOtpModal()).toBeVisible();
    });

    test('TC_013: Modal Confirm OTP Input fields without OTP', async ({ loginPage }) => {
        await loginPage.clickForgetPassword();
        expect (await loginPage.locateResetPasswordModal()).toBeVisible();

        const resetButton = await loginPage.locateResetButton();
        expect(resetButton).toBeDisabled();
        
        await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
        expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
        expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

        await loginPage.fillUsernameAtResetPassword('6501');
        expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
        expect(await loginPage.getUsernameAtResetPassword()).toBe('6501');
        
        expect(resetButton).toBeEnabled();

        await loginPage.clickPhoneVertifyButton();

        await loginPage.clickResetPassword();

        expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

        const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
        // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
        expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง ข้อความ ไปที่');

        await loginPage.clickConfirmModal();

        expect(await loginPage.locateOtpModal()).toBeVisible();

        expect(resetButton).toBeDisabled();
    });

    test('TC_014: Click Manage Company button', async ({ loginPage, context }) => {
        await loginPage.clicktoCCS();

        // รอการเปิดแท็บใหม่
        const newCCSPage = await context.waitForEvent('page'); // รอแท็บใหม่ถูกเปิด

        // รอให้แท็บใหม่โหลดเสร็จ
        await newCCSPage.waitForLoadState();

        // ตรวจสอบ URL ของแท็บใหม่
        const newCCSPageUrl = newCCSPage.url();
        // console.log('URL ของแท็บใหม่:', newCCSPageUrl);

        // คาดหวังว่า URL จะเป็นค่าที่กำหนด
        expect(newCCSPageUrl).toBe('https://ccs.humansoft.co.th/auth/login');

    });
});

