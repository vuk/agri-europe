import { MkGroupPage } from './app.po';

describe('mk-group App', () => {
  let page: MkGroupPage;

  beforeEach(() => {
    page = new MkGroupPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
