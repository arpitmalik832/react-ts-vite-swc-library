import '@testing-library/jest-dom';

import preferredColorScheme from '../../eventListeners/preferredColorScheme';
import matchMediaMock from '../../../__tests__/__mocks__/matchMediaMock';

describe('preferredColorScheme unit tests', () => {
  const callBackFn = jest.fn();

  it('preferredColorScheme functions test', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock(true),
    });

    preferredColorScheme.callBackFn.call(
      { matches: false } as MediaQueryList,
      { matches: false } as MediaQueryListEvent,
    );
    preferredColorScheme.subscribe(callBackFn);
    preferredColorScheme.callBackFn.call(
      { matches: true } as MediaQueryList,
      { matches: true } as MediaQueryListEvent,
    );
    expect(callBackFn).toHaveBeenCalledTimes(2);
    preferredColorScheme.unSubscribe();
  });
});
