import { useEffect } from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import useBackPress from '../useBackPress';
import type { BeforeUnloadEventListener } from '../../utils/types';
import { navigationSlice } from '../../redux/slices';

jest.mock('react-router', () => ({
  __esModule: true,
  useNavigate: jest.fn(() => {
    if (Math.random() > 0.5) {
      return jest.fn(() => Promise.resolve());
    }
    return jest.fn(() => Promise.reject(new Error('an error')));
  }),
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
    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    const TempComponent = () => {
      useBackPress();

      return <div data-testid="temp-component" />;
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('testing functions', () => {
    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    const TempComponent = () => {
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
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });

  it('testing functions', () => {
    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    const TempComponent = () => {
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
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });

  it('testing functions', () => {
    const store = configureStore({
      reducer: {
        navigation: navigationSlice.reducer,
      },
    });

    const TempComponent = () => {
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
    };

    const { getByTestId } = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(getByTestId('temp-btn'));
    fireEvent.click(getByTestId('temp-btn'));
  });
});
