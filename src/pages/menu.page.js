import { Page } from "@playwright/test";

export class MenuPage {
    locatorDashboard = '.nav-link dashboard-active-menu';
    locatorCollapsable = 'fuse-nav-vertical-collapsable.nav-collapsable.nav-item.ng-star-inserted';
    locatorChildItem = 'nav-child-vertical-item.nav-item.ng-star-inserted';
    locatorChildCollapsable = 'nav-child-vertical-collapsable.nav-item.ng-star-inserted';
    
    /**
     * @param { Page } page
     */

    constructor(page) {
        this.page = page;
    }

    async locateDashboard() {
        return this.page.locator(this.locatorDashboard);
    }
    
    async clickDashboard() {
        await this.page.locator(this.locatorDashboard).click();
    }

    async clickCollapsable(menu_name) {
        await this.page.waitForSelector(this.locatorCollapsable, { state: 'visible' });
        await this.page.locator(this.locatorCollapsable).filter({ hasText: menu_name }).click();
    }

    async clickChildItem(menu_name) {
        await this.page.waitForSelector(this.locatorChildItem, { state: 'visible' });
        await this.page.locator(this.locatorChildItem).filter({ hasText: menu_name }).click();
    }
    
    async clickChildCollapsable(menu_name) {
        await this.page.waitForSelector(this.locatorChildCollapsable, { state: 'visible' });
        const elementsText = await this.page.locator(this.locatorChildCollapsable).allTextContents();
        // console.log("รายการที่พบทั้งหมด:", elementsText);
        const childCollapsable  = await this.page.locator(this.locatorChildCollapsable).filter({ hasText: menu_name });
        await childCollapsable.click();
    }

    async getNewPageURL(link_url) {
        console.log('link_url --> ', link_url); // ตรวจสอบค่า link_url
        const currentUrl = await this.page.url();
        await this.page.waitForURL(url => url.href.includes(link_url) && url.href !== currentUrl);
        await this.page.waitForLoadState('load'); 
        const newUrl = await this.page.url();
        console.log('newUrl --> ', newUrl)
        return newUrl;
    }
}

