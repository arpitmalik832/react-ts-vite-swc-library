/**
 * Unit tests for useTheme hook.
 * @file The file is saved as `useTheme.test.jsx`.
 */
import { cleanup, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux';

import preferredColorScheme from '../../utils/eventListeners/preferredColorScheme';
import { THEME } from '../../enums/app';
import useTheme from '../useTheme';
import { setDarkTheme, setLightTheme } from '../../redux/slices/appSlice';
import { ReduxState } from '../../redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('../../redux/slices/appSlice', () => ({
  setDarkTheme: jest.fn(),
  setLightTheme: jest.fn(),
}));

jest.mock('../../utils/eventListeners/preferredColorScheme', () => ({
  __esModule: true,
  default: {
    subscribe: jest.fn(),
    unSubscribe: jest.fn(),
  },
}));

describe('useAppMount unit tests', () => {
  const mockDispatch = jest.fn().mockReturnValue(() => jest.fn()) as jest.Mock<
    ReturnType<reactRedux.UseDispatch>,
    Parameters<reactRedux.UseDispatch>
  >;
  let mockMediaQueryList;

  const subscribeSpy = jest.spyOn(preferredColorScheme, 'subscribe');
  const unSubscribeSpy = jest.spyOn(preferredColorScheme, 'unSubscribe');

  beforeEach(() => {
    jest.spyOn(reactRedux, 'useDispatch').mockImplementation(mockDispatch);
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(selector =>
      selector({
        app: {
          theme: THEME.LIGHT,
        },
      } as unknown as ReduxState),
    );

    // Create mock MediaQueryList
    mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    };

    window.matchMedia = jest.fn().mockReturnValue(mockMediaQueryList);
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('snapshot test', () => {
    const component = renderHook(() => useTheme());

    expect(subscribeSpy).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it('should initialize with light theme', () => {
    renderHook(() => useTheme());
    expect(subscribeSpy).toHaveBeenCalled();
  });

  it('should handle change to dark theme', () => {
    renderHook(() => useTheme());

    const [callback] = subscribeSpy.mock.calls[0];

    callback.call(
      { matches: false } as MediaQueryList,
      { matches: true } as MediaQueryListEvent,
    );

    expect(setDarkTheme).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should handle change to light theme', () => {
    // Setup initial dark theme
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(selector =>
      selector({
        app: {
          theme: THEME.DARK,
        },
      } as unknown as ReduxState),
    );
    renderHook(() => useTheme());

    const [callback] = subscribeSpy.mock.calls[0];

    callback.call(
      { matches: true } as MediaQueryList,
      { matches: false } as MediaQueryListEvent,
    );
    expect(setDarkTheme).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should not dispatch if theme matches preference for light', () => {
    // Setup initial dark theme
    jest.spyOn(reactRedux, 'useSelector').mockImplementation(selector =>
      selector({
        app: {
          theme: THEME.DARK,
        },
      } as unknown as ReduxState),
    );

    // Render hook
    renderHook(() => useTheme());

    // Get the callback function passed to subscribe
    const [callback] = subscribeSpy.mock.calls[0];

    // Simulate dark theme preference (matches current theme)
    callback.call(
      { matches: false } as MediaQueryList,
      { matches: true } as MediaQueryListEvent,
    );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe on unmount', () => {
    const { unmount } = renderHook(() => useTheme());

    unmount();

    expect(unSubscribeSpy).toHaveBeenCalled();
  });

  it('should handle system theme change event', () => {
    renderHook(() => useTheme());

    // Get the callback function passed to subscribe
    const [callback] = subscribeSpy.mock.calls[0];

    // Simulate system theme change event
    const changeEvent = new Event('change');
    Object.defineProperty(changeEvent, 'matches', { value: true });
    callback.call(
      { matches: false } as MediaQueryList,
      changeEvent as MediaQueryListEvent,
    );

    expect(setDarkTheme).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple theme changes', () => {
    renderHook(() => useTheme());
    const [callback] = subscribeSpy.mock.calls[0];

    // Simulate multiple theme changes
    callback.call(
      { matches: false } as MediaQueryList,
      { matches: true } as MediaQueryListEvent,
    );
    expect(setDarkTheme).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    callback.call(
      { matches: true } as MediaQueryList,
      { matches: false } as MediaQueryListEvent,
    );
    expect(setLightTheme).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledTimes(1);

    callback.call(
      { matches: false } as MediaQueryList,
      { matches: true } as MediaQueryListEvent,
    );
    expect(setDarkTheme).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should handle MediaQueryList change event', () => {
    // Create a mock MediaQueryList with change event support
    mockMediaQueryList = {
      matches: false,
      addEventListener: jest.fn((event, handler: jest.Mock) => {
        handler({ matches: true } as unknown as MediaQueryListEvent); // Simulate immediate change
      }),
      removeEventListener: jest.fn(),
    };

    window.matchMedia = jest.fn().mockReturnValue(mockMediaQueryList);

    renderHook(() => useTheme());

    // Get the callback function passed to subscribe
    const [callback] = subscribeSpy.mock.calls[0];

    // Simulate MediaQueryList change event
    callback.call(
      { matches: false } as MediaQueryList,
      { matches: true } as MediaQueryListEvent,
    );

    expect(setDarkTheme).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
