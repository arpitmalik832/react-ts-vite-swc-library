import { Provider } from 'react-redux';

import type { ReduxProviderProps } from './types';

const ReduxProvider = (props: ReduxProviderProps) => {
  const { children, store } = props;
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
