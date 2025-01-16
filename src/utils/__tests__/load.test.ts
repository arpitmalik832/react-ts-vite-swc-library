import '@testing-library/jest-dom';

import load from '../eventListeners/load';

describe('load unit tests', () => {
  const callBackFn = jest.fn();
  it('load functions test', () => {
    load.callBackFn.call(window, {} as Event);
    load.subscribe(callBackFn);
    load.callBackFn.call(window, {} as Event);
    expect(callBackFn).toHaveBeenCalledTimes(1);
    load.unSubscribe();
  });
});
