import { Page } from "@playwright/test";
import { removeTrailingSlash } from "../utils";

export class LoginPage {
    baseURL = "https://hms.humansoft.co.th/auth/login";
    
    locatorCompany  = '#mat-select-0';
    locatorCompanyAtResetpassword  = '#mat-select-1';
    locatorUsername = '[formcontrolname="email"]';
    locatorUsernameAtResetPassword = '#mat-input-4';
    locatorPassword = '[formcontrolname="password"]';
    locatorLoginButton = '[aria-label="LOG IN"]';
    locatorAlertUsername = '#mat-error-3';
    locatorAlertPassword = '#mat-error-4'; 
    locatorFailModal = '.swal2-popup.swal2-icon-error';
    locatorSuccessModal = '.swal2-popup.swal2-icon-success';
    locateConfirmModalButton = '.swal2-confirm.swal2-styled';
    locatorCCS = '[aria-label="go to CCS"]';
    locatorForgotPassword = 'a.ng-tns-c485-2';
    locatorResetPasswordModal = '#login-modal-component';
    locatorResetPasswordButton = '[aria-label="reset"]';
    locatorOTPModal = '#login-modal-component';
    locatorRadioGroup  = 'nz-radio-group';
    locatorEmailRadio = 'label[nzvalue="email"]';
    locatorMobilePhoneRadio  = 'label[nzvalue="mobilephone"]'; 

    /**
    * @param {Page} page
    */

    constructor(page) {
        this.page = page;
    }

    /* Humansoft Web Application */

    async goto() {
        await this.page.goto(this.baseURL);
    };

    async gotoCCS() {
        await this.page.goto(this.ccsURL);
    };    
    
    /* Locator */

    async locateUsername() {
        return this.page.locator(this.locatorUsername);
    };

    async locatePassword() {
        return this.page.locator(this.locatorPassword);
    };

    async locateShowPassword() {
        return await this.page.locator('mat-icon', { hasText: 'visibility_off' });
    }
    
    async locateLoginButton() {
        await this.page.waitForSelector(this.locatorLoginButton);
        return this.page.locator(this.locatorLoginButton);
    };
    
    async locateLoginFailModal() {
        return this.page.locator(this.locatorFailModal);
    };
    
    async locateResetPasswordFailModal() {
        await this.page.waitForSelector(this.locatorFailModal);
        return this.page.locator(this.locatorFailModal);
    };

    async locateResetPasswordSuccessModal() {
        await this.page.waitForSelector(this.locatorSuccessModal);
        return this.page.locator(this.locatorSuccessModal);
    };

    async locateResetPasswordModal() {
        return this.page.locator(this.locatorResetPasswordModal);
    };

    async locateResetButton() {
        await this.page.waitForSelector(this.locatorResetPasswordButton);
        return this.page.locator(this.locatorResetPasswordButton);
    }

    async locateOTPModal() {
        return this.page.locator(this.locatorOTPModal);
    };

    async locateCCS() {
        return await this.page.locator(this.locatorCCS);
    };    

    async locateAlertUsername () {
        await this.page.waitForSelector(this.locatorAlertUsername);
        return await this.page.locator(this.locatorAlertUsername);
    };
   
    async locateAlertPassword () {
        await this.page.waitForSelector(this.locatorAlertPassword);
        return await this.page.locator(this.locatorAlertPassword);
    };

    async locateEmailRadio() {
        return await this.page.locator(this.locatorEmailRadio);
    };
    
    async locateMobilePhoneRadio() {
        return await this.page.locator(this.locatorMobilePhoneRadio);
    };

    /* Input */

    async clickSelectCompany(company) {
        await this.page.waitForSelector(this.locatorCompany);
        await this.page.locator(this.locatorCompany).click();
        await this.page.waitForSelector('.cdk-overlay-pane mat-option');
        await this.page.locator(`.cdk-overlay-pane .mat-option-text >> text=${company}`).click();
    };
    
    async clickSelectCompanyAtResetPassword(company) {
        await this.page.waitForSelector(this.locatorCompanyAtResetpassword);
        await this.page.locator(this.locatorCompanyAtResetpassword).click();
        await this.page.waitForSelector('.cdk-overlay-pane mat-option');
        await this.page.locator(`.cdk-overlay-pane .mat-option-text >> text=${company}`).click();
    };

    async fillUsername(username) {
        await this.page.locator(this.locatorUsername).fill(username ?? '');
    };
    
    async fillPassword(password) {
        await this.page.locator(this.locatorPassword).fill(password ?? '');
    };

    async fillUsernameAtResetPassword(username) {
        await this.page.locator(this.locatorUsernameAtResetPassword).fill(username ?? '');
    };
    
    async clickLogin() {
        await this.page.locator(this.locatorLoginButton).click();
    };

    async clickInputUsername() {
        await this.page.locator(this.locatorUsername).click();
    };

    async clickInputPassword() {
        await this.page.locator(this.locatorPassword).click();
    };

    async clickShowPassword() {
        await this.page.waitForSelector('mat-icon', { state: 'visible' });
        await this.page.locator('mat-icon', { hasText: 'visibility_off' }).click();
    };
    
    async clickHidePassword() {
        await this.page.waitForSelector('mat-icon', { state: 'visible' });
        await this.page.locator('mat-icon', { hasText: 'visibility' }).click();
    };

    async clickForgetPassword() {
        await this.page.getByText('ลืมรหัสผ่าน').click();
    };

    async clickConfirmModal() {
        await this.page.locator(this.locateConfirmModalButton).click();
    };    

    async clicktoCCS() {
        await this.page.locator(this.locatorCCS).click();
    };  

    async clickForgetPassword() {
        await this.page.locator(this.locatorForgotPassword).click();
    };

    async clickResetPassword() {
        await this.page.waitForSelector(this.locatorResetPasswordButton);
        await this.page.locator(this.locatorResetPasswordButton).click();
    };

    async clickEmailRadio() {
        await this.page.locator(this.locatorEmailRadio).click();
    };
    async clickMobilePhoneRadio() {
        await this.page.locator(this.locatorMobilePhoneRadio).click();
    };

    /* Get Data */

    async getSelectCompany() {
        try {
            return await this.page.locator(this.locatorCompany).textContent();
        } catch (error) {
            console.log('getSelectCompany (error): ', error)
        }
        
        return"";
    };
    
    async getSelectCompanyAtResetPassword() {
        try {
            return await this.page.locator(this.locatorCompanyAtResetpassword).textContent();
        } catch (error) {
            console.log('getSelectCompanyAtResetPassword (error): ', error)
        }
        
        return"";
    };
    
    async getUsername() {
        try {
            return await this.page.locator(this.locatorUsername).inputValue();
        } catch (error) {
            console.log('getUsername (error): ', error)
        }

        return"";
    };
    
    async getUsernameAtResetPassword() {
        try {
            return await this.page.locator(this.locatorUsernameAtResetPassword).inputValue();
        } catch (error) {
            console.log('getUsername (error): ', error)
        }

        return"";
    };

    async getPassword() {
        try {
            return await this.page.locator(this.locatorPassword).inputValue();
        } catch (error) {
            console.log('getPassword (error): ', error)
        }

        return"";
    };

    async getAlertUsername() {
        try {
            return await this.page.locator(this.locatorAlertUsername).textContent() || "";            
        } catch (error) {
            console.log('getAlertUsername (error): ', error)
        }
  
        return"";
    };

    async getAlertPassword() {
        try {
            return await this.page.locator(this.locatorAlertPassword).textContent() || "";            
        } catch (error) {
            console.log('getAlertPassword (error): ', error)
        }

        return"";
    };

    async getAlertLoginFailModal() {
        try {
            return await this.page.locator(this.locatorFailModal).textContent() || "";            
        } catch (error) {
            console.log('getAlertLoginFailModal (error): ', error)
        }

        return"";
    };
    
    async getAlertResetPasswordFailModal() {
        try {
            return await this.page.locator(this.locatorFailModal).textContent() || "";            
        } catch (error) {
            console.log('getAlertLoginFailModal (error): ', error)
        }

        return"";
    };
    
    async getAlertResetPasswordSuccessModal() {
        try {
            return await this.page.locator(this.locatorSuccessModal).textContent() || "";            
        } catch (error) {
            console.log('getAlertLoginFailModal (error): ', error)
        }

        return"";
    };

    async getClickShowPassword() {
        const attributeValue = await this.page.locator(this.locatorPassword).getAttribute('type'); 
        return attributeValue;
    }

    async getWelcomeUrl() {
        const currentUrl = this.page.url();  // ดึง current URL เป็น string
        // รอให้ URL เปลี่ยนแปลงและมีคำว่า "welcome"
        await this.page.waitForURL(url => /welcome/.test(url.href) && url.href !== currentUrl, { timeout: 5000 });
        const newUrl = await this.page.url(); 
        return newUrl;
        
        // const currentUrl = this.page.url();
      
        // // await this.page.waitForURL(url => url !== currentUrl, { timeout: 5000 });  
        // // return this.page.url();;   
        
        // await this.page.waitForURL(/welcome/);
        // await this.page.waitForURL(url => url !== currentUrl);  
        // const newUrl = await this.page.url(); 
        // return newUrl;
    };

    async getCCSUrl() {
        const currentUrl = this.page.url();  // ดึง current URL เป็น string
        // รอให้ URL เปลี่ยนแปลงและมีคำว่า "welcome"
        await this.page.waitForURL(url => /welcome/.test(url.href) && url.href !== currentUrl, { timeout: 5000 });
        const newUrl = await this.page.url(); 
        return newUrl;
    };

    /* Check and compare */
    async isValidUrl() {
        const url = removeTrailingSlash(this.page.url());
        return url === this.baseURL;
    };
}
