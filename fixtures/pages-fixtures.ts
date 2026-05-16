import { test as base } from '@playwright/test';
import { BASE_URL } from '../constants/generics';
import { 
    HomePage, 
    SignUpLoginPage,
    ContactUsPage,
    CartPage,
    TestCasesPage,
    ProductsPage
  } from '../pages';

type Fixtures = {
    signUpLoginPage: SignUpLoginPage,
    contactsPage: ContactUsPage,
    testCasesPage: TestCasesPage,
    homePage: HomePage,
    cartPage: CartPage,
    productsPage: ProductsPage
}

export const test = base.extend<Fixtures>({
    page: async ({page}, use) => {
        await page.route('**/*doubleclick.net/**', route => route.abort());
        await page.goto(BASE_URL)
        await use(page);
    },

    homePage: async ({page}, use) => {
        const homePage = new HomePage(page)

        await homePage.checkHomePage()
        await use(homePage)
    },

    signUpLoginPage: async ({page, homePage}, use) => {
        await use(new SignUpLoginPage(page));
    },

    contactsPage: async ({page}, use) => {
        await use(new ContactUsPage(page));
    },

    cartPage: async ({page, homePage}, use) => {
        await use(new CartPage(page));
    },

    testCasesPage: async ({page}, use) => {
        await use(new TestCasesPage(page));
    },

    productsPage: async ({page, homePage}, use) => {
        await use(new ProductsPage(page));
    }
})

export { expect } from '@playwright/test'

