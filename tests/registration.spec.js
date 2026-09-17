import { test, expect } from '@playwright/test';


test("Verify registration is blocked for existing user", async ({ page }) => {

    await page.goto("https://www.shoppersstack.com/");

    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Create Account" }).click();

    await page.locator('input[id="First Name"]').fill("Bhushan");
    await page.locator('input[id="Last Name"]').fill("Satdive");

    await page.locator('input[id="Email Address"]')
        .fill("bhushan123@gmail.com");

    await page.locator('input[id="Password"]')
        .fill("Logan@123");

    await page.locator('input[id="Confirm Password"]')
        .fill("Logan@123");

    await page.locator('input[id="Male"]').check();

    await page.locator('input[id="Phone Number"]')
        .fill("9876543210");

    const terms =
        page.locator('input[id="Terms and Conditions"]');

    await terms.check();

    await expect(terms).toBeChecked();

    const registerButton =
        page.getByRole("button", { name: "Register" });

    await expect(registerButton).toBeEnabled();

    await registerButton.click();

    await expect(
        page.getByText("Given Email ID or Phone number already used")
    ).toBeVisible();
});


test("Verify successful registration with valid unique user details", async ({ page }) => {

    // Generate unique test data
    const timestamp = Date.now();

    const uniqueEmail =
        `bhushan${timestamp}@gmail.com`;

    const uniquePhone =
        `9${timestamp.toString().slice(-9)}`;

    console.log("Registered Email:", uniqueEmail);
    console.log("Registered Phone:", uniquePhone);


    await page.goto("https://www.shoppersstack.com/");

    await page.getByRole("button", { name: "Login" }).click();
    await page.getByRole("button", { name: "Create Account" }).click();


    await page.locator('input[id="First Name"]')
        .fill("Bhushan");

    await page.locator('input[id="Last Name"]')
        .fill("Satdive");

    await page.locator('input[id="Email Address"]')
        .fill(uniqueEmail);

    await page.locator('input[id="Password"]')
        .fill("Logan@123");

    await page.locator('input[id="Confirm Password"]')
        .fill("Logan@123");

    await page.locator('input[id="Male"]')
        .check();

    await page.locator('input[id="Phone Number"]')
        .fill(uniquePhone);


    const terms =
        page.locator('input[id="Terms and Conditions"]');

    await terms.check();

    await expect(terms).toBeChecked();


    const registerButton =
        page.getByRole("button", { name: "Register" });

    await expect(registerButton).toBeEnabled();

    await registerButton.click();


    await expect(
        page.getByText(/Successfully Registered/i)
    ).toBeVisible();

    await expect(page)
        .toHaveURL("https://www.shoppersstack.com/");
});