import { test } from '../fixtures/pages-fixtures';
import { faker } from '@faker-js/faker';
import { USER_DATA } from '../test-data';
import { UserAccount, UserAddress } from '../interfaces';

test.describe('Login ', () => {

  test('Verify user registration flow', async ({navigation, homePage, signUpLoginPage}) => {    
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address
  
    await navigation.goToSignUpLogin()
    await signUpLoginPage.checkSignUpTitle()
  
    await signUpLoginPage.signUp(user.firstName, user.email)
    await signUpLoginPage.checkSignUpOpened()
  
    await signUpLoginPage.registerUserInfo(user, address)
    await homePage.checkAccountCreated()
  
    await homePage.continueAsLoggedUser()
    await navigation.checkUserLoggedIn(user.firstName)
  
    await navigation.deleteAccount()
    await homePage.checkAccountDeleted()
  });
  
  test('Verify user login with correct email and password', async ({navigation, homePage, signUpLoginPage}) => {
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address
    
    await signUpLoginPage.fullyRegisterUser(user, address)
    await navigation.logout()
    await navigation.goToSignUpLogin()
    await signUpLoginPage.checkLoginTitle()
  
    await signUpLoginPage.login(user.email, user.password)
    await navigation.checkUserLoggedIn(user.firstName)
  
    await navigation.deleteAccount()
    await homePage.checkAccountDeleted()
  });
  
  test('Verify user login with incorrect email and password', async ({navigation, signUpLoginPage}) => {    
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    
    await navigation.goToSignUpLogin()
    await signUpLoginPage.login(user.email, user.password)
  
    await signUpLoginPage.checkLoginError()
  });
  
  test('Verify user logout', async ({navigation, signUpLoginPage}) => {    
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address
    
    await signUpLoginPage.fullyRegisterUser(user, address)
    await navigation.logout()
    await navigation.checkUserLoggedOut(user.firstName)
  });

  test('Verify user registration with existing email', async ({navigation, signUpLoginPage}) => {
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address

    await signUpLoginPage.fullyRegisterUser(user, address)
    await navigation.logout()
    await navigation.goToSignUpLogin()
    await signUpLoginPage.checkSignUpTitle()

    await signUpLoginPage.signUp(user.firstName, user.email)
    await signUpLoginPage.checkSignUpError()
  })
})




