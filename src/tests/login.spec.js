import { expect } from "@playwright/test";
import { test } from "../pages/base";
import { validInputAtLogin, invalidInputAtLogin, validInputAtResetPassword, invalidInputAtResetPassword, } from "../test-data/users";
import { log } from "console";
import exp from "constants";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test.describe("Valid Input at Login Fuction", () => {
  validInputAtLogin.forEach(({ desc, company, credentials, url }, index) => {
    const formattedIndex = String(index + 1).padStart(3, "0");

    test(`TC_${formattedIndex}: Login successfully with ${desc}`, async ({ loginPage }) => {
      await loginPage.clickSelectCompany(company.name);
      expect(await loginPage.getSelectCompany()).not.toBeNull();
      expect(await loginPage.getSelectCompany()).toBe(company.name);

      await loginPage.fillUsername(credentials.username);
      expect(await loginPage.getUsername()).not.toBeNull();
      expect(await loginPage.getUsername()).toBe(credentials.username);

      await loginPage.fillPassword(credentials.password);
      expect(await loginPage.getPassword()).not.toBeNull();
      expect(await loginPage.getPassword()).toBe(credentials.password);

      await loginPage.clickLogin();
      await loginPage.getWelcomeUrl();
      expect(await loginPage.page.url()).toBe(url);
    });

    test(`TC_${formattedIndex}: Click show password`, async ({ loginPage }) => {
      await loginPage.fillPassword(credentials.password);
      expect(await loginPage.getPassword()).not.toBeNull();
      expect(await loginPage.getPassword()).toBe(credentials.password);
      expect(await loginPage.getClickShowPassword()).toBe('password');
    
      await loginPage.clickShowPassword();
      expect(await loginPage.getClickShowPassword()).toBe('text');
    
      await loginPage.clickHidePassword();
      expect(await loginPage.getClickShowPassword()).toBe('password');
    });
  });
});

test.describe("Invalid Input at Login Fuction", () => {
  invalidInputAtLogin.forEach(({ desc, company, credentials, url }, index) => {
  const formattedIndex = String(index + 1).padStart(3, "0");
    
    test(`TC_${formattedIndex}: Input fields ${desc}`, async ({ loginPage }) => {
      const loginButton = await loginPage.locateLoginButton();
      expect(loginButton).toBeDisabled();
      
      await loginPage.clickSelectCompany(company.name);
      expect(await loginPage.getSelectCompany()).not.toBeNull();
      expect(await loginPage.getSelectCompany()).toBe(company.name);
      
      await loginPage.fillUsername(credentials.username);
      expect(await loginPage.getUsername()).not.toBeNull();
      expect(await loginPage.getUsername()).toBe(credentials.username);
      
      await loginPage.fillPassword(credentials.password);
      expect(await loginPage.getPassword()).not.toBeNull();
      expect(await loginPage.getPassword()).toBe(credentials.password);
      
      await loginPage.clickShowPassword();
      
      const getDataUsername = await loginPage.getUsername();
      // console.log("getDataUsername --> ", getDataUsername);
      const getDataPassword = await loginPage.getPassword();
      // console.log("getDataPassword --> ", getDataPassword);
      
      if (!getDataUsername) {
        expect(await loginPage.locateAlertUsername()).toBeVisible();
        
        const alertUsernameMessage = await loginPage.getAlertUsername();
        expect(alertUsernameMessage).toContain("กรุณาตรวจสอบชื่อผู้ใช้");
      } 
      else if (!getDataPassword) {
        expect(await loginPage.locateAlertPassword()).toBeVisible();
        
        const alertPasswordMessage = await loginPage.getAlertPassword();
        expect(alertPasswordMessage).toContain("กรุณาตรวจสอบรหัสผ่าน");
      }
      
      if (credentials.username && credentials.password) {
        expect(loginButton).toBeEnabled();
        await loginPage.clickLogin();
        
        const loginFailModal = await loginPage.locateLoginFailModal();
        // console.log('loginFailModal -->', loginFailModal);
        if (loginFailModal) {
          expect(loginFailModal).toBeVisible();
          const alertLoginFailMessage = await loginPage.getAlertLoginFailModal();
          expect(alertLoginFailMessage).toContain("ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง");
          await loginPage.clickConfirmModal();
        }
      } else {
        expect(loginButton).toBeDisabled();
      }
    });
  });
});

test.describe("Valid Input at Reset Password Function", () => {
  validInputAtResetPassword.forEach(({ desc, company, credentials }, index) => {
    const formattedIndex = String(index + 1).padStart(3, "0");

    test(`TC_${formattedIndex}: Modal reset password Input fields with ${desc}`, async ({ loginPage }) => {
      await loginPage.clickSelectCompany(company.name);
      expect(await loginPage.getSelectCompany()).not.toBeNull();
      expect(await loginPage.getSelectCompany()).toBe(company.name);
      
      await loginPage.clickForgetPassword();
      const resetPasswordModal = await loginPage.locateResetPasswordModal();
      expect(resetPasswordModal).toBeVisible();
      
      const resetButton = await loginPage.locateResetButton();
      expect(resetButton).toBeDisabled();
      
      const getCompanyAtResetPassword = await loginPage.getSelectCompanyAtResetPassword(company.name);
      expect(getCompanyAtResetPassword).not.toBeNull();
      expect(getCompanyAtResetPassword).toBe(company.name);
      
      expect (await loginPage.getSelectCompanyAtResetPassword() === await loginPage.getSelectCompany()).toBe(true);

      await loginPage.fillUsernameAtResetPassword(credentials.username);
      const getUsernameAtResetPassword = await loginPage.getUsernameAtResetPassword();
      expect(getUsernameAtResetPassword).not.toBeNull();
      expect(getUsernameAtResetPassword).toBe(credentials.username);

      if (credentials.resetRadio == "email") {
        await loginPage.clickEmailRadio();

        const emailRadio = await loginPage.locateEmailRadio();
        expect(emailRadio).toBeChecked();
     
        if (getCompanyAtResetPassword && getUsernameAtResetPassword) {
          expect(resetButton).toBeEnabled();  
          await loginPage.clickResetPassword();

          expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

          const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
          // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
          expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง Email ไปที่');

          await loginPage.clickConfirmModal();
        } else {
          expect(resetButton).toBeDisabled();  
        }
      } else if (credentials.resetRadio == "mobilephone") {
        await loginPage.clickMobilePhoneRadio();
        
        const mobilephoneRadio = await loginPage.locateMobilePhoneRadio();
        expect(mobilephoneRadio).toBeChecked();
        
        if (getCompanyAtResetPassword && getUsernameAtResetPassword) {
          expect(resetButton).toBeEnabled();  
          await loginPage.clickResetPassword();

          expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

          const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
          // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
          expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง ข้อความ ไปที่');

          await loginPage.clickConfirmModal();

          const OTPModal = await loginPage.locateOTPModal();
          // console.log('OTPModal -->', OTPModal);
          if (OTPModal) {
            expect(OTPModal).toBeVisible();
            expect(resetButton).toBeDisabled();  
          }
        } else {
          expect(resetButton).toBeDisabled();  
        }
      }
    });
  });
});
    
test.describe("Invalid Input at Reset Password Function", () => {
  invalidInputAtResetPassword.forEach(({ desc, company, credentials }, index) => {
    const formattedIndex = String(index + 1).padStart(3, "0");

    test(`TC_${formattedIndex}: Modal reset password Input fields without ${desc}`, async ({ loginPage }) => {
      await loginPage.clickSelectCompany(company.name);
      expect(await loginPage.getSelectCompany()).not.toBeNull();
      expect(await loginPage.getSelectCompany()).toBe(company.name);
      
      await loginPage.clickForgetPassword();
      const resetPasswordModal = await loginPage.locateResetPasswordModal();
      expect(resetPasswordModal).toBeVisible();
      
      const resetButton = await loginPage.locateResetButton();
      expect(resetButton).toBeDisabled();
      
      const getCompanyAtResetPassword = await loginPage.getSelectCompanyAtResetPassword(company.name);
      expect(getCompanyAtResetPassword).not.toBeNull();
      expect(getCompanyAtResetPassword).toBe(company.name);
      
      expect (await loginPage.getSelectCompanyAtResetPassword() === await loginPage.getSelectCompany()).toBe(true);

      await loginPage.fillUsernameAtResetPassword(credentials.username);
      const getUsernameAtResetPassword = await loginPage.getUsernameAtResetPassword();
      expect(getUsernameAtResetPassword).not.toBeNull();
      expect(getUsernameAtResetPassword).toBe(credentials.username);

      if (credentials.resetRadio == "email") {
        await loginPage.clickEmailRadio();

        const emailRadio = await loginPage.locateEmailRadio();
        expect(emailRadio).toBeChecked();
     
        if (getCompanyAtResetPassword && getUsernameAtResetPassword) {
          expect(resetButton).toBeEnabled();  
          
          await loginPage.clickResetPassword();

          expect(await loginPage.locateResetPasswordFailModal()).toBeVisible();

          // const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
          // // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
          // expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง Email ไปที่');

          const alertResetPasswordFailMessage = await loginPage.getAlertResetPasswordFailModal();
          expect(alertResetPasswordFailMessage).toContain('ผิดพลาด×ไม่สามารถคืนค่ารหัสผ่านได้');

          await loginPage.clickConfirmModal();
        } else {
          expect(resetButton).toBeDisabled();  
        }
      } else if (credentials.resetRadio == "mobilephone") {
        await loginPage.clickMobilePhoneRadio();
        
        const mobilephoneRadio = await loginPage.locateMobilePhoneRadio();
        expect(mobilephoneRadio).toBeChecked();
        
        if (getCompanyAtResetPassword && getUsernameAtResetPassword) {
          expect(resetButton).toBeEnabled();  
          await loginPage.clickResetPassword();

          expect(await loginPage.locateResetPasswordFailModal()).toBeVisible();

          // const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
          // // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
          // expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง ข้อความ ไปที่');

          const alertResetPasswordFailMessage = await loginPage.getAlertResetPasswordFailModal();
          expect(alertResetPasswordFailMessage).toContain('ผิดพลาด×ไม่สามารถคืนค่ารหัสผ่านได้');

          await loginPage.clickConfirmModal();

          expect(await loginPage.locateOTPModal()).toBeVisible();
        } else {
          expect(resetButton).toBeDisabled();  
        }
      }
    });
  });
});

test.describe("Manage Company Function", () => {
  test('TC_001: Click manage Company button', async ({ loginPage, context }) => {
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
    //ตรวจสอบ API
    // const response = await request.post('https://core.humansoft.co.th/api-web.php', {
    //     data: {
      //         _compgrp: "hrs",
      //         _comp: "users",
      //         _action: "identifier_user",
      //         user_name: "6501",
      //         user_psw: "5555",
      //         instance_server_id: "MjAyMjA0MDE1OEQ4Rjk1N0JEMjk=",
    //         instance_server_channel_id: "MjAyNDEyMjQ3NzM5QUI1RjY3RUY=",
    //         identify_user_id: "",
    //         employee_id: "",
    //         language_code: "TH"
    //     },
    // });
    // expect(response.status()).toBe(400); // ตรวจสอบสถานะ 201 (Created)
    // const data = await response.json();
    // expect(data.title).toBe('foo'); // ตรวจสอบค่าที่ส่งกลับ
    // expect(data.userId).toBe(1);

    // test('TC_001: Input fields without username and password', async ({ loginPage }) => {
    //     const loginButton = await loginPage.locateLoginButton();
    //     expect(loginButton).toBeDisabled();

    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     // await loginPage.fillUsername(null);
    //     // expect(await loginPage.getUsername()).toBe('');

    //     // await loginPage.fillPassword(null);
    //     // expect(await loginPage.getPassword()).toBe('');

    //     expect(loginButton).toBeDisabled();

    //     // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    // });

    // test('TC_002: Input fields without username', async ({ loginPage }) => {
    //     const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
    //     expect(loginButton).toBeDisabled();

    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     await loginPage.fillUsername(null);
    //     expect(await loginPage.getUsername()).toBe('');

    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('1234');

    //     const alertUsernameMessage = await loginPage.getAlertUsername();
    //     expect(alertUsernameMessage).toContain('กรุณาตรวจสอบชื่อผู้ใช้');

    //     expect(loginButton).toBeDisabled();

    //     // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    // });

    // test('TC_003: Input fields without password', async ({ loginPage }) => {
    //     const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
    //     expect(loginButton).toBeDisabled();

    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     await loginPage.fillPassword(null);
    //     expect(await loginPage.getPassword()).toBe('');

    //     await loginPage.fillUsername('6501');
    //     expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).toBe('6501');

    //     const alertPasswordMessage = await loginPage.getAlertPassword();
    //     expect(alertPasswordMessage).toContain('กรุณาตรวจสอบรหัสผ่าน');

    //     expect(loginButton).toBeDisabled();

    //     // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    // });

    // test('TC_004: Login fails with an error message when using invalid credentials', async ({ loginPage }) => {
    //         const loginButton = await loginPage.locateLoginButton(); // ตรวจสอบว่าปุ่ม Login ถูก disable ตั้งแต่เริ่มต้น
    //         // expect(loginButton).toBeDisabled();

    //     await loginPage.clickSelectCompany('OumforTest');
    //         expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     await loginPage.fillUsername('6501');
    //         expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).toBe('6501');

    //     await loginPage.fillPassword('5678');
    //         expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('5678');

    //         expect(loginButton).not.toBeDisabled();

    //         await loginPage.clickLogin();

    //         expect(await loginPage.locateLoginFailModal()).toBeVisible();

    //         const alertLoginFailMessage = await loginPage.getAlertLoginFailModal();
    //         expect(alertLoginFailMessage).toContain('ชื่อผู้ใช้ หรือ รหัสผ่าน ไม่ถูกต้อง');

    //         await loginPage.clickConfirmModal();

    //         // expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/auth/login');
    // });

    // test('TC_005: Login successfully with valid credentials', async ({ loginPage }) => {
    //     await loginPage.clickSelectCompany('OumforTest');
    //         expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     await loginPage.fillUsername('6501');
    //         expect(await loginPage.getUsername()).not.toBeNull();
    //     expect(await loginPage.getUsername()).toBe('6501');

    //     await loginPage.fillPassword('1234');
    //         expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('1234');

    //         await loginPage.clickLogin();
    //         await loginPage.getWelcomeUrl();
    //         expect (await loginPage.page.url()).toBe('https://hms.humansoft.co.th/welcome');
    // });

    // test('TC_006: Click show password', async ({ loginPage }) => {
    //     await loginPage.fillPassword('1234');
    //     expect(await loginPage.getPassword()).not.toBeNull();
    //     expect(await loginPage.getPassword()).toBe('1234');
    //     expect(await loginPage.getClickShowPassword()).toBe('password');

    //     await loginPage.clickShowPassword();
    //     expect(await loginPage.getClickShowPassword()).toBe('text');

    //     await loginPage.clickHidePassword();
    //     expect(await loginPage.getClickShowPassword()).toBe('password');
    // });

    // test('TC_007: Click forgot password', async ({ loginPage }) => {
    //     await loginPage.clickSelectCompany('OumforTest');
    //     expect(await loginPage.getSelectCompany()).not.toBeNull();
    //     expect(await loginPage.getSelectCompany()).toBe('OumforTest');

    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const getCompanySelectionButton = await loginPage.getSelectCompanyAtResetPassword();
    //     expect(getCompanySelectionButton).not.toBeNull();
    //     expect(getCompanySelectionButton).toBe('OumforTest');

    //     expect (await loginPage.getSelectCompanyAtResetPassword() === await loginPage.getSelectCompany()).toBe(true);
    // });

    // test('TC_008: Modal reset password Input fields without username', async ({ loginPage }) => {
    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const resetButton = await loginPage.locateResetButton();
    //     expect(resetButton).toBeDisabled();
    // });

    // test('TC_009: Modal reset password Input fields with invalid username select email', async ({ loginPage }) => {
    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const resetButton = await loginPage.locateResetButton();
    //     expect(resetButton).toBeDisabled();

    //     await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

    //     await loginPage.fillUsernameAtResetPassword('1111');
    //     expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getUsernameAtResetPassword()).toBe('1111');

    //     expect(resetButton).toBeEnabled();

    //     // await loginPage.clickEmailVertifyButton();

    //     await loginPage.clickResetPassword();

    //     expect(await loginPage.locateResetPasswordFailModal()).toBeVisible();

    //     const alertResetPasswordFailMessage = await loginPage.getAlertResetPasswordFailModal();
    //     expect(alertResetPasswordFailMessage).toContain('ผิดพลาด×ไม่สามารถคืนค่ารหัสผ่านได้');

    //     await loginPage.clickConfirmModal();

    // });

    // test('TC_010: Modal reset password Input fields with invalid username select phone', async ({ loginPage }) => {
    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const resetButton = await loginPage.locateResetButton();
    //     expect(resetButton).toBeDisabled();

    //     await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

    //     await loginPage.fillUsernameAtResetPassword('1111');
    //     expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getUsernameAtResetPassword()).toBe('1111');

    //     expect(resetButton).toBeEnabled();

    //     await loginPage.clickPhoneVertifyButton();

    //     await loginPage.clickResetPassword();

    //     expect(await loginPage.locateResetPasswordFailModal()).toBeVisible();

    //     const alertResetPasswordFailMessage = await loginPage.getAlertResetPasswordFailModal();
    //     // console.log('alertResetPasswordFailMessage ---> ', alertResetPasswordFailMessage)
    //     expect(alertResetPasswordFailMessage).toContain('ผิดพลาด×ไม่สามารถคืนค่ารหัสผ่านได้');

    //     await loginPage.clickConfirmModal();
    // });

    // test('TC_011: Modal reset password Input fields with valid username select email', async ({ loginPage }) => {
    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const resetButton = await loginPage.locateResetButton();
    //     expect(resetButton).toBeDisabled();

    //     await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

    //     await loginPage.fillUsernameAtResetPassword('6501');
    //     expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getUsernameAtResetPassword()).toBe('6501');

    //     expect(resetButton).toBeEnabled();

    //     // await loginPage.clickEmailVertifyButton();

    //     await loginPage.clickResetPassword();

    //     expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

    //     const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
    //     // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
    //     expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง Email ไปที่');

    //     await loginPage.clickConfirmModal();
    // });

    // test('TC_012: Modal reset password Input fields with valid username select email', async ({ loginPage }) => {
    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const resetButton = await loginPage.locateResetButton();
    //     expect(resetButton).toBeDisabled();

    //     await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

    //     await loginPage.fillUsernameAtResetPassword('6501');
    //     expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getUsernameAtResetPassword()).toBe('6501');

    //     expect(resetButton).toBeEnabled();

    //     await loginPage.clickPhoneVertifyButton();

    //     await loginPage.clickResetPassword();

    //     expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

    //     const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
    //     // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
    //     expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง ข้อความ ไปที่');

    //     await loginPage.clickConfirmModal();

    //     expect(await loginPage.locateOtpModal()).toBeVisible();
    // });

    // test('TC_013: Modal Confirm OTP Input fields without OTP', async ({ loginPage }) => {
    //     await loginPage.clickForgetPassword();
    //     expect (await loginPage.locateResetPasswordModal()).toBeVisible();

    //     const resetButton = await loginPage.locateResetButton();
    //     expect(resetButton).toBeDisabled();

    //     await loginPage.clickSelectCompanyAtResetPassword('OumforTest');
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getSelectCompanyAtResetPassword()).toBe('OumforTest');

    //     await loginPage.fillUsernameAtResetPassword('6501');
    //     expect(await loginPage.getUsernameAtResetPassword()).not.toBeNull();
    //     expect(await loginPage.getUsernameAtResetPassword()).toBe('6501');

    //     expect(resetButton).toBeEnabled();

    //     await loginPage.clickPhoneVertifyButton();

    //     await loginPage.clickResetPassword();

    //     expect(await loginPage.locateResetPasswordSuccessModal()).toBeVisible();

    //     const alertResetPasswordSuccessMessage = await loginPage.getAlertResetPasswordSuccessModal();
    //     // console.log('alertResetPasswordSuccessMessage ---> ', alertResetPasswordSuccessMessage)
    //     expect(alertResetPasswordSuccessMessage).toContain('สำเร็จ×ระบบได้ส่ง ข้อความ ไปที่');

    //     await loginPage.clickConfirmModal();

    //     expect(await loginPage.locateOtpModal()).toBeVisible();

    //     expect(resetButton).toBeDisabled();
    // });

    // test('TC_014: Click Manage Company button', async ({ loginPage, context }) => {
    //     await loginPage.clicktoCCS();

    //     // รอการเปิดแท็บใหม่
    //     const newCCSPage = await context.waitForEvent('page'); // รอแท็บใหม่ถูกเปิด

    //     // รอให้แท็บใหม่โหลดเสร็จ
    //     await newCCSPage.waitForLoadState();

    //     // ตรวจสอบ URL ของแท็บใหม่
    //     const newCCSPageUrl = newCCSPage.url();
    //     // console.log('URL ของแท็บใหม่:', newCCSPageUrl);

    //     // คาดหวังว่า URL จะเป็นค่าที่กำหนด
    //     expect(newCCSPageUrl).toBe('https://ccs.humansoft.co.th/auth/login');

    // });