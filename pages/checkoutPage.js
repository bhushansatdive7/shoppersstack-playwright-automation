import { expect } from '@playwright/test';

export class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.savedAddresses =
            page.locator('input[name="address"]');

        this.proceedButton =
            page.getByRole("button", {
                name: "Proceed"
            });

        this.addNewAddress =
            page.getByText("Add New Address", {
                exact: true
            });
    }


    async verifyCheckoutPage() {

        await expect(this.page)
            .toHaveURL(/\/selectaddress$/, {
                timeout: 15000
            });

        await expect(this.addNewAddress)
            .toBeVisible({
                timeout: 15000
            });
    }


    async selectSecondAddress() {

        const secondAddress =
            this.savedAddresses.nth(1);

        await expect(secondAddress)
            .toBeVisible({
                timeout: 15000
            });

        await secondAddress.check();

        await expect(secondAddress)
            .toBeChecked();
    }


    async proceedToPayment() {

        await expect(this.proceedButton)
            .toBeVisible();

        await expect(this.proceedButton)
            .toBeEnabled({
                timeout: 10000
            });

        await this.proceedButton.click();

        await expect(this.page)
            .toHaveURL(/\/payment-options$/, {
                timeout: 15000
            });
    }


    async selectSecondAddressAndProceed() {

        await this.selectSecondAddress();

        await this.proceedToPayment();
    }

}