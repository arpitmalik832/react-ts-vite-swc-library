import '@testing-library/jest-dom';

import { convertToArrayOfPairs, renameKeys } from '../objectUtils';

describe('objectUtils unit tests', () => {
  it('convertToArrayOfPairs unit test', () => {
    convertToArrayOfPairs({ a: 'b', c: 'd' });
    convertToArrayOfPairs();
  });

  it('renameKeys unit test', () => {
    const m = {
      a: 'b',
      c: 'd',
    };
    renameKeys(m, { a: 'b', c: 'd' });
  });

  it('renameKeys unit test', () => {
    const m = {
      a: 'b',
    };
    renameKeys(m, { a: 'b', c: 'd' });
  });
});
