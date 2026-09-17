import { test, expect } from '@playwright/test';


test("Verify added product is present in cart and can be removed", async ({ page }) => {

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
        page.locator(
            'button[id="Add To Cart"]'
        );

    await expect(addToCartButton)
        .toBeVisible({
            timeout: 15000
        });

    const buttonText =
        (await addToCartButton.textContent())
            ?.trim()
            .toLowerCase();


    if (buttonText === "add to cart") {

        await expect(addToCartButton)
            .toBeEnabled();

        await addToCartButton.click();

        await expect(addToCartButton)
            .toHaveText(/added/i, {
                timeout: 15000
            });

    } else {

        // Product is already in cart
        await expect(addToCartButton)
            .toHaveText(/added/i);

        await expect(addToCartButton)
            .toBeDisabled();
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


    // Verify product details section
    const cartProductDetails =
        page.locator(
            '.cart_productDetails__Glgfl'
        );

    await expect(cartProductDetails)
        .toBeVisible({
            timeout: 30000
        });


    // Verify iPhone is present
    const cartProduct =
        cartProductDetails.getByText(
            "iphone",
            {
                exact: true
            }
        );

    await expect(cartProduct)
        .toBeVisible();


    // Remove product
    const removeButton =
        page.getByRole("button", {
            name: "Remove from cart"
        });

    await expect(removeButton)
        .toBeVisible();

    await removeButton.click();


    // Verify confirmation dialog
    const removeDialog =
        page.getByRole("dialog");

    await expect(removeDialog)
        .toBeVisible();


    // Verify dialog heading
    await expect(
        removeDialog.getByRole("heading", {
            name: "Remove Product"
        })
    ).toBeVisible();


    // Verify confirmation message
    await expect(
        removeDialog.getByText(
            "Are you sure, you want remove from cart?"
        )
    ).toBeVisible();


    // Confirm removal
    const yesButton =
        removeDialog.getByRole("button", {
            name: "Yes"
        });

    await expect(yesButton)
        .toBeVisible();

    await yesButton.click();


    // Verify dialog closes
    await expect(removeDialog)
        .toBeHidden({
            timeout: 15000
        });


    // Verify product removed
    await expect(cartProduct)
        .toBeHidden({
            timeout: 15000
        });

});



test("Verify shopper can increase and decrease product quantity", async ({ page }) => {

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


    // Add product if required
    const addToCartButton =
        page.locator(
            'button[id="Add To Cart"]'
        );

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


    // Verify product
    const cartProductDetails =
        page.locator(
            '.cart_productDetails__Glgfl'
        );

    await expect(cartProductDetails)
        .toBeVisible({
            timeout: 30000
        });

    await expect(
        cartProductDetails.getByText(
            "iphone",
            {
                exact: true
            }
        )
    ).toBeVisible();


    // Quantity text
    const quantityText =
        page.getByText(
            /Qty:\s*\d+/i
        ).first();

    await expect(quantityText)
        .toBeVisible();


    // Read current quantity
    const currentQuantityText =
        await quantityText.textContent();

    const currentQuantity =
        Number(
            currentQuantityText
                ?.match(/\d+/)?.[0]
        );

    expect(currentQuantity)
        .toBeGreaterThan(0);


    // Increase quantity
    const increaseButton =
        page.locator('#increase');

    await expect(increaseButton)
        .toBeVisible();

    await increaseButton.click();


    // Verify quantity increased by 1
    await expect(
        page.getByText(
            new RegExp(
                `Qty:\\s*${currentQuantity + 1}`,
                "i"
            )
        )
    ).toBeVisible({
        timeout: 15000
    });


    // Decrease quantity
    const decreaseButton =
        page.locator('#decrease');

    await expect(decreaseButton)
        .toBeVisible();

    await decreaseButton.click();


    // Verify quantity returns to original value
    await expect(
        page.getByText(
            new RegExp(
                `Qty:\\s*${currentQuantity}`,
                "i"
            )
        )
    ).toBeVisible({
        timeout: 15000
    });

});