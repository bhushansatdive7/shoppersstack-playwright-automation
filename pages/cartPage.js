import { expect } from '@playwright/test';

export class CartPage {

    constructor(page) {

        this.page = page;

        this.cart =
            page.locator('#cart');

        this.cartProductDetails =
            page.locator('.cart_productDetails__Glgfl');

        this.removeButton =
            page.getByRole("button", {
                name: "Remove from cart"
            });

        this.removeDialog =
            page.getByRole("dialog");

        this.yesButton =
            this.removeDialog.getByRole("button", {
                name: "Yes"
            });

        this.increaseButton =
            page.locator('#increase');

        this.decreaseButton =
            page.locator('#decrease');

        this.buyNowButton =
            page.getByRole("button", {
                name: "Buy Now"
            });
    }


    async openCart() {

        await expect(this.cart)
            .toBeVisible({
                timeout: 15000
            });

        await this.cart.click();

        await expect(this.page)
            .toHaveURL(/\/cart$/, {
                timeout: 15000
            });
    }


    async verifyProductInCart() {

        await expect(this.cartProductDetails)
            .toBeVisible({
                timeout: 30000
            });

        await expect(
            this.cartProductDetails.getByText(
                "iphone",
                {
                    exact: true
                }
            )
        ).toBeVisible();
    }


    async removeProduct() {

        await expect(this.removeButton)
            .toBeVisible();

        await this.removeButton.click();


        await expect(this.removeDialog)
            .toBeVisible();


        await expect(
            this.removeDialog.getByRole("heading", {
                name: "Remove Product"
            })
        ).toBeVisible();


        await expect(this.yesButton)
            .toBeVisible();

        await this.yesButton.click();


        await expect(this.removeDialog)
            .toBeHidden({
                timeout: 15000
            });
    }


    async increaseQuantity() {

        await expect(this.increaseButton)
            .toBeVisible();

        await this.increaseButton.click();
    }


    async decreaseQuantity() {

        await expect(this.decreaseButton)
            .toBeVisible();

        await this.decreaseButton.click();
    }


    async clickBuyNow() {

        await expect(this.buyNowButton)
            .toBeVisible();

        await expect(this.buyNowButton)
            .toBeEnabled();

        await this.buyNowButton.click();

        await expect(this.page)
            .toHaveURL(/\/selectaddress$/, {
                timeout: 15000
            });
    }

}