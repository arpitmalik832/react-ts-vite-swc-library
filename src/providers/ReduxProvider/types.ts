import type { configureStore } from '@reduxjs/toolkit';

export interface ReduxProviderProps {
  children?: React.ReactNode;
  store: ReturnType<typeof configureStore>;
}
