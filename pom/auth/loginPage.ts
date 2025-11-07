import {Page, Locator, expect} from '@playwright/test';
import * as url from "node:url";

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly signIn: Locator;
    readonly welcomeText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', {name: 'Username or email'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.signIn = page.getByRole('button', {name: 'Sign In'});
        this.welcomeText = page.locator('div [class="tba-nav-bar__left__title-and-breadcrumb"] span')
    }

    async login(url: string, user: string, pass: string) {
        await this.page.goto(url);
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.signIn.click();
        await expect(this.welcomeText).toHaveText(' Admin - Equipment Management ');
    }

}