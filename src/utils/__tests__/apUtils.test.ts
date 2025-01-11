import '@testing-library/jest-dom';

import { getDeprecationMsgForRemoval } from '../appUtils';

describe('arrayUtils unit test', () => {
  it('getDeprecationMsgForRemoval unit tests', () => {
    getDeprecationMsgForRemoval('test');
  });
});
