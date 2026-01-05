import {Page, Locator} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly signIn: Locator;
    private readonly welcomeText: Locator;

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
    }

}