import { test } from '@playwright/test';

import { LoginPage } from '../pages/loginPage.js';
import { ProductPage } from '../pages/productPage.js';
import { CartPage } from '../pages/cartPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';
import { PaymentPage } from '../pages/paymentPage.js';

import testData from '../test-data/testData.json';


test("Verify complete COD order using Page Object Model", async ({ page }) => {

    test.setTimeout(90000);

    // Create Page Objects
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const paymentPage = new PaymentPage(page);


    // LOGIN
    await loginPage.open();

    await loginPage.login(
        testData.validUser.email,
        testData.validUser.password
    );

    await loginPage.verifyLogin();


    // PRODUCT
    await productPage.openProduct();

    await productPage.addToCart();


    // CART
    await cartPage.openCart();

    await cartPage.verifyProductInCart();

    await cartPage.clickBuyNow();


    // CHECKOUT
    await checkoutPage.verifyCheckoutPage();

    await checkoutPage.selectSecondAddressAndProceed();


    // PAYMENT
    await paymentPage.verifyPaymentPage();

    await paymentPage.completeCODOrder();

});