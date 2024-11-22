import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  configureStore,
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import preferredColorScheme from '../../utils/eventListeners/preferredColorScheme';
import { THEME } from '../../enums/app';
import useTheme from '../useTheme';
import { AppRedux, MQEventListener } from '../../types/types.d';
import matchMediaMock from '../../__tests__/__mocks__/matchMediaMock';

jest.mock('../../utils/eventListeners/preferredColorScheme', () => ({
  __esModule: true,
  default: {
    subscribe: jest.fn(),
    unSubscribe: jest.fn(),
  },
}));

describe('useAppMount unit tests', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: matchMediaMock(true),
    });
  });

  afterEach(cleanup);

  it('incase of light mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      (callBackFn: MQEventListener) =>
        callBackFn.call(window.matchMedia('(prefers-color-scheme: dark)'), {
          matches: false,
        } as MediaQueryListEvent),
    );

    const appSlice = createSlice<
      AppRedux,
      SliceCaseReducers<AppRedux>,
      string,
      SliceSelectors<AppRedux>,
      string
    >({
      name: 'app',
      initialState: {
        theme: THEME.LIGHT,
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    const TestComponent = () => {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    };

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of theme changes from dark mode to light mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      (callBackFn: MQEventListener) =>
        callBackFn.call(window.matchMedia('(prefers-color-scheme: dark)'), {
          matches: true,
        } as MediaQueryListEvent),
    );

    const appSlice = createSlice<
      AppRedux,
      SliceCaseReducers<AppRedux>,
      string,
      SliceSelectors<AppRedux>,
      string
    >({
      name: 'app',
      initialState: {
        theme: THEME.DARK,
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    const TestComponent = () => {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    };

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of theme changes from light mode to dark mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      (callBackFn: MQEventListener) =>
        callBackFn.call(window.matchMedia('(prefers-color-scheme: dark)'), {
          matches: true,
        } as MediaQueryListEvent),
    );

    const appSlice = createSlice<
      AppRedux,
      SliceCaseReducers<AppRedux>,
      string,
      SliceSelectors<AppRedux>,
      string
    >({
      name: 'app',
      initialState: {
        theme: THEME.LIGHT,
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    const TestComponent = () => {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    };

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of dark mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      (callBackFn: MQEventListener) =>
        callBackFn.call(window.matchMedia('(prefers-color-scheme: dark)'), {
          matches: false,
        } as MediaQueryListEvent),
    );

    const appSlice = createSlice<
      AppRedux,
      SliceCaseReducers<AppRedux>,
      string,
      SliceSelectors<AppRedux>,
      string
    >({
      name: 'app',
      initialState: {
        theme: THEME.DARK,
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        app: appSlice.reducer,
      },
    });

    const TestComponent = () => {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    };

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
