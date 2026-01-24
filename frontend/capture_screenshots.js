
import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const BASE_URL = 'http://localhost:5173';

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1280, height: 800 }
    });
    const page = await browser.newPage();

    try {
        console.log(`Navigating to ${BASE_URL}...`);
        await page.goto(BASE_URL, { waitUntil: 'networkidle0' });

        // Helper to take screenshot
        const snap = async (name) => {
            const filePath = path.join(SCREENSHOT_DIR, `${name}.png`);
            await page.screenshot({ path: filePath, fullPage: true });
            console.log(`Saved ${name}.png`);
            // Small delay to ensure UI settles if needed
            await new Promise(r => setTimeout(r, 500));
        };

        // 1. Home
        await snap('01_Home');

        // 2. Menu
        console.log('Clicking Menu...');
        // Find button with text 'Menu' inside nav
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            const btn = buttons.find(b => b.textContent.includes('Menu'));
            if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1000)); // Wait for transition
        await snap('02_Menu');

        // 3. Order Online
        console.log('Clicking Order Online...');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            const btn = buttons.find(b => b.textContent.includes('Order Online'));
            if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1000));
        await snap('03_OrderOnline');

        // 4. Services
        console.log('Clicking Services...');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            const btn = buttons.find(b => b.textContent.includes('Services'));
            if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1000));
        await snap('04_Services');

        // 5. Our Story
        console.log('Clicking Our Story...');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            const btn = buttons.find(b => b.textContent.includes('Our Story'));
            if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1000));
        await snap('05_Story');

        // 6. Reservations
        console.log('Clicking Reservations...');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('nav button'));
            const btn = buttons.find(b => b.textContent.includes('Reservations'));
            if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 1000));
        await snap('06_Reservations');

        // 7. Admin (Login)
        console.log('Accessing Admin...');
        // Double click the logo
        // Logo is likely the image or the container. Navbar.jsx: <div ... onClick... onDoubleClick...>
        // It's the first div inside the nav container that has onClick
        // Let's use a selector. `img[alt="Dosa Spot Logo"]` parent.
        await page.evaluate(() => {
            const img = document.querySelector('img[alt="Dosa Spot Logo"]');
            if (img && img.parentElement) {
                // Dispatch double click
                const dblclick = new MouseEvent('dblclick', {
                    'view': window,
                    'bubbles': true,
                    'cancelable': true
                });
                img.parentElement.dispatchEvent(dblclick);
            }
        });
        await new Promise(r => setTimeout(r, 1000));
        await snap('07_Admin_Login');

        // 8. Admin (Dashboard)
        console.log('Logging into Admin...');
        await page.type('input[type="password"]', 'dosa123');
        await page.click('button[type="submit"]');
        await new Promise(r => setTimeout(r, 1000));
        await snap('08_Admin_Dashboard');

        // 9. Admin Menu Tab
        console.log('Admin Menu Tab...');
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const btn = buttons.find(b => b.textContent.includes('Manage Menu'));
            if (btn) btn.click();
        });
        await new Promise(r => setTimeout(r, 500));
        await snap('09_Admin_Menu');

        console.log('Done!');

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await browser.close();
    }
})();
