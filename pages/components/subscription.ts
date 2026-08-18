import { expect, Page, Locator } from '@playwright/test';
import { USER_PAGE } from '../../constants/generics';

export class Subscription {
    readonly page: Page;
    readonly root: Locator;

    constructor(page: Page) {
        this.page = page;
        this.root = this.page.locator('#footer');
    }

    async checkSubscription() {
        const text = this.root.getByText(USER_PAGE.subscription);
        await expect(text).toBeVisible()
    }

    async fillSubscriptionEmail(email: string) {
        await this.root.locator('#susbscribe_email').fill(email)
    }

    async subscribe() {
        await this.root.locator('#subscribe').click()
    }

    async checkUserSubscribed() {
        const text = this.root.getByText(USER_PAGE.subscriptionStatus);
        await expect(text).toBeVisible()
    }
}