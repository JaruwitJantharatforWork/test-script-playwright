import { test as base } from "@playwright/test"
import { LoginPage } from "./login.page"
import { userInfo } from "os"
import { MenuPage } from "./menu.page"

type baseFixtures = {
    loginPage: LoginPage,
    menuPage: MenuPage
}

export const test = base.extend<baseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    menuPage: async ({ page }, use) => {
        await use(new MenuPage(page));
    },
})