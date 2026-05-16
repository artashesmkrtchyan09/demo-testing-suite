import { expect, Page } from '@playwright/test';
import { HomePage } from './home-page';
import { TEST_CASES } from '../constants/generics';

export class TestCasesPage extends HomePage {
    constructor(page: Page) {
        super(page)
    }

    async checkTestCases() {
        const testCaseTitle = this.page.locator('h2', { hasText: TEST_CASES.title })
        
        await expect(testCaseTitle).toBeVisible()
    }
}