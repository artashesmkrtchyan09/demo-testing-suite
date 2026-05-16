import { expect, test } from '../fixtures/pages-fixtures';
import { faker } from '@faker-js/faker';
import { PRODUCT_DATA, USER_DATA} from '../test-data';
import { UserAccount, UserAddress } from '../interfaces';

test.describe('Cart page ', () => {

    test('Verify Subscription in Cart page', async ({ cartPage }) => {
        const email = faker.internet.email()

        await cartPage.navigateToCart()
        await cartPage.checkSubscription()
        await cartPage.fillSubscriptionEmail(email)
        await cartPage.subscribe()
        await cartPage.checkUserSubscribed()
    })

    test('Verify adding products to Cart', async ({cartPage, productsPage}) => {
        await productsPage.navigateToProducts()
        await productsPage.addProductFromPage(0)
        await productsPage.continueShopping()
        await productsPage.addProductFromPage(1)
        await productsPage.viewCart()

        expect(await cartPage.products.count()).toBe(2)

        for (let i = 0; i < await cartPage.products.count(); i++) {
            const productData = PRODUCT_DATA.cartProducts[i]
            
            const productPrice = (await cartPage.getCurrentTexts(i)).price
            const productQuantity = (await cartPage.getCurrentTexts(i)).quantity
            const productTotalPrice = (await cartPage.getCurrentTexts(i)).total

            expect(productPrice).toBe(productData.price)
            expect(productQuantity).toBe(productData.quantity)
            expect(productTotalPrice).toBe(productData.total)
        }
    })

    test('Verify product quantity', async ({cartPage, productsPage}) => {
        const productData = PRODUCT_DATA.cartProducts[2]
        const productQuantity = (Number(productData.quantity) * 4).toString()
        const randomProduct = await productsPage.locatProduct(productData.description)
        
        await productsPage.viewProduct(randomProduct)
        await productsPage.checkProductDetails()
        await productsPage.increaseQuantity('4')
        await productsPage.addToCart()
        await productsPage.viewCart()

        const newProduct = await cartPage.locatProduct(productData.description)
        await cartPage.checkProductAdded(newProduct)

        const newProductQty = (await cartPage.getCurrentTexts(newProduct)).quantity
        expect(newProductQty).toBe(productQuantity)
    })

    test('Verify removing product from Cart', async ({cartPage, productsPage}) => {
        const productData = PRODUCT_DATA.cartProducts[3]

        await productsPage.addProductFromPage(3)
        await productsPage.viewCart()

        const newProduct = await cartPage.locatProduct(productData.description)
        await cartPage.checkCartPage()
        await cartPage.checkProductAdded(newProduct)
        await cartPage.deleteProduct()
        await cartPage.checkProductDeleted(newProduct)
    })

    test('Verify Cart page after login', async ({signUpLoginPage, cartPage, productsPage}) => {
        const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()};
        const address: UserAddress = USER_DATA.address;
        const productData = PRODUCT_DATA.cartProducts[4]

        await productsPage.addProductFromPage(4)
        await productsPage.viewCart()

        const newProduct = await cartPage.locatProduct(productData.description)
        await cartPage.checkProductAdded(newProduct)

        await signUpLoginPage.fullyRegisterUser(user, address)
        await signUpLoginPage.navigateToCart()

        await cartPage.checkProductAdded(newProduct)
    })

    test('Verify adding to Cart from recommended list', async ({homePage, cartPage, productsPage}) => {
        const productData = PRODUCT_DATA.cartProducts[5]

        await homePage.scrollDown()
        await homePage.checkRecommededItemsTitle()
        await homePage.addRecommendedItem(productData.description)
        await productsPage.viewCart()

        const newProduct = await cartPage.locatProduct(productData.description)
        await cartPage.checkProductAdded(newProduct)
    })
})