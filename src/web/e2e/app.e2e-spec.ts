import { AppPage } from './app.po';

describe('ux-site App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display logo text', () => {
    page.navigateTo();
    expect(page.getLogoText()).toEqual('Infor UX');
  });
});
