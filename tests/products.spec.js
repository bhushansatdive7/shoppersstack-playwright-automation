import { test, expect } from '@playwright/test';

test("Verify shopper can add product to cart", async ({ page }) => {

    test.setTimeout(60000);

    // Open ShoppersStack
    await page.goto("https://www.shoppersstack.com/", {
        waitUntil: "domcontentloaded"
    });


    // Login button
    const loginButton =
        page.getByRole("button", { name: "Login" });

    await expect(loginButton).toBeVisible({
        timeout: 15000
    });

    await loginButton.click();


    // Enter valid credentials
    await page.getByRole("textbox", { name: "Email" })
        .fill("loganstark@gmail.com");

    await page.getByRole("textbox", { name: "Password" })
        .fill("Logan@123");

    await page.getByRole("button", { name: "Login" }).click();


    // Verify login
    await expect(
        page.getByText("Hello, Logan")
    ).toBeVisible({
        timeout: 15000
    });


    // Locate iphone product
    const iphone =
        page.getByText("iphone", { exact: true });

    await expect(iphone).toBeVisible({
        timeout: 15000
    });


    // Open iphone product
    await iphone.click();


    // Verify product details page
    await expect(page)
        .toHaveURL(
            "https://www.shoppersstack.com/products_page/51"
        );


    // Locate Add To Cart button
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton).toBeVisible();


    // Product should not already be in cart
    await expect(addToCartButton).toBeEnabled();


    // Add iphone to cart
    await addToCartButton.click();


    // Verify product was added
    await expect(addToCartButton)
        .toHaveText(/added/i);

    await expect(addToCartButton)
        .toBeDisabled();
});