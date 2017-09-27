import { browser, by, element } from 'protractor';

export class TodoRxJSPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('TRXJS-root h1')).getText();
  }
}
