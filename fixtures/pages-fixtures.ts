import { test as base, expect} from '@playwright/test';
import { BASE_URL } from '../constants/generics';
import { Navigation, Subscription } from '../pages/components'
import { 
    HomePage, 
    SignUpLoginPage,
    ContactUsPage,
    CartPage,
    TestCasesPage,
    ProductsPage, 
  } from '../pages';

type Fixtures = {
    signUpLoginPage: SignUpLoginPage,
    contactsPage: ContactUsPage,
    testCasesPage: TestCasesPage,
    homePage: HomePage,
    cartPage: CartPage,
    productsPage: ProductsPage,
    navigation: Navigation,
    subscription: Subscription 
}

export const test = base.extend<Fixtures>({
    page: async ({page}, use) => {
        await page.route('**/*doubleclick.net/**', route => route.abort());
        await page.goto(BASE_URL)
        await expect(page.locator('#slider')).toBeVisible();

        await use(page);
    },

    homePage: async ({page}, use) => {
        await use(new HomePage(page))
    },

    signUpLoginPage: async ({ page, homePage, navigation }, use) => {
        await use(new SignUpLoginPage(page, homePage,  navigation));
    },

    contactsPage: async ({page}, use) => {
        await use(new ContactUsPage(page));
    },

    cartPage: async ({page}, use) => {
        await use(new CartPage(page));
    },

    testCasesPage: async ({page}, use) => {
        await use(new TestCasesPage(page));
    },

    productsPage: async ({page}, use) => {
        await use(new ProductsPage(page));
    },

    navigation: async ({ page }, use) => {
        await use(new Navigation(page));
    },

    subscription: async ({ page }, use) => {
        await use(new Subscription(page));
    },
})

export { expect } from '@playwright/test'

