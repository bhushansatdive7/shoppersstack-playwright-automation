# ShoppersStack Playwright Automation Framework

An end-to-end UI automation testing project built using **Playwright with JavaScript** for the ShoppersStack e-commerce application.

This project demonstrates practical QA automation concepts including **Page Object Model (POM), data-driven testing, cross-browser testing, end-to-end workflows, HTML reporting, and CI execution using GitHub Actions**.

## Application Under Test

ShoppersStack
https://www.shoppersstack.com/

## Tech Stack

* Playwright
* JavaScript
* Node.js
* Page Object Model
* JSON test data
* Git
* GitHub
* GitHub Actions

## Framework Features

* Page Object Model architecture
* Reusable page classes and methods
* JSON-based test data
* End-to-end e-commerce automation
* Cross-browser execution
* Chromium support
* Firefox support
* WebKit support
* Playwright HTML reports
* Screenshots on test failure
* Trace collection
* Video retention on failures
* GitHub Actions CI pipeline

## Automated Test Scenarios

The automation suite covers major ShoppersStack workflows including:

### Homepage

* Verify application launch
* Verify page title
* Verify application URL

### Login

* Navigate to login page
* Verify invalid login credentials
* Verify successful login

### Registration

* Navigate to Create Account
* Validate registration fields
* Automate registration scenarios

### Product

* Open product details page
* Verify product information
* Add product to cart

### Cart

* Verify added product in cart
* Remove product from cart
* Increase product quantity
* Decrease product quantity
* Proceed using Buy Now

### Checkout

* Navigate to address selection
* Add delivery address
* Validate non-deliverable pincode
* Select saved delivery address
* Proceed to payment

### Payment

* Verify payment options page
* Select Cash On Delivery
* Verify Proceed button behavior
* Place COD order

### End-to-End Order Flow

The complete POM-based E2E test automates:

```text
Login
  ↓
Open Product
  ↓
Add to Cart
  ↓
Open Cart
  ↓
Buy Now
  ↓
Select Delivery Address
  ↓
Payment Options
  ↓
Cash On Delivery
  ↓
Place Order
  ↓
Order Confirmation
```

The test also validates the dynamically generated order number.

## Project Structure

```text
shoppersstack-playwright-automation/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── loginPage.js
│   ├── productPage.js
│   ├── cartPage.js
│   ├── checkoutPage.js
│   └── paymentPage.js
│
├── test-data/
│   └── testData.json
│
├── tests/
│   ├── homepage.spec.js
│   ├── login.spec.js
│   ├── registration.spec.js
│   ├── products.spec.js
│   ├── Cart.spec.js
│   ├── Checkout.spec.js
│   ├── payment.spec.js
│   └── e2e.spec.js
│
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/bhushansatdive7/shoppersstack-playwright-automation.git
```

Move into the project folder:

```bash
cd shoppersstack-playwright-automation
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the complete test suite:

```bash
npx playwright test
```

Run tests using one worker:

```bash
npx playwright test --workers=1
```

Run only the end-to-end POM test:

```bash
npx playwright test tests/e2e.spec.js
```

Run the E2E test on Chromium:

```bash
npx playwright test tests/e2e.spec.js --project=chromium --headed --workers=1
```

Run on Firefox:

```bash
npx playwright test tests/e2e.spec.js --project=firefox
```

Run on WebKit:

```bash
npx playwright test tests/e2e.spec.js --project=webkit
```

## Test Reports

Playwright generates an HTML report after execution.

Open the report using:

```bash
npx playwright show-report
```

The framework is also configured to retain useful debugging information such as screenshots, traces, and videos when applicable.

## Cross-Browser Testing

The framework supports:

* Chromium
* Firefox
* WebKit

The complete POM-based E2E order flow has been executed successfully across all three browser engines locally.

## Continuous Integration

GitHub Actions is configured using:

```text
.github/workflows/playwright.yml
```

The CI pipeline performs the following steps:

```text
Checkout Repository
        ↓
Setup Node.js
        ↓
Install Dependencies
        ↓
Install Playwright Browsers
        ↓
Run Playwright Tests
        ↓
Generate HTML Report
        ↓
Upload Playwright Report
```

The workflow runs automatically when code is pushed to the `main` branch or when a pull request targets `main`.

## Key QA Concepts Demonstrated

* Functional testing
* Positive testing
* Negative testing
* End-to-end testing
* UI automation
* Locator strategies
* Assertions
* Dynamic data validation
* Page Object Model
* Data-driven testing
* Cross-browser testing
* CI automation
* Test reporting

## Author

**Bhushan Satdive**

GitHub: https://github.com/bhushansatdive7

LinkedIn: https://www.linkedin.com/in/bhushan-satdive-879b6a27b
