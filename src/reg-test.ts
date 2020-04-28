import puppeteer = require('puppeteer');
import mkdirp = require('mkdirp');
import { realpathSync, existsSync } from 'fs';
import del = require('del');

export interface Tests {
    base: string;
    agents: {
        name: string,
        viewport: puppeteer.Viewport,
        userAgent: string,
    }[]
    pages: { path?: string, file?: string, evalute?: (tab: puppeteer.Page)=>Promise<void> }[];
}

const DIRS: {[key:string]: string} = {
    expected: `${__dirname}/../.reg/expected`,
    actual: `${__dirname}/../.reg/actual`,
};
mkdirp.sync(DIRS.expected);
DIRS.expected = realpathSync(DIRS.expected);
mkdirp.sync(DIRS.actual);
DIRS.actual  = realpathSync(DIRS.actual);

const param = process.argv[2] as any;
const dir = DIRS[param] as string|null;
if(dir == null) {
    throw new Error('出力先ディレクトリの指定に誤りがあります。');
}

const file = existsSync(`${__dirname}/reg-test-setting.ts`) ? './reg-test-setting':'./reg-test-setting-dist'
const tests: Tests = require(file) && require(file).tests ;
if(tests == null) {
    throw new Error('設定ファイルの書式に誤りがあります。');
}

del.sync(`${dir}/*`);
tests.agents.forEach(async agent => {
    const dirWithAgent = dir + '/' + agent.name;
    const browser = await puppeteer.launch();
    const tab = await browser.newPage();
    await tab.setViewport(agent.viewport);
    await tab.setUserAgent(agent.userAgent);

    mkdirp.sync(dirWithAgent);
    for(const page of tests.pages) {
        if(page.path != null) {
            const url = tests.base + page.path;
            await tab.goto(url, {
                waitUntil: 'load'
            });
        }
        if(page.evalute) {
            await page.evalute(tab);
        }
        if(page.file) {
            const path = `${dirWithAgent}/${page.file}`;
            await tab.screenshot({path, fullPage: true});
            console.log(`${tab.url()}\n  saved to ${path}`);
        }
    }

    browser.close();
});
