import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly products: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = this.page.locator('tbody tr')
    }

    async getCurrentTexts(row: number | Locator) {
        let currentRow: Locator

        if (typeof row === 'number') {
            currentRow = this.products.nth(row)
        } else {
            currentRow = row
        }

        return {
            price: await currentRow.locator('.cart_price').innerText(),
            quantity: await currentRow.locator('.cart_quantity').innerText(),
            total: await currentRow.locator('.cart_total').innerText()
        }
    }

    async locatProduct(selector: string) {
        return this.page.locator('tr').filter({
            has: this.page.getByRole('link', { name: selector })
          })
    }

    async checkProductAdded(elem: Locator) {
        await expect(elem).toBeVisible()
    }

    async checkCartPage() {
        await expect(this.page.locator('.check_out')).toBeVisible()
    }

    async deleteProduct() {
        await this.page.locator('.cart_quantity_delete').click()
    }

    async checkProductDeleted(elem: Locator) {
        await expect(elem).not.toBeVisible()
    }
}
