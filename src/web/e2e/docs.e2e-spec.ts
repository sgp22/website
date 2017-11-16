import { DocsPage} from './docs.po';

describe('ux-site Docs', () => {
  let page: DocsPage;

  beforeEach(() => {
    page = new DocsPage();
  });

  it('should display docs h1 title', () => {
    page.navigateTo();
    expect(page.getFirstSectionHeading()).toBe('h1');
  });

  it('should display nav', () => {
    page.navigateTo();
    expect(page.getNavText()).toContain('Version');
    expect(page.getNavText()).toContain('Tabs');
  });
});
