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
import { AppRedux } from '../../types/types.d';

jest.mock('../../utils/eventListeners/preferredColorScheme', () => ({
  __esModule: true,
  default: {
    subscribe: jest.fn(),
    unSubscribe: jest.fn(),
  },
}));

describe('useAppMount unit tests', () => {
  afterEach(cleanup);

  it('incase of light mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      callBackFn => callBackFn({ matches: false }),
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

    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of theme changes from dark mode to light mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      callBackFn => callBackFn({ matches: true }),
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

    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of theme changes from light mode to dark mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      callBackFn => callBackFn({ matches: true }),
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

    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('incase of dark mode', () => {
    (preferredColorScheme.subscribe as jest.Mock).mockImplementation(
      callBackFn => callBackFn({ matches: false }),
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

    function TestComponent() {
      useTheme();

      return <div data-testid="temp-component">Test Component</div>;
    }

    const component = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
