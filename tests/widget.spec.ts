import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup (it is rendered twice on the page)
    await page.locator('._UCHI_COOKIE__button').first().click();
  });

  test('opens', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async () => {
    await widgetPage.openWidget();

    await widgetPage.getPopularArticles().first().click();

    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });

  test('search shows found articles', async () => {
    await widgetPage.openWidget();

    await widgetPage.search('пароль');

    const results = widgetPage.getSearchResults();
    await expect(results.first()).toBeVisible();

    const count = await results.count();
    await expect(widgetPage.getSearchResultsTitle()).toHaveText(new RegExp(`^Нашл\\S* ${count} стат`));
  });
});
