import { test } from '@playwright/test';

test("Verify ShoppersStack homepage loads successfully", async ({ page }) => {
    await page.goto("https://www.shoppersstack.com/");
    let title = await page.title();
    console.log(title);
    let url = page.url();
    console.log(url);

});