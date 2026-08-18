import { expect, Page } from '@playwright/test';
import { HomePage } from './home-page';
import { Navigation } from './components/navigation';
import { USER_PAGE } from '../constants/generics';
import { UserAccount, UserAddress } from '../interfaces'

export class SignUpLoginPage{
    readonly page: Page;
    readonly homepage: HomePage;
    readonly navigation: Navigation;

    constructor(page: Page, homepage: HomePage, navigation: Navigation) {
        this.page = page;
        this.homepage = homepage;
        this.navigation = navigation;
    }

    async checkLoginTitle() {
        await expect(this.page.getByText(USER_PAGE.loginTitle)).toBeVisible();
    }

    async checkSignUpTitle() {
        await expect(this.page.getByText(USER_PAGE.signUpTitle)).toBeVisible();
    }

    async signUp(user: string, email: string) {
        await this.page.getByTestId('signup-name').fill(user);
        await this.page.getByTestId('signup-email').fill(email);
        await this.page.getByTestId('signup-button').click();
    }

    async checkSignUpOpened() {
        await expect(this.page.getByText(USER_PAGE.accountHeader)).toBeVisible()
    }

    async fillAccountInfo(user: UserAccount) {
        await this.page.getByTestId('title').locator('[value="Mr"]').click();
        await this.page.getByTestId('password').fill(user.password);
        await this.page.getByTestId('days').selectOption(user.birthDay.day);
        await this.page.getByTestId('months').selectOption(user.birthDay.month);
        await this.page.getByTestId('years').selectOption(user.birthDay.year);
        await this.page.getByRole('checkbox', { name: 'newsletter' }).check();
        await this.page.locator('#optin').check();
    }

    async fillAddressInfo(user: UserAccount, address: UserAddress) {
        await this.page.getByTestId('first_name').fill(user.firstName);
        await this.page.getByTestId('last_name').fill(user.lastName)
        await this.page.getByTestId('company').fill(address.companyName)
        await this.page.getByTestId('address').fill(address.address)
        await this.page.getByTestId('country').selectOption(address.country)
        await this.page.getByTestId('state').fill(address.state)
        await this.page.getByTestId('city').fill(address.city)
        await this.page.getByTestId('zipcode').fill(address.zipCode)
        await this.page.getByTestId('mobile_number').fill(address.mobileNumber)
    }

    async createAccount() {
        await this.page.getByTestId('create-account').click()
    }

    async login(email: string, pass: string) {
        await this.page.getByTestId('login-email').fill(email)
        await this.page.getByTestId('login-password').fill(pass)
        await this.page.getByTestId('login-button').click()
    }

    async registerUserInfo(user: UserAccount, address: UserAddress) {
        await this.fillAccountInfo(user)
        await this.fillAddressInfo(user, address)
        await this.createAccount()
    }

    async fullyRegisterUser(user: UserAccount, address: UserAddress) {
        await this.navigation.goToSignUpLogin()
        await this.signUp(user.firstName, user.email)
        await this.registerUserInfo(user, address)
        await this.homepage.continueAsLoggedUser()
    }

    async checkLoginError() {
        await expect(this.page.getByText(USER_PAGE.loginError)).toBeVisible()
    }

    async checkSignUpError() {
        await expect(this.page.getByText(USER_PAGE.signUpError)).toBeVisible()
    }
}