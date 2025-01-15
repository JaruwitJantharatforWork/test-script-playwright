import { Page } from "@playwright/test";
import { removeSlashUrl } from "../utils";

export class LoginPage {
    baseURL = "https://hms.humansoft.co.th/auth/login";

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

    async goto() {
        await this.page.goto(this.baseURL);
    }

    /* Humansoft Web Application */

    async clickSelectCompany(company) {
        // console.log('company --->',company)
        // console.log('locatorCompany --->',this.locatorCompany)
        await this.page.waitForSelector(this.locatorCompany);
        await this.page.locator(this.locatorCompany).click();
        await this.page.waitForSelector('.cdk-overlay-pane mat-option');
        await this.page.locator(`.cdk-overlay-pane .mat-option-text >> text=${company}`).click();
    //     console.log('text --->',`text=${company}`)
    }

    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUsername).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }

    async getSelectCompany() {
        await this.page.locator(this.locatorCompany).textContent();
    }

    async getUsername() {
        await this.page.locator(this.locatorUsername).inputValue();
    }

    async getPassword() {
        await this.page.locator(this.locatorPassword).inputValue();
    }

    async clickLogin() {
        await this.page.locator(this.locatorButtonLogin).click();
    }

    async getAlertUsername() {
        try {
          return await this.page.locator(this.locatorAlertUsername).textContent() || "";            
        } catch (error) {
            
        }

        return"";
    }

    async getAlertPassword() {
        try {
          return await this.page.locator(this.locatorAlertPassword).textContent() || "";            
        } catch (error) {
            
        }

        return"";
    }

    async isValidUrl() {
        // console.log(this.page.url());
        // console.log(this.page.url() === this.baseURL);

        const url = removeSlashUrl(this.page.url());
        return url === this.baseURL;
        // console.log(url, this.baseURL)
        // console.log(url === this.baseURL)
    }
}
