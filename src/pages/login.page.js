import { Page } from "@playwright/test";
import { removeTrailingSlash } from "../utils";

export class LoginPage {
    baseURL = "https://hms.humansoft.co.th/auth/login";

    locatorCompany  = '#mat-select-0';
    locatorUsername = '[formcontrolname="email"]';
    locatorPassword = '[formcontrolname="password"]';
    locatorLoginButton = '[aria-label="LOG IN"]';
    locatorAlertUsername = '#mat-error-3';
    locatorAlertPassword = '#mat-error-4'; 
    locatorLoginFailModal = '.swal2-popup.swal2-icon-error';
    locateConfirmModalButton = '.swal2-confirm.swal2-styled';

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
    
    /* Locator */

    async locateUsername() {
        return this.page.locator(this.locatorUsername);
    };

    async locatePassword() {
        return this.page.locator(this.locatorPassword);
    };
    
    async locateLoginButton() {
        return this.page.locator(this.locatorLoginButton);
    };
    
    async locateLoginFailModal() {
        return this.page.locator(this.locatorLoginFailModal);
    };

    /* Input */

    async clickSelectCompany(company) {
        await this.page.waitForSelector(this.locatorCompany);
        await this.page.locator(this.locatorCompany).click();
        await this.page.waitForSelector('.cdk-overlay-pane mat-option');
        await this.page.locator(`.cdk-overlay-pane .mat-option-text >> text=${company}`).click();
    };

    async fillUsername(username) {
        await this.page.locator(this.locatorUsername).fill(username ?? '');
    };
    
    async fillPassword(password) {
        await this.page.locator(this.locatorPassword).fill(password ?? '');
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
        await this.page.locator('mat-icon', { hasText: 'visibility_off' });
    };

    async clickForgetPassword() {
        await this.page.getByText('ลืมรหัสผ่าน').click();
    };

    async clickConfirmModal() {
        await this.page.locator(this.locateConfirmModalButton).click();
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
    
    async getUsername() {
        try {
            return await this.page.locator(this.locatorUsername).inputValue();
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
            return await this.page.locator(this.locatorLoginFailModal).textContent() || "";            
        } catch (error) {
            console.log('getAlertLoginFailModal (error): ', error)
        }

        return"";
    };

    async getWelcomeUrl() {
        // const currentUrl = this.page.url();
      
        // // await this.page.waitForURL(url => url !== currentUrl, { timeout: 5000 });  
        // // return this.page.url();;   
        
        // await this.page.waitForURL(/welcome/);
        // await this.page.waitForURL(url => url !== currentUrl);  
        // const newUrl = await this.page.url(); 
        // return newUrl;

        
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
