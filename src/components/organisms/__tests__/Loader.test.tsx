import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Loader from '../Loader';

describe('Loader unit tests', () => {
  afterEach(() => {
    cleanup();
  });

  it('Loader snapshot test', () => {
    const component = render(<Loader />);

    expect(component).toMatchSnapshot();
  });
});
