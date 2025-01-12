export type AllParams =
  | string
  | string[]
  | object
  | object[]
  | number
  | number[]
  | bigint
  | bigint[]
  | boolean
  | boolean[];

export interface VoidFunctionWithParams extends VoidFunction {
  (...args: AllParams[]): void;
}

export interface KeyValuePair {
  key: string;
  value: string;
}
