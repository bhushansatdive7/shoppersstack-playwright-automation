import { expect } from '@playwright/test';

export class PaymentPage {

    constructor(page) {

        this.page = page;

        this.codRadio =
            page.getByRole("radio", {
                name: "Cash On Delivery (COD)"
            });

        this.proceedButton =
            page.getByRole("button", {
                name: "Proceed"
            });

        this.orderConfirmedHeading =
            page.getByRole("heading", {
                name: "Order Confirmed"
            });

        this.thankYouHeading =
            page.getByRole("heading", {
                name: "Thank you for your order"
            });

        this.orderNumberMessage =
            page.locator('p')
                .filter({
                    hasText: "Your order number is"
                });
    }


    async verifyPaymentPage() {

        await expect(this.page)
            .toHaveURL(/\/payment-options$/, {
                timeout: 15000
            });

        await expect(this.codRadio)
            .toBeVisible({
                timeout: 15000
            });
    }


    async selectCOD() {

        // Before selecting payment method,
        // Proceed should be disabled
        await expect(this.proceedButton)
            .toBeDisabled();

        await this.codRadio.check();

        await expect(this.codRadio)
            .toBeChecked();

        // After selecting COD,
        // Proceed should become enabled
        await expect(this.proceedButton)
            .toBeEnabled({
                timeout: 10000
            });
    }


    async placeOrder() {

        await expect(this.proceedButton)
            .toBeEnabled({
                timeout: 10000
            });

        await this.proceedButton.click();

        await expect(this.page)
            .toHaveURL(/\/place-order$/, {
                timeout: 15000
            });
    }


    async verifyOrderConfirmation() {

        await expect(this.orderConfirmedHeading)
            .toBeVisible({
                timeout: 15000
            });

        await expect(this.thankYouHeading)
            .toBeVisible({
                timeout: 15000
            });

        await expect(this.orderNumberMessage)
            .toBeVisible({
                timeout: 15000
            });

        await expect(this.orderNumberMessage)
            .toContainText(
                /Your order number is\s+#\d+/
            );
    }


    async completeCODOrder() {

        await this.selectCOD();

        await this.placeOrder();

        await this.verifyOrderConfirmation();
    }

}