Allure usage (avoid opening index.html directly):

1) Run tests to produce Allure results:
   npm test

2) Generate the Allure HTML report:
   allure generate allure-results --clean

3) Open the Allure report via a local HTTP server (fixes endless loading spinner):
    allure serve allure-results

Notes:
- Opening allure-report/index.html with file:// can cause the page to stay on the loading spinner due to browser security blocking XHR requests.
- The project is configured to output Allure results via the Playwright reporter. If you change reporters, ensure 'allure-playwright' remains enabled.


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

6. Split POM further once pages exceed ~600 lines
maintenancePage/
     index.ts
     createForm.ts
     editForm.ts
     table.ts
