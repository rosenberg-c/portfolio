import { lookup } from 'node:dns/promises';
import { mkdir } from 'node:fs/promises';
import { dirname, extname, join, parse } from 'node:path';
import puppeteer from 'puppeteer-core';

async function resolveTarget(rawUrl) {
    const url = new URL(rawUrl);
    if (url.hostname === 'host.docker.internal') {
        // Vite permits IP hosts without opening its allowedHosts to other names.
        const { address } = await lookup(url.hostname, { family: 4 });
        url.hostname = address;
    }
    return url.toString();
}

const [
    url,
    output = 'docs/screenshots/screenshot.png',
    width = '1440',
    height = '900'
] = process.argv.slice(2);

if (!url) {
    console.error('Usage: screenshot <url> [output] [width] [height]');
    process.exit(1);
}

const target = await resolveTarget(url);
const { dir, name } = parse(output);
const extension = extname(output) || '.png';

for (const [theme, scheme] of [['light', 1], ['dark', 0]]) {
    const path = join(dir, `${name}-${theme}${extension}`);
    const browser = await puppeteer.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--hide-scrollbars',
            '--disable-local-storage',
            `--blink-settings=preferredColorScheme=${scheme}`
        ]
    });

    try {
        const page = await browser.newPage();

        await page.setViewport({
            width: Number(width),
            height: Number(height),
            deviceScaleFactor: 1
        });

        const response = await page.goto(target, {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        if (!response || !response.ok()) {
            throw new Error(`Navigation failed: ${target} (HTTP ${response?.status() ?? 'no response'})`);
        }

        // Wait for network activity to settle.
        await page.waitForNetworkIdle({
            idleTime: 1000,
            timeout: 30000
        });

        // Trigger lazy-loaded images.
        await page.evaluate(() => {
            document.querySelectorAll('img').forEach(img => {
                img.loading = 'eager';
            });
        });

        // Wait for remote images.
        await page.waitForNetworkIdle({
            idleTime: 1000,
            timeout: 30000
        });

        // Wait for fonts and image decoding.
        await page.evaluate(async () => {
            await document.fonts.ready;

            await Promise.allSettled(
                [...document.images].map(img => img.decode())
            );
        });

        await mkdir(dirname(path), { recursive: true });
        await page.screenshot({
            path,
            fullPage: true
        });

        console.log(`Screenshot saved: ${path}`);

    } finally {
        await browser.close();
    }
}
