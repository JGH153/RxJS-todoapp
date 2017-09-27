import { TodoRxJSPage } from './app.po';

describe('todo-rx-js App', () => {
  let page: TodoRxJSPage;

  beforeEach(() => {
    page = new TodoRxJSPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to TRXJS!');
  });
});
