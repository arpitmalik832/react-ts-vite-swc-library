import '@testing-library/jest-dom';

import beforeUnload from '../../eventListeners/beforeUnload';

describe('beforeUnload unit tests', () => {
  const callBackFn = jest.fn();
  it('beforeUnload functions test', () => {
    beforeUnload.callBackFn.call(window, {} as BeforeUnloadEvent);
    beforeUnload.subscribe(callBackFn);
    beforeUnload.callBackFn.call(window, {} as BeforeUnloadEvent);
    expect(callBackFn).toHaveBeenCalledTimes(1);
    beforeUnload.unSubscribe();
  });
});
