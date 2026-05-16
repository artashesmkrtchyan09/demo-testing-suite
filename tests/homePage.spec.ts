import { test } from '../fixtures/pages-fixtures';
import { faker } from '@faker-js/faker';
import { Contacts } from '../interfaces';

test.describe('Home page ', () => {

    test('Verify Contact Us page', async ({ contactsPage }) => {
        const contactInfo: Contacts = {
            userName: faker.internet.username(),
            email: faker.internet.email(),
            subject: faker.lorem.sentence({ min: 3, max: 5 }),
            message: faker.lorem.text()
        }

        await contactsPage.navigateToContactUs()
        await contactsPage.fillContactInfo(contactInfo)
        await contactsPage.selectFile()
        await contactsPage.submit()
        await contactsPage.checkSuccess()
        await contactsPage.clickHome()
        await contactsPage.checkHomePage()
    })

    test('Verify Test Cases page', async ({ testCasesPage }) => {
        await testCasesPage.navigateToTestCases()
        await testCasesPage.checkTestCases()
    })

    test('Verify Subscription in Home page', async ({ homePage }) => {
        const email = faker.internet.email()

        await homePage.checkSubscription()
        await homePage.fillSubscriptionEmail(email)
        await homePage.subscribe()
        await homePage.checkUserSubscribed()
    })
})