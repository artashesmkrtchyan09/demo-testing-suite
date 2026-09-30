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

    async checkAccountCreated() {
        await expect(this.page.getByText(USER_PAGE.accountStatus.created)).toBeVisible()
    }

    async checkAccountDeleted() {
        await expect(this.page.getByText(USER_PAGE.accountStatus.deleted)).toBeVisible()
    }

    async continueAsLoggedUser() {
        await this.page.getByTestId('continue-button').click()
    }

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