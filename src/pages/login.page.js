import { Page } from "@playwright/test";
import { removeTrailingSlash } from "../utils";

export class LoginPage {
    baseURL = "https://hms.humansoft.co.th/auth/login";
    loginSuccessURL = "https://hms.humansoft.co.th/welcome";
    cssURL = "https://ccs.humansoft.co.th/auth/login";

    locatorCompany  = '#mat-select-0';
    locatorUsername = '[formcontrolname="email"]';
    locatorPassword = '[formcontrolname="password"]';
    locatorButtonLogin = '[aria-label="LOG IN"]';
    locatorAlertUsername = '#mat-error-3';
    locatorAlertPassword = '#mat-error-4';

    /**
    * @param {Page} page
    */

    constructor(page) {
        this.page = page;
    }

    /* Humansoft Web Application */

    async goto() {
        await this.page.goto(this.baseURL);
    }

    /* Input */
    async clickSelectCompany(company) {
        await this.page.waitForSelector(this.locatorCompany);
        await this.page.locator(this.locatorCompany).click();
        await this.page.waitForSelector('.cdk-overlay-pane mat-option');
        await this.page.locator(`.cdk-overlay-pane .mat-option-text >> text=${company}`).click();
    }

    async fillUsername(username) {
        await this.page.locator(this.locatorUsername).fill(username);
    }
    
    async fillPassword(password) {
        await this.page.locator(this.locatorPassword).fill(password);
    }
    
    async clickLogin() {
        await this.page.locator(this.locatorButtonLogin).click();
        await this.page.waitForURL(/welcome/);
        const currUrl = this.page.url();
        return currUrl;
    }

    async clickInputUsername() {
        await this.page.locator(this.locatorUsername).click();
    }

    async clickInputPassword() {
        await this.page.locator(this.locatorPassword).click();
    }

    /* Get Data */
    async getSelectCompany() {
        try {
            return await this.page.locator(this.locatorCompany).textContent();
        } catch (error) {
            console.log('getSelectCompany (error): ', error)
        }
        
        return"";
    }
    
    async getUsername() {
        try {
            return await this.page.locator(this.locatorUsername).inputValue();
        } catch (error) {
            console.log('getUsername (error): ', error)
        }

        return"";
    }

    async getPassword() {
        try {
            return await this.page.locator(this.locatorAlertPassword).inputValue();
        } catch (error) {
            console.log('getPassword (error): ', error)
        }

        return"";
    }

    async getAlertUsername() {
        try {
            return await this.page.locator(this.locatorAlertUsername).textContent() || "";            
        } catch (error) {
            console.log('getAlertUsername (error): ', error)
        }
  
        return"";
    }

    async getAlertPassword() {
        try {
            return await this.page.locator(this.locatorAlertPassword).textContent() || "";            
        } catch (error) {
            console.log('getAlertPassword (error): ', error)
        }

        return"";
    }

    /* Check and compare */
    async isValidUrl() {
        const url = removeTrailingSlash(this.page.url());
        return url === this.baseURL;
    }
}
