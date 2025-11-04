// tests/fixtures.ts
import { test as base, expect as baseExpect } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use, testInfo) => {
        // Verzamel netwerkevents (methode + url + status)
        const net: string[] = [];
        page.on('request', (req) => {
            net.push(`--> ${req.method()} ${req.url()}`);
        });
        page.on('response', async (res) => {
            const req = res.request();
            net.push(`<-- ${req.method()} ${res.url()} ${res.status()}`);
        });

        await use(page);

        // Bij falen: netwerk-log + extra screenshot als Allure attachments
        if (testInfo.status !== testInfo.expectedStatus) {
            // Netwerk-log
            await testInfo.attach('network.log', {
                body: net.join('\n'),
                contentType: 'text/plain',
            });

            // Extra "laatste state" screenshot (naast screenshot: 'only-on-failure')
            const shotPath = testInfo.outputPath('last-state.png');
            await page.screenshot({ path: shotPath, fullPage: true });
            await testInfo.attach('last-state.png', {
                path: shotPath,
                contentType: 'image/png',
            });
        }
    },
});

export const expect = baseExpect;