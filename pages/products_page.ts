import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly productItem: Locator;
    readonly confirmationDialog: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productItem = this.page.locator('.product-image-wrapper');
        this.confirmationDialog = this.page.locator('.modal-content');
    }

    async hoverOverProduct(elemIndex: number) {
        await this.productItem.nth(elemIndex).hover()
    }

    async addToCart(elemIndex?: number) {
        if (elemIndex !== undefined) {
            const currentProduct = this.productItem.nth(elemIndex)
            await currentProduct.locator('.product-overlay').locator('.add-to-cart').click()
        } else {
            await this.page.getByRole('button', { name: 'Add to cart' }).click()
        }

        await expect(this.confirmationDialog).toBeVisible()
    }

    async continueShopping() {
        await this.confirmationDialog.locator('.close-modal').click()
        await expect(this.confirmationDialog).toBeHidden()
    }

    async viewCart() {
        await this.confirmationDialog.locator('a[href="/view_cart"]').click()
    }

    async addProductFromPage(elemIndex: number) {
        await this.hoverOverProduct(elemIndex)
        await this.addToCart(elemIndex)
    }

    async locatProduct(selector: string) {
        return this.page.locator('.product-image-wrapper').filter({ has: this.page.getByText(selector) })
    }

    async viewProduct(elem: Locator) {
        await elem.locator('.choose').click()
    }

    async checkProductDetails() {
        await expect(this.page.locator('.product-details')).toBeVisible()
    }

    async increaseQuantity(qty: string) {
        await this.page.locator('#quantity').fill(qty)
    }
}