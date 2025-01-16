import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

import ComponentWithSuspense from '../ComponentWithSuspense';

jest.mock('../../organisms/Loader', () => () => (
  <div data-testid="mock-loader">Loading...</div>
));

describe('ComponentWithSuspense unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  const Component = () => <div data-testid="mock-component" />;

  const Fallback = () => <div data-testid="mock-fallback" />;

  test('ComponentWithSuspense snapshot test', () => {
    const component = render(
      <ComponentWithSuspense component={<Component />} />,
    );

    expect(component).toMatchSnapshot();
  });

  test('ComponentWithSuspense with fallback', () => {
    const { getByTestId } = render(
      <ComponentWithSuspense
        component={<Component />}
        fallback={<Fallback />}
      />,
    );

    expect(getByTestId('mock-component')).toBeInTheDocument();
  });
});
