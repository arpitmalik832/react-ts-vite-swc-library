import { cleanup, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  configureStore,
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Provider, useSelector } from 'react-redux';

import useApiRequest from '../useApiRequest';
import { ApisRedux, ReduxState } from '../../types/types.d';
import { errorLog, log } from '../../utils';

jest.mock('../../utils/commonUtils', () => ({
  logRequest: jest.fn(),
  logResponse: jest.fn(),
  errorLogRequest: jest.fn(),
  errorLogResponse: jest.fn(),
}));

jest.mock('../../utils/apiUtils', () => ({
  __esModule: true,
  handleRequest: jest.fn(
    (e: Promise<AxiosResponse<unknown>>): Promise<unknown> =>
      e.then(res => res.data).catch((err: Error) => err),
  ),
}));

describe('useApiRequest unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('snapshot test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      useApiRequest();

      return (
        <button data-testid="temp-component" type="button">
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it('get api call test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);
      const { makeGetCall } = useApiRequest();

      return (
        <button
          data-testid="temp-component"
          type="button"
          onClick={() => {
            makeGetCall<Record<string, string>>(
              'todos/1',
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
          }}
        >
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(component.getByTestId('temp-component'));
    fireEvent.click(component.getByTestId('temp-component'));
  });

  it('cancel get api call test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);
      const { makeGetCall, cancelRequest } = useApiRequest();

      return (
        <button
          data-testid="temp-component"
          type="button"
          onClick={() => {
            makeGetCall<Record<string, string>>(
              'todos/1',
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
            cancelRequest('todos/1');
            cancelRequest('xyz');
          }}
        >
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(component.getByTestId('temp-component'));
  });

  it('post api call test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);
      const { makePostCall } = useApiRequest();

      return (
        <button
          data-testid="temp-component"
          type="button"
          onClick={() => {
            makePostCall<object, Record<string, string>>(
              'todos/1',
              {},
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
          }}
        >
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(component.getByTestId('temp-component'));
  });

  it('put api call test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);
      const { makePutCall } = useApiRequest();

      return (
        <button
          data-testid="temp-component"
          type="button"
          onClick={() => {
            makePutCall<object, Record<string, string>>(
              'todos/1',
              {},
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
          }}
        >
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(component.getByTestId('temp-component'));
  });

  it('delete api call test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);
      const { makeDeleteCall } = useApiRequest();

      return (
        <button
          data-testid="temp-component"
          type="button"
          onClick={() => {
            makeDeleteCall<Record<string, string>>(
              'todos/1',
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
          }}
        >
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(component.getByTestId('temp-component'));
  });

  it('cancel all api calls test', () => {
    const apisSlice = createSlice<
      ApisRedux,
      SliceCaseReducers<ApisRedux>,
      string,
      SliceSelectors<ApisRedux>,
      string
    >({
      name: 'apis',
      initialState: {
        api1Host: 'https://jsonplaceholder.typicode.com/',
        api1Headers: {},
        api1AxiosInstance: axios.create(),
      },
      reducers: {},
    });

    const store = configureStore({
      reducer: {
        apis: apisSlice.reducer,
      },
    });

    const TempComponent = () => {
      const apis = useSelector<ReduxState, ApisRedux>(state => state.apis);
      const { makePostCall, makePutCall, makeDeleteCall, cancelAllRequests } =
        useApiRequest();

      return (
        <button
          data-testid="temp-component"
          type="button"
          onClick={() => {
            makePostCall<object, Record<string, string>>(
              'todos/1',
              {},
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
            makePutCall<object, Record<string, string>>(
              'todos/1',
              {},
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
            makeDeleteCall<Record<string, string>>(
              'todos/1',
              apis.api1AxiosInstance!,
            )
              .then(res => log('response', res))
              .catch((err: AxiosError) => errorLog('error', err));
            cancelAllRequests();
          }}
        >
          Mocked
        </button>
      );
    };

    const component = render(
      <Provider store={store}>
        <TempComponent />
      </Provider>,
    );

    fireEvent.click(component.getByTestId('temp-component'));
  });
});
