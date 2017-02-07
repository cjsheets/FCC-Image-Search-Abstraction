import { NodeImageSearchAbstractionPage } from './app.po';

describe('node-image-search-abstraction App', function() {
  let page: NodeImageSearchAbstractionPage;

  beforeEach(() => {
    page = new NodeImageSearchAbstractionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
