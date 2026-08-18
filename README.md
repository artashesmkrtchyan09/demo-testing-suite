# PW-MY-FRAMEWORK

End-to-end test automation framework built with [Playwright](https://playwright.dev/) and TypeScript. It targets [Automation Exercise](https://automationexercise.com/) — a demo e-commerce site designed for QA practice.

The framework uses **Page Object Model (POM)** for page-specific logic and **Component Object Model (COM)** for reusable UI sections (header navigation, footer subscription). Custom Playwright fixtures wire everything together so tests stay readable and focused on business scenarios.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [Playwright Test](https://playwright.dev/docs/intro) | Browser automation and test runner |
| TypeScript | Type-safe page objects, fixtures, and test data |
| [@faker-js/faker](https://github.com/faker-js/faker) | Dynamic test data (emails, usernames, etc.) |
| GitHub Actions / GitLab CI | Continuous integration |

---

## Architecture

```
Test specs  →  Custom fixtures  →  Page objects  →  Components  →  Browser
```

- **Tests** (`tests/`) describe *what* to verify — user flows and assertions.
- **Fixtures** (`fixtures/`) handle shared setup: open the site, inject page objects and components.
- **Page objects** (`pages/`) encapsulate page-specific locators and actions.
- **Components** (`pages/components/`) model UI blocks that appear on multiple pages (e.g. header, footer).
- **Test data & constants** keep inputs and expected UI text separate from test logic.

### Design patterns

- **Page Object Model (POM)** — one class per page (`CartPage`, `SignUpLoginPage`, …).
- **Component Object Model (COM)** — shared UI fragments (`Navigation`, `Subscription`) scoped to a root locator (`#header`, `#footer`).
- **Custom fixtures** — extend Playwright's `test` to auto-navigate and inject dependencies.
- **Composition over inheritance** — pages do not extend a monolithic base page; they receive shared components via fixture injection where needed.

### Component strategy

Components are created **once per test** in fixtures and shared across tests and page objects:

- Tests call components directly for simple actions: `navigation.goToCart()`, `subscription.subscribe()`.
- Page objects receive injected components for multi-step workflows: `signUpLoginPage.fullyRegisterUser()`.

---

## Project structure

```
pw-my-framework/
├── tests/                    # Test specifications
│   ├── userLogin.spec.ts     # Registration, login, logout
│   ├── homePage.spec.ts      # Contact Us, subscription
│   ├── cartPage.spec.ts      # Cart and product flows
│   └── testCase.spec.ts      # Test Cases page
├── pages/                    # Page Object Model
│   ├── components/           # Component Object Model
│   │   ├── navigation.ts     # Header links, logout, login status
│   │   └── subscription.ts   # Footer subscription block
│   ├── home-page.ts
│   ├── signup-login-page.ts
│   ├── cart_page.ts
│   ├── products_page.ts
│   ├── contact-us-page.ts
│   └── test-cases-page.ts
├── fixtures/
│   └── pages-fixtures.ts     # Custom test, page, and component fixtures
├── test-data/                # Static user and product data
├── constants/                # URLs and UI text constants
├── interfaces/               # TypeScript interfaces
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── .github/workflows/        # CI pipeline
```

---

## Test coverage

| Spec file | Scenarios |
|-----------|-----------|
| `userLogin.spec.ts` | User registration, login, logout, invalid credentials, duplicate email |
| `homePage.spec.ts` | Contact Us form with file upload, home page subscription |
| `cartPage.spec.ts` | Add/remove products, quantity, cart after login, recommended items, cart subscription |
| `testCase.spec.ts` | Test Cases page visibility |

---

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

---

## Getting started

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

### Run tests

```bash
# Headless (default)
npm test

# With visible browser
npm run test:headed

# Debug mode (Playwright Inspector)
npm run test:debug

# Open HTML report from last run
npm run test:report
```

### Run a single spec file

```bash
npx playwright test tests/userLogin.spec.ts
```

---

## Configuration

Key settings in `playwright.config.ts`:

- **Browser:** Chromium (Desktop Chrome)
- **Parallel execution:** enabled locally; single worker on CI
- **Retries:** 2 on CI, 0 locally
- **Trace:** retained on failure
- **Test ID attribute:** `data-qa` (maps to `getByTestId()`)

The application URL is defined in `constants/generics.ts` as `BASE_URL`.

---

## Writing a new test

Import the custom `test` and `expect` from fixtures — not directly from `@playwright/test`:

```typescript
import { test, expect } from '../fixtures/pages-fixtures';

test('Example flow', async ({ navigation, cartPage }) => {
  await navigation.goToCart();
  await cartPage.checkCartPage();
});
```

Available fixtures:

| Fixture | Description |
|---------|-------------|
| `page` | Browser page (auto-navigates to home) |
| `navigation` | Header navigation component |
| `subscription` | Footer subscription component |
| `homePage` | Home page object |
| `signUpLoginPage` | Sign up / login page object |
| `cartPage` | Cart page object |
| `productsPage` | Products page object |
| `contactsPage` | Contact Us page object |
| `testCasesPage` | Test Cases page object |

---

## CI/CD

Tests run automatically via:

- **GitHub Actions** — `.github/workflows/playwright.yml` (on push/PR to `main` or `master`)
- **GitLab CI** — `.gitlab-ci.yml`

Both install dependencies, run the full suite, and publish the HTML report as an artifact.

---

## License

ISC
