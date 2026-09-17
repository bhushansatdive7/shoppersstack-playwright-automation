import { test, expect } from '@playwright/test';


test("Verify login with invalid credentials", async ({ page }) => {

    await page.goto("https://www.shoppersstack.com/");

    await page.getByRole("button", { name: "Login" }).click();

    await page.getByRole("textbox", { name: "Email" })
        .fill("Logan@gmail.com");

    await page.getByRole("textbox", { name: "Password" })
        .fill("Logan@123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(
        page.getByText("Given user ID or password is wrong")
    ).toBeVisible();
});


test("Verify registered user can login successfully", async ({ page }) => {

    await page.goto("https://www.shoppersstack.com/");

    await page.getByRole("button", { name: "Login" }).click();

    await page.getByRole("textbox", { name: "Email" })
        .fill("loganstark@gmail.com");

    await page.getByRole("textbox", { name: "Password" })
        .fill("Logan@123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(
        page.getByText("Hello, Logan")
    ).toBeVisible();
});