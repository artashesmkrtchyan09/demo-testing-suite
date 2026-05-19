import { test } from '../fixtures/pages-fixtures';
import { faker } from '@faker-js/faker';
import { USER_DATA } from '../test-data';
import { UserAccount, UserAddress } from '../interfaces';

test.describe('Login ', () => {

  test('Verify user registration flow', async ({signUpLoginPage}) => {    
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address
  
    await signUpLoginPage.navigateToSignUpLogin()
    await signUpLoginPage.checkSignUpTitle()
  
    await signUpLoginPage.signUp(user.firstName, user.email)
    await signUpLoginPage.checkSignUpOpened()
  
    await signUpLoginPage.registerUserInfo(user, address)
    await signUpLoginPage.checkAccountCreated()
  
    await signUpLoginPage.continueAsLoggedUser()
    await signUpLoginPage.checkUserLoggedIn(user.firstName)
  
    await signUpLoginPage.deleteAccount()
    await signUpLoginPage.checkAccountDeleted()
  });
  
  test('Verify user login with correct email and password', async ({signUpLoginPage}) => {
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address
    
    await signUpLoginPage.fullyRegisterUser(user, address)
    await signUpLoginPage.logout()
    await signUpLoginPage.navigateToSignUpLogin()
    await signUpLoginPage.checkLoginTitle()
  
    await signUpLoginPage.login(user.email, user.password)
    await signUpLoginPage.checkUserLoggedIn(user.firstName)
  
    await signUpLoginPage.deleteAccount()
    await signUpLoginPage.checkAccountDeleted()
  });
  
  test('Verify user login with incorrect email and password', async ({signUpLoginPage}) => {    
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    
    await signUpLoginPage.navigateToSignUpLogin()
    await signUpLoginPage.login(user.email, user.password)
  
    await signUpLoginPage.checkLoginError()
  });
  
  test('Verify user logout', async ({signUpLoginPage}) => {    
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address
    
    await signUpLoginPage.fullyRegisterUser(user, address)
    await signUpLoginPage.logout()
    await signUpLoginPage.checkUserLoggedOut(user.firstName)
  });

  test('Verify user registration with existing email', async ({signUpLoginPage}) => {
    const user: UserAccount = {...USER_DATA.account, email: faker.internet.email()}
    const address: UserAddress = USER_DATA.address

    await signUpLoginPage.fullyRegisterUser(user, address)
    await signUpLoginPage.logout()
    await signUpLoginPage.navigateToSignUpLogin()
    await signUpLoginPage.checkSignUpTitle()

    await signUpLoginPage.signUp(user.firstName, user.email)
    await signUpLoginPage.checkSignUpError()
  })
})




