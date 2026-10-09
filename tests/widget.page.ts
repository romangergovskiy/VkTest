import {Locator, Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
    SEARCH_INPUT = '[class^=search__] input',
    SEARCH_RESULTS = '[class^=found__]',
    SEARCH_RESULTS_TITLE = `${SEARCH_RESULTS} > [class^=title__]`,
    SEARCH_RESULTS_ITEM = `${SEARCH_RESULTS} [data-testid=article-list-item]`,
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    getPopularArticles(): Locator {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM)
    }

    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    getTitle(): Locator {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT);
    }

    getWidgetBody() {
        return this.wrapper().locator(WidgetPage.selector.WIDGET_BODY);
    }

    async search(query: string) {
        return this.wrapper().locator(WidgetPage.selector.SEARCH_INPUT).fill(query);
    }

    getSearchResultsTitle(): Locator {
        return this.wrapper().locator(WidgetPage.selector.SEARCH_RESULTS_TITLE);
    }

    getSearchResults(): Locator {
        return this.wrapper().locator(WidgetPage.selector.SEARCH_RESULTS_ITEM);
    }
}
