import { test, expect } from '@playwright/test';


test("Verify shopper can select Cash On Delivery payment method", async ({ page }) => {

    test.setTimeout(90000);

    // Open ShoppersStack
    await page.goto("https://www.shoppersstack.com/", {
        waitUntil: "domcontentloaded"
    });


    // Login
    await page.getByRole("button", {
        name: "Login"
    }).click();

    await page.getByRole("textbox", {
        name: "Email"
    }).fill("loganstark@gmail.com");

    await page.getByRole("textbox", {
        name: "Password"
    }).fill("Logan@123");

    await page.getByRole("button", {
        name: "Login"
    }).click();

    await expect(
        page.getByText("Hello, Logan")
    ).toBeVisible({
        timeout: 15000
    });


    // Open iPhone
    const iphone =
        page.getByText("iphone", {
            exact: true
        });

    await expect(iphone)
        .toBeVisible({
            timeout: 15000
        });

    await iphone.click();

    await expect(page)
        .toHaveURL(/products_page\/51/, {
            timeout: 15000
        });


    // Add product to cart if required
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton)
        .toBeVisible({
            timeout: 15000
        });

    const buttonText =
        (await addToCartButton.textContent())
            ?.trim()
            .toLowerCase();

    if (buttonText === "add to cart") {

        await addToCartButton.click();

        await expect(addToCartButton)
            .toHaveText(/added/i, {
                timeout: 15000
            });

    } else {

        await expect(addToCartButton)
            .toHaveText(/added/i);
    }


    // Open cart
    const cart =
        page.locator('#cart');

    await expect(cart)
        .toBeVisible({
            timeout: 15000
        });

    await cart.click();

    await expect(page)
        .toHaveURL(/\/cart$/, {
            timeout: 15000
        });


    // Buy Now
    const buyNowButton =
        page.getByRole("button", {
            name: "Buy Now"
        });

    await expect(buyNowButton)
        .toBeVisible();

    await buyNowButton.click();


    // Verify address page
    await expect(page)
        .toHaveURL(/\/selectaddress$/, {
            timeout: 15000
        });


    // Saved addresses
    const savedAddresses =
        page.locator(
            'input[name="address"]'
        );

    await expect(savedAddresses.nth(0))
        .toBeVisible({
            timeout: 15000
        });

    await expect(savedAddresses.nth(1))
        .toBeVisible({
            timeout: 15000
        });


    // Select second valid address
    const secondAddress =
        savedAddresses.nth(1);

    await secondAddress.check();

    await expect(secondAddress)
        .toBeChecked();


    // Proceed to payment page
    const addressProceedButton =
        page.getByRole("button", {
            name: "Proceed"
        });

    await expect(addressProceedButton)
        .toBeEnabled({
            timeout: 10000
        });

    await addressProceedButton.click();


    // Verify payment page
    await expect(page)
        .toHaveURL(/\/payment-options$/, {
            timeout: 15000
        });


    // Payment Proceed button
    const paymentProceedButton =
        page.getByRole("button", {
            name: "Proceed"
        });


    // Initially disabled
    await expect(paymentProceedButton)
        .toBeDisabled();


    // Cash On Delivery radio button
    const cod =
        page.getByRole("radio", {
            name: "Cash On Delivery (COD)"
        });

    await expect(cod)
        .toBeVisible();


    // Select COD
    await cod.check();


    // Verify selected
    await expect(cod)
        .toBeChecked();


    // Verify Proceed enabled
    await expect(paymentProceedButton)
        .toBeEnabled({
            timeout: 10000
        });

});



test("Verify shopper can successfully place COD order", async ({ page }) => {

    test.setTimeout(90000);

    // Open ShoppersStack
    await page.goto("https://www.shoppersstack.com/", {
        waitUntil: "domcontentloaded"
    });


    // Login
    await page.getByRole("button", {
        name: "Login"
    }).click();

    await page.getByRole("textbox", {
        name: "Email"
    }).fill("loganstark@gmail.com");

    await page.getByRole("textbox", {
        name: "Password"
    }).fill("Logan@123");

    await page.getByRole("button", {
        name: "Login"
    }).click();

    await expect(
        page.getByText("Hello, Logan")
    ).toBeVisible({
        timeout: 15000
    });


    // Open iPhone
    const iphone =
        page.getByText("iphone", {
            exact: true
        });

    await expect(iphone)
        .toBeVisible({
            timeout: 15000
        });

    await iphone.click();

    await expect(page)
        .toHaveURL(/products_page\/51/, {
            timeout: 15000
        });


    // Add product to cart if required
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton)
        .toBeVisible({
            timeout: 15000
        });

    const buttonText =
        (await addToCartButton.textContent())
            ?.trim()
            .toLowerCase();

    if (buttonText === "add to cart") {

        await addToCartButton.click();

        await expect(addToCartButton)
            .toHaveText(/added/i, {
                timeout: 15000
            });
    }


    // Open cart
    const cart =
        page.locator('#cart');

    await expect(cart)
        .toBeVisible({
            timeout: 15000
        });

    await cart.click();

    await expect(page)
        .toHaveURL(/\/cart$/, {
            timeout: 15000
        });


    // Buy Now
    const buyNowButton =
        page.getByRole("button", {
            name: "Buy Now"
        });

    await expect(buyNowButton)
        .toBeVisible();

    await buyNowButton.click();


    // Verify address page
    await expect(page)
        .toHaveURL(/\/selectaddress$/, {
            timeout: 15000
        });


    // Saved addresses
    const savedAddresses =
        page.locator(
            'input[name="address"]'
        );

    await expect(savedAddresses.nth(1))
        .toBeVisible({
            timeout: 15000
        });


    // Select second valid address
    const secondAddress =
        savedAddresses.nth(1);

    await secondAddress.check();

    await expect(secondAddress)
        .toBeChecked();


    // Proceed to payment
    const addressProceedButton =
        page.getByRole("button", {
            name: "Proceed"
        });

    await expect(addressProceedButton)
        .toBeEnabled({
            timeout: 10000
        });

    await addressProceedButton.click();


    // Verify Payment Options page
    await expect(page)
        .toHaveURL(/\/payment-options$/, {
            timeout: 15000
        });


    // Payment Proceed button
    const paymentProceedButton =
        page.getByRole("button", {
            name: "Proceed"
        });

    await expect(paymentProceedButton)
        .toBeDisabled();


    // Select COD
    const cod =
        page.getByRole("radio", {
            name: "Cash On Delivery (COD)"
        });

    await expect(cod)
        .toBeVisible();

    await cod.check();

    await expect(cod)
        .toBeChecked();


    // Proceed should become enabled
    await expect(paymentProceedButton)
        .toBeEnabled({
            timeout: 10000
        });


    // Place order
    await paymentProceedButton.click();


    // Verify confirmation URL
    await expect(page)
        .toHaveURL(/\/place-order$/, {
            timeout: 15000
        });


    // Verify Order Confirmed heading
    await expect(
        page.getByRole("heading", {
            name: "Order Confirmed"
        })
    ).toBeVisible({
        timeout: 15000
    });


    // Verify thank-you message
    await expect(
        page.getByRole("heading", {
            name: "Thank you for your order"
        })
    ).toBeVisible({
        timeout: 15000
    });


    // Verify dynamic order number
    const orderNumberMessage =
        page.locator('p')
            .filter({
                hasText: "Your order number is"
            });

    await expect(orderNumberMessage)
        .toBeVisible({
            timeout: 15000
        });


    // Allow variable whitespace around dynamic order number
    await expect(orderNumberMessage)
        .toContainText(
            /Your order number is\s+#\d+/
        );

});