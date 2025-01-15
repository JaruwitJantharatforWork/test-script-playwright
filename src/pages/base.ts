import { test as base } from "@playwright/test"
import { LoginPage } from "./login.page"
import { userInfo } from "os"

type baseFixtures = {
    loginPage: LoginPage,
}

export const test = base.extend<baseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
})