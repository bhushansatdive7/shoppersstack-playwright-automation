import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page){
        this.page= page;
        this.loginButton = page.getByRole("button",{name:"Login"});
        this.emailInput = page.getByRole("textbox",{name:"Email"});
        this.passwordInput = page.getByRole("textbox",{name:"Password"});
        this.loginGreeting = page.getByText("Hello, Logan");
    }
    async open() {

    await this.page.goto("https://www.shoppersstack.com/");

}
async login(email,password) {
    await this.loginButton.click();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
}
async verifyLogin(){
    await expect (this.loginGreeting).toBeVisible();
}

}