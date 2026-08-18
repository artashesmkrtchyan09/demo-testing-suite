import { expect, Page } from '@playwright/test';
import { TEST_CASES } from '../constants/generics';

export class TestCasesPage{
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkTestCases() {
        const testCaseTitle = this.page.locator('h2', { hasText: TEST_CASES.title })
        await expect(testCaseTitle).toBeVisible()
    }
}