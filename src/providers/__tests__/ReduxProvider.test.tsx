import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';

import Component from '../ReduxProvider';

jest.mock('react-redux', () => ({
  Provider: jest.fn(() => <div data-testid="mock-provider" />),
}));

describe('ReduxProvider unit tests', () => {
  afterEach(cleanup);

  it('ReduxProvider snapshot test', () => {
    const store = configureStore({
      reducer: {},
    });

    const component = render(<Component store={store} />);

    expect(component).toMatchSnapshot();
  });
});
