Allure usage (avoid opening index.html directly):

1) Run tests to produce Allure results:
   npm test

2) Generate the Allure HTML report:
   npm run allure:generate

3) Open the Allure report via a local HTTP server (fixes endless loading spinner):
   npm run allure:open
   # Alternatively, serve from allure-results directly:
   npm run allure:serve

Notes:
- Opening allure-report/index.html with file:// can cause the page to stay on the loading spinner due to browser security blocking XHR requests.
- The project is configured to output Allure results via the Playwright reporter. If you change reporters, ensure 'allure-playwright' remains enabled.
