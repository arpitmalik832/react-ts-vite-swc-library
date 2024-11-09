import { useEffect } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  configureStore,
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import useBackPress from '../useBackPress';
import {
  BeforeUnloadEventListener,
  NavigationRedux,
} from '../../types/types.d';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  useNavigate: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('../../utils/eventListeners/beforeUnload', () => ({
  __esModule: true,
  default: {
    subscribe: (e: BeforeUnloadEventListener) => {
      e.call(window, {} as BeforeUnloadEvent);
    },
    unSubscribe: jest.fn(),
  },
}));

jest.mock('../../utils/commonUtils', () => ({
  __esModule: true,
  log: jest.fn(),
}));

describe('useBackPress unit tests', () => {
  it('snapshot test', () => {
    const navigationSlice = createSlice<
      NavigationRedux,
      SliceCaseReducers<NavigationRedux>,
      string,
      SliceSelectors<NavigationRedux>,
      string
    >({
      name: 'navigation',
      initialState: { stack: [] },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    function TempComponent() {
      useBackPress();

      return <div data-testid="temp-component" />;
    }

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('testing functions', () => {
    const navigationSlice = createSlice<
      NavigationRedux,
      SliceCaseReducers<NavigationRedux>,
      string,
      SliceSelectors<NavigationRedux>,
      string
    >({
      name: 'navigation',
      initialState: {
        stack: [],
      },
      reducers: {
        pushStack: (state, action) => {
          state.stack.push(action.payload);
          return state;
        },
        popStack: state => {
          const top = state.stack.pop();
          if (top) {
            top();
          }
          return state;
        },
        clearStack: state => ({
          ...state,
          stack: [],
        }),
      },
    });

    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    function TempComponent() {
      const { push, pop } = useBackPress();

      useEffect(() => {
        push(jest.fn());
      }, []);

      return (
        <div data-testid="temp-component">
          <button type="button" data-testid="temp-btn" onClick={pop}>
            temp btn
          </button>
        </div>
      );
    }

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });

  it('testing functions', () => {
    const navigationSlice = createSlice<
      NavigationRedux,
      SliceCaseReducers<NavigationRedux>,
      string,
      SliceSelectors<NavigationRedux>,
      string
    >({
      name: 'navigation',
      initialState: {
        stack: [],
      },
      reducers: {
        pushStack: (state, action) => {
          state.stack.push(action.payload);
          return state;
        },
        popStack: state => {
          const top = state.stack.pop();
          if (top) {
            top();
          }
          return state;
        },
        clearStack: state => ({
          ...state,
          stack: [],
        }),
      },
    });

    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    function TempComponent() {
      const { push, clear } = useBackPress();

      useEffect(() => {
        push(jest.fn());
      }, []);

      return (
        <div data-testid="temp-component">
          <button type="button" data-testid="temp-btn" onClick={clear}>
            temp btn
          </button>
        </div>
      );
    }

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });
});
