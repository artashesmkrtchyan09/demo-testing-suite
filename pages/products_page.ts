import { expect, Locator, Page } from '@playwright/test';
import { HomePage } from './home-page';

export class ProductsPage extends HomePage {
    constructor(page: Page) {
        super(page)
    }

    productItem = this.page.locator('.product-image-wrapper');
    confirmationDialog = this.page.locator('.modal-content')

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
    }

    async continueShopping() {
        await this.confirmationDialog.locator('.close-modal').click()
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