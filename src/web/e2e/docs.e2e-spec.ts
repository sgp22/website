import { DocsPage} from './docs.po';

describe('ux-site Docs', () => {
  let page: DocsPage;

  beforeEach(() => {
    page = new DocsPage();
  });

  it('should contain "tab" in h1 text', () => {
    page.navigateTo();
    page.getFirstSectionHeadingText().then((text: string) => {
      expect(text.toLowerCase()).toContain('tab');
    });
  });

  it('should display nav', () => {
    page.navigateTo();
    expect(page.getNavText()).toContain('Version');
    expect(page.getNavText()).toContain('Tabs');
  });
});
