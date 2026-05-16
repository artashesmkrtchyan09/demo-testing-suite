import { expect, Page } from '@playwright/test';
import { HomePage } from './home-page';
import { CONTACT_US } from '../constants/generics';
import { Contacts } from '../interfaces/user.interface'

import * as path from 'path';

export class ContactUsPage extends HomePage {
    constructor(page: Page) {
        super(page)
    }

    async checkGetInTouch() {
        await expect(this.page.getByText(CONTACT_US.title)).toBeVisible()
    }

    async fillContactInfo(contacts: Contacts) {
        await this.page.getByTestId('name').fill(contacts.userName);
        await this.page.getByTestId('email').fill(contacts.email);
        await this.page.getByTestId('subject').fill(contacts.subject);
        await this.page.getByTestId('message').fill(contacts.message);
    }

    async selectFile() {
        const filePath = path.resolve(process.cwd(), 'files/test_document.txt');
        await this.page.locator('input[name="upload_file"]').setInputFiles(filePath);
        await this.page.waitForTimeout(1000) 
    }

    async submit() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });

        await this.page.getByTestId('submit-button').click()
    }

    async checkSuccess() {
        await expect(this.page.locator('[class="status alert alert-success"]')).toBeVisible()
    }

    async clickHome() {
        await this.page.locator('.btn-success').click()
    }
}