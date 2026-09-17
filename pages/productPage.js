import { expect } from '@playwright/test';

export class ProductPage {

    constructor(page) {

        this.page = page;

        this.iphone =
            page.getByText("iphone", {
                exact: true
            });

        this.addToCartButton =
            page.locator('button[id="Add To Cart"]');
    }


    async openProduct() {

        await expect(this.iphone)
            .toBeVisible({
                timeout: 15000
            });

        await this.iphone.click();

        await expect(this.page)
            .toHaveURL(/products_page\/51/, {
                timeout: 15000
            });
    }
    async addToCart() {

        await expect(this.addToCartButton)
            .toBeVisible({
                timeout: 15000
            });

        const buttonText =
            (await this.addToCartButton.textContent())
                ?.trim()
                .toLowerCase();

        if (buttonText === "add to cart") {

            await this.addToCartButton.click();

            await expect(this.addToCartButton)
                .toHaveText(/added/i, {
                    timeout: 15000
                });

        } else {

            await expect(this.addToCartButton)
                .toHaveText(/added/i);
        }
    }
}