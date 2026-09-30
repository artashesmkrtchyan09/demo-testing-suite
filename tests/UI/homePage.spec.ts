import { test } from '../../fixtures/pages-fixtures';
import { faker } from '@faker-js/faker';
import { Contacts } from '../../interfaces';

test.describe('Home page ', () => {

    test('Verify Contact Us page', async ({ navigation, contactsPage, homePage }) => {
        const contactInfo: Contacts = {
            userName: faker.internet.username(),
            email: faker.internet.email(),
            subject: faker.lorem.sentence({ min: 3, max: 5 }),
            message: faker.lorem.text()
        }

        await navigation.goToContactUs()
        await contactsPage.fillContactInfo(contactInfo)
        await contactsPage.selectFile()
        await contactsPage.submit()
        await contactsPage.checkSuccess()
        await contactsPage.clickHome()
        await homePage.checkHomePage()
    })

    test('Verify Subscription in Home page', async ({ subscription }) => {
        const email = faker.internet.email()

        await subscription.checkSubscription()
        await subscription.fillSubscriptionEmail(email)
        await subscription.subscribe()
        await subscription.checkUserSubscribed()
    })
})