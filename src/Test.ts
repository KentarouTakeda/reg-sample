import puppeteer = require('puppeteer');

export interface Tests {
    /**
     * テスト対象のBase URL
     */
    base: string;

    /**
     * ナビゲーション終了時に実行する関数
     */
    afterNavigation?: (tab: puppeteer.Page)=>Promise<void>;

    agents: Agent[]

    pages: Page[];
}

/**
 * ユーザーエージェント情報
 */
interface Agent {
    /**
     * 名称（何でも良い・スクリーンショットのフォルダ名に使われる）
     */
    name: string,
    /**
     * ビューポート定義
     */
    viewport: puppeteer.Viewport,
    /**
     * User-Agetnヘッダの値
     */
    userAgent: string,
}

/**
 * スクレイピング対象
 */
interface Page {
    /**
     * スクリーンショットを撮影するパス
     */
    path?: string;
    /**
     * スクリーンショットのファイル名
     */
    file?: string;
    /**
     * スクリーンショットを撮影する前に実行する関数
     */
    evalute?: (tab: puppeteer.Page)=>Promise<void>;
}

