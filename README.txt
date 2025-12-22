Allure usage (avoid opening index.html directly):

1) Run tests to produce Allure results:
   npm test

2) Generate the Allure HTML report:
   allure generate allure-results --clean

3) Open the Allure report via a local HTTP server (fixes endless loading spinner):
    allure serve allure-results


Improvements in terms of structure:

1. Create a clear top-level separation
    /src
        /pom
   /helpers
        /fixtures
        /utils
    /tests
        /maintenance
        /equipment
        /auth
    /test-data
        /equipment
        /maintenance
This mirrors large-scale frameworks:
    ✓ src = reusable code
    ✓ tests = only tests
    ✓ test-data = only data

2. Convert helpers into more descriptive modules
    /src/utils
      dateUtils.ts
      stringUtils.ts
      formUtils.ts

    /src/mappers
      vehicleMapper.ts
      equipmentMapper.ts
This makes your imports more meaningful and easier to search.

3. Page Object Model is good — add “Component Objects”
    /src/pom/components
                    datePicker.ts
                    dropdown.ts
                    table.ts
                    confirmationDialog.ts

4. Introduce tags and test groups:
    test.describe('maintenance @smoke', () => { … })
    test.describe('equipment @regression', () => { … })

5. Add custom expect matchers
    expect.extend({
   async toMatchTable(actual, expected) { … }
})


6. Use a Factory Pattern for test data
Instead of hard-coding vehicle codes everywhere:
    VehicleFactory.create({ type: 'RMG' });
    MaintenanceFactory.futureEvent();
    EquipmentFactory.random();







Running Tests with Tags in Playwright

We use tags to group and filter tests in Playwright. This allows us to run specific subsets of tests depending on the
terminal and the equipment that is available.

Available Tags
    • @smoke: quick smoke tests to validate core functionality
    • @ctb: CTB‑specific tests
    • @htc: HTC‑specific tests
    • @regression: regression tests for broader coverage
    • @api: API‑focused tests

How to run the tags
    - Run only one tag: npx playwright test --grep "@smoke"
    - Run tests that contain either of two tests: npx playwright test --grep "@smoke|@regression"
    - Run tests that contains both tags: npx playwright test --grep "@smoke" --grep "@regression"

Terminal‑Specific Combinations

Because certain terminals have different equipment available, you can combine tags to run the right subset:
    - HTC terminal with CTB equipment: npx playwright test --grep "@htc" --grep "@ctb"

Excluding Tags

Run smoke tests but exclude regression:
    - npx playwright test --grep "@smoke" --grep-invert "@regression"