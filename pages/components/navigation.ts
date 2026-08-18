import { expect, Page, Locator } from '@playwright/test';

export class Navigation {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = this.page.locator('#header');
    }

    async goToSignUpLogin() {
        await this.root.locator('.navbar-nav').locator('a[href="/login"]').click();
    }

    async goToContactUs() {
        await this.root.locator('a[href="/contact_us"]').click();
    }

    async goToTestCases() {
        await this.root.locator('a[href="/test_cases"]').click();
    }
    
    async goToCart() {   
        await this.root.locator('a[href="/view_cart"]').click();
    }

    async goToProducts() {
        await this.root.locator('a[href="/products"]').click();
    }
    
    async logout() {
        await this.root.locator('a[href="/logout"]').click();
    }

    async deleteAccount() {
        await this.root.locator('a[href="/delete_account"]').click();
    }

    async checkUserLoggedIn(firstName: string) {
        const text = this.root.getByText(`Logged in as ${firstName}`);
        await expect(text).toBeVisible()
    }

    async checkUserLoggedOut(firstName: string) {
        const text = this.root.getByText(`Logged in as ${firstName}`);
        await expect(text).not.toBeVisible()
    }
}