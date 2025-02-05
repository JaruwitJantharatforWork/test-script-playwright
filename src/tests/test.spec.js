import { test } from "../pages/base";

const { expect } = require('@playwright/test');

// import fs from 'fs';
// import path from 'path';

// const testDataPath = path.resolve('src/test-data/login-test-data.json');
// const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

const fs = require('fs');

// อ่านข้อมูลจากไฟล์ JSON
const testData = JSON.parse(fs.readFileSync('src/test-data/login-test-data.json', 'utf-8'));

test.describe('Login and Reset Password Tests', () => {
  testData.tests.forEach(({ name, url, credentials, resetPassword, otp, action, expected }) => {
    test(name, async ({ loginPage }) => {
      await loginPage.goto(url);

      // ทดสอบการเข้าสู่ระบบ
      if (credentials) {
        const loginButton = await loginPage.locateLoginButton();
        expect(loginButton).toBeDisabled();
        await loginPage.clickSelectCompany(credentials.companyname);
        expect(await loginPage.getSelectCompany()).not.toBeNull();
        expect(await loginPage.getSelectCompany()).toBe(credentials.companyname);
        await loginPage.fillUsername(credentials.username);
        expect(await loginPage.getUsername()).not.toBeNull();
        expect(await loginPage.getUsername()).toBe(credentials.username);
        await loginPage.fillPassword(credentials.password);
        expect(await loginPage.getPassword()).not.toBeNull();
        expect(await loginPage.getPassword()).toBe(credentials.password);   

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
          await loginPage.getWelcomeUrl();
          expect(await loginPage.page.url()).toBe(url);

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
      }

      // เคสกดปุ่ม "Forgot Password"
      if (action === "clickForgotPassword") {
        await loginPage.click('#forgot-password');
        const modal = await loginPage.isVisible('#reset-password-modal');
        expect(modal).toBe(expected.modalVisible);
      }

      // // เคส Reset Password
      if (resetPassword) {
        await loginPage.fill('#res et-username', resetPassword.username);
        if (resetPassword.method === "email") {
          await loginPage.check('#select-email');
        } else if (resetPassword.method === "phone") {
          await loginPage.check('#select-phone');
        }
        await loginPage.click('#submit-reset');
      }

      // เคส OTP
      if (otp !== undefined) {
        await loginPage.fill('#otp-input', otp);
        await loginPage.click('#confirm-otp');
      }

      // เคสกดปุ่ม "Manage Company"
      if (action === "clickManageCompany") {
        await loginPage.click('#manage-company-button');
        await expect(loginPage).toHaveURL(expected.navigate);
      }

      // ตรวจสอบข้อความผลลัพธ์
      if (expected.message) {
        const messageLocator = loginPage.locator('.success-message, .error-message');
        await expect(messageLocator).toHaveText(expected.message);
      }
    });
  });
});