import '@testing-library/jest-dom';

import * as e from '../index';

describe('index.ts exports', () => {
  it('snapshot test', () => {
    expect(e).toMatchSnapshot();
  });

  it('should export useApiRequest', () => {
    expect(e).toHaveProperty('useApiRequest');
  });

  it('should export useBackPress', () => {
    expect(e).toHaveProperty('useBackPress');
  });

  it('should export useTheme', () => {
    expect(e).toHaveProperty('useTheme');
  });
});
