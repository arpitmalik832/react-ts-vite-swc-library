import { Provider } from 'react-redux';

import { ReduxProviderProps } from '../types/types.d';

function ReduxProvider(props: ReduxProviderProps) {
  const { children, store } = props;
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
