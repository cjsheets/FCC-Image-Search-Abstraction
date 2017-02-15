import { NodeImageSearchAbstractionPage } from './app.po';
import { browser, element, by } from 'protractor';  
describe('node-image-search-abstraction App', function() {
  let page: NodeImageSearchAbstractionPage;

  beforeEach(() => {
    page = new NodeImageSearchAbstractionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
	browser.pause();
    expect(page.getParagraphText()).toEqual('app works!');
  });

  // browser.pause();
  //  - c: move foward
  //  - repl: interactive mode
});
