import { Tests } from "./Test";

export const tests: Tests = {
    base: 'https://example.com',
    agents: [
        {
            name: 'iPhoneSE',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1',
            viewport: {
                width: 320,
                height: 568,
                isMobile: true,
                hasTouch: true,
            }
        },
        {
            name: 'PC',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
            viewport: {
                width: 1024,
                height: 768,
            }
        }
    ],
    pages: [
        {
            path: '/',
            file: 'top.webp',
        },
        {
            evalute: async (page)=>{
                await page.click('a');
                await new Promise(resolve=>setTimeout(resolve, 3000));
            },
            file: 'learn-more.webp',
        },
    ],
};
