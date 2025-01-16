import '@testing-library/jest-dom';

import { deduplicate } from '../arrayUtils';

describe('arrayUtils unit test', () => {
  it('testing deduplicate unit tests', () => {
    const arr = ['a', 'a', 'b'];
    const newArr = deduplicate(arr);
    expect(newArr).toStrictEqual(['a', 'b']);
  });
});
