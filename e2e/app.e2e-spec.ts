import { Z3Page } from './app.po';

describe('z3 App', () => {
  let page: Z3Page;

  beforeEach(() => {
    page = new Z3Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
