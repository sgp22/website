import { browser, by, element } from 'protractor';

export class DocsPage {
  navigateTo() {
    return browser.get('/develop/iux/1.0.0/tab');
  }

  getFirstSectionHeadingText() {
    return element(by.css('h1')).getText();
  }

  getNavText() {
    return element(by.css('aside.sidebar')).getText();
  }
}
