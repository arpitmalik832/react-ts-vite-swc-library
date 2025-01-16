export type AllParams = unknown;

export interface VoidFunctionWithParams extends VoidFunction {
  (...args: AllParams[]): void;
}

export interface KeyValuePair<T> {
  key: string;
  value: T | Record<string, T>;
}
