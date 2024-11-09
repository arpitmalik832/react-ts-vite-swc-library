import '@testing-library/jest-dom';

import * as e from '../index';

describe('index.ts exports', () => {
  it('snapshot test', () => {
    expect(e).toMatchSnapshot();
  });

  it('should export Button', () => {
    expect(e).toHaveProperty('Button');
  });

  it('should export ComponentWithSuspense', () => {
    expect(e).toHaveProperty('ComponentWithSuspense');
  });

  it('should export HtmlContent', () => {
    expect(e).toHaveProperty('HtmlContent');
  });
});
