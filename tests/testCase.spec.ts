import { test } from '../fixtures/pages-fixtures';

test.describe('Test cases page ', () => {
    
    test('Verify Test Cases page', async ({ navigation, testCasesPage }) => {
        await navigation.goToTestCases()
        await testCasesPage.checkTestCases()
    })
})