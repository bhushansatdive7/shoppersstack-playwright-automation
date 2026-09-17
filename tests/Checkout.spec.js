import { test, expect } from '@playwright/test';


test("Verify Buy Now navigates shopper to address selection page", async ({ page }) => {

    test.setTimeout(60000);

    await page.goto("https://www.shoppersstack.com/", {
        waitUntil: "domcontentloaded"
    });

    // Login
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByRole("textbox", { name: "Email" })
        .fill("loganstark@gmail.com");

    await page.getByRole("textbox", { name: "Password" })
        .fill("Logan@123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(
        page.getByText("Hello, Logan")
    ).toBeVisible({ timeout: 15000 });


    // Open iPhone
    const iphone = page.getByText("iphone", {
        exact: true
    });

    await expect(iphone)
        .toBeVisible({ timeout: 15000 });

    await iphone.click();

    await expect(page)
        .toHaveURL(/products_page\/51/, {
            timeout: 15000
        });


    // Add product if required
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton)
        .toBeVisible({ timeout: 15000 });

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
    await page.locator('#cart').click();

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


    // Verify address selection page
    await expect(page)
        .toHaveURL(/\/selectaddress$/, {
            timeout: 15000
        });

    await expect(
        page.getByText("Add New Address", {
            exact: true
        })
    ).toBeVisible();

});


test("Verify shopper can add new delivery address", async ({ page }) => {

    test.setTimeout(90000);

    await page.goto("https://www.shoppersstack.com/", {
        waitUntil: "domcontentloaded"
    });

    // Login
    await page.getByRole("button", { name: "Login" }).click();

    await page.getByRole("textbox", { name: "Email" })
        .fill("loganstark@gmail.com");

    await page.getByRole("textbox", { name: "Password" })
        .fill("Logan@123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(
        page.getByText("Hello, Logan")
    ).toBeVisible({ timeout: 15000 });


    // Open iPhone
    const iphone =
        page.getByText("iphone", {
            exact: true
        });

    await expect(iphone)
        .toBeVisible({ timeout: 15000 });

    await iphone.click();


    // Add product if required
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton)
        .toBeVisible({ timeout: 15000 });

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


    // Cart
    await page.locator('#cart').click();

    await expect(page)
        .toHaveURL(/\/cart$/, {
            timeout: 15000
        });


    // Buy Now
    await page.getByRole("button", {
        name: "Buy Now"
    }).click();

    await expect(page)
        .toHaveURL(/\/selectaddress$/, {
            timeout: 15000
        });


    // Add New Address
    const addNewAddress =
        page.getByText("Add New Address", {
            exact: true
        });

    await expect(addNewAddress)
        .toBeVisible();

    await addNewAddress.click();


    // Verify Add Address form
    await expect(
        page.getByRole("heading", {
            name: "Add Address"
        })
    ).toBeVisible({ timeout: 15000 });


    // Home
    const homeRadio =
        page.getByRole("radio", {
            name: "Home"
        });

    await expect(homeRadio)
        .toBeChecked();


    // Name
    await page.getByRole("textbox", {
        name: "Name"
    }).fill("Test User");


    // House / Office Info
    await page.getByRole("textbox", {
        name: "House/Office Info"
    }).fill("Flat 101");


    // Street Info
    await page.getByRole("textbox", {
        name: "Street Info"
    }).fill("MG Road");


    // Landmark
    await page.getByRole("textbox", {
        name: "Landmark"
    }).fill("Near Test Mall");


    // Country
    const country =
        page.locator('select[name="country"]');

    await country.selectOption("India");

    await expect(country)
        .toHaveValue("India");


    // State
    const state =
        page.locator('select[name="State"]');

    await expect(
        state.locator(
            'option[value="Maharashtra"]'
        )
    ).toHaveCount(1, {
        timeout: 15000
    });

    await state.selectOption("Maharashtra");

    await expect(state)
        .toHaveValue("Maharashtra");


    // City
    const city =
        page.locator('select[name="City"]');

    await expect(
        city.locator(
            'option[value="Pune"]'
        )
    ).toHaveCount(1, {
        timeout: 15000
    });

    await city.selectOption("Pune");

    await expect(city)
        .toHaveValue("Pune");


    // Valid deliverable pincode
    await page.getByRole("textbox", {
        name: "Pincode"
    }).fill("432102");


    // Phone
    await page.getByRole("textbox", {
        name: "Phone Number"
    }).fill("9876543210");


    // Add Address
    const addAddressButton =
        page.getByRole("button", {
            name: "Add Address"
        });

    await expect(addAddressButton)
        .toBeEnabled({ timeout: 15000 });

    await addAddressButton.click();


    // Verify return to address page
    await expect(page)
        .toHaveURL(/\/selectaddress$/, {
            timeout: 15000
        });

});


test("Verify non deliverable saved address displays error", async ({ page }) => {

    test.setTimeout(90000);

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
    ).toBeVisible({ timeout: 15000 });


    // Open iPhone
    const iphone =
        page.getByText("iphone", {
            exact: true
        });

    await expect(iphone)
        .toBeVisible({ timeout: 15000 });

    await iphone.click();


    // Add to cart if required
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton)
        .toBeVisible({ timeout: 15000 });

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


    // Cart
    await page.locator('#cart').click();

    await expect(page)
        .toHaveURL(/\/cart$/);


    // Buy Now
    await page.getByRole("button", {
        name: "Buy Now"
    }).click();

    await expect(page)
        .toHaveURL(/\/selectaddress$/);


    // Address 1 = non-deliverable address
    const savedAddresses =
        page.locator('input[name="address"]');

    const firstAddress =
        savedAddresses.nth(0);

    await expect(firstAddress)
        .toBeVisible({ timeout: 15000 });

    await firstAddress.check();

    await expect(firstAddress)
        .toBeChecked();


    // Proceed
    const proceedButton =
        page.getByRole("button", {
            name: "Proceed"
        });

    await expect(proceedButton)
        .toBeEnabled();

    await proceedButton.click();


    // Verify delivery error
    await expect(
        page.getByText(
            "Please select address to be delivered. Order not deliverable at this pincode"
        )
    ).toBeVisible({ timeout: 10000 });

});


test("Verify shopper can select second saved address and proceed", async ({ page }) => {

    test.setTimeout(90000);

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
    ).toBeVisible({ timeout: 15000 });


    // Open iPhone
    const iphone =
        page.getByText("iphone", {
            exact: true
        });

    await expect(iphone)
        .toBeVisible({ timeout: 15000 });

    await iphone.click();


    // Add product if required
    const addToCartButton =
        page.locator('button[id="Add To Cart"]');

    await expect(addToCartButton)
        .toBeVisible({ timeout: 15000 });

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
    await page.locator('#cart').click();

    await expect(page)
        .toHaveURL(/\/cart$/);


    // Buy Now
    await page.getByRole("button", {
        name: "Buy Now"
    }).click();

    await expect(page)
        .toHaveURL(/\/selectaddress$/);


    // Saved addresses
    const savedAddresses =
        page.locator('input[name="address"]');

    // Make sure Address 1 exists
    await expect(savedAddresses.nth(0))
        .toBeVisible({ timeout: 15000 });

    // Make sure Address 2 exists
    await expect(savedAddresses.nth(1))
        .toBeVisible({ timeout: 15000 });


    // Select second address
    const secondAddress =
        savedAddresses.nth(1);

    await secondAddress.check();

    await expect(secondAddress)
        .toBeChecked();


    // First address should be unselected
    await expect(savedAddresses.nth(0))
        .not.toBeChecked();


    // Proceed
    const proceedButton =
        page.getByRole("button", {
            name: "Proceed"
        });

    await expect(proceedButton)
        .toBeEnabled();

    await proceedButton.click();


    // Verify payment page
    await expect(page)
        .toHaveURL(/\/payment-options$/, {
            timeout: 15000
        });

});