import { expect, Page } from '@playwright/test';
import { USER_PAGE, PRODUCTS } from '../constants/generics';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async checkHomePage() {
        await expect(this.page.locator('#slider')).toBeVisible();
    }

    // async navigateToSignUpLogin() {
    //     await this.page.locator('.navbar-nav').locator('a[href="/login"]').click();
    // }

    // async navigateToContactUs() {
    //     await this.page.locator('a[href="/contact_us"]').click();
    // }

    // async navigateToTestCases() {
    //     const testCaseButton = this.page.locator('#header').locator('a[href="/test_cases"]');  
    //     await testCaseButton.click();
    // }

    // async navigateToCart() {
    //     const cartButton =  this.page.locator('#header').locator('a[href="/view_cart"]');        
    //     await cartButton.click();
    // }

    // async navigateToProducts() {
    //     const productsButton =  this.page.locator('#header').locator('a[href="/products"]');       
    //     await productsButton.click();
    // }

    // async logout() {
    //     await this.page.locator('a[href="/logout"]').click();
    // }

    // async deleteAccount() {
    //     await this.page.locator('a[href="/delete_account"]').click();
    // }

    async checkAccountCreated() {
        await expect(this.page.getByText(USER_PAGE.accountStatus.created)).toBeVisible()
    }

    async checkAccountDeleted() {
        await expect(this.page.getByText(USER_PAGE.accountStatus.deleted)).toBeVisible()
    }

    async continueAsLoggedUser() {
        await this.page.getByTestId('continue-button').click()
    }

    // async checkUserLoggedIn(firstName: string) {
    //     await expect(this.page.getByText(`Logged in as ${firstName}`)).toBeVisible()
    // }

    // async checkUserLoggedOut(firstName: string) {
    //     await expect(this.page.getByText(`Logged in as ${firstName}`)).not.toBeVisible()
    // }

    // async checkSubscription() {
    //     await expect(this.page.getByText(USER_PAGE.subscription)).toBeVisible()
    // }

    // async fillSubscriptionEmail(email: string) {
    //     await this.page.locator('#susbscribe_email').fill(email)
    // }

    // async subscribe() {
    //     await this.page.locator('#subscribe').click()
    // }

    // async checkUserSubscribed() {
    //     await expect(this.page.getByText(USER_PAGE.subscriptionStatus)).toBeVisible()
    // }

    async scrollDown() {
        await this.page.keyboard.press('End');
    }

    async checkRecommededItemsTitle() {
        await expect(this.page.getByText(PRODUCTS.recommenededTitle)).toBeVisible()
    }

    async addRecommendedItem(item: string) {
        const targetItem = this.page.locator('.recommended_items').locator('.product-image-wrapper').filter({ hasText: item })
        await targetItem.locator('.add-to-cart').click();        
    }
}