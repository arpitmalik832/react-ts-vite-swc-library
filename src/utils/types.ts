export type MQEventListener = (
  this: MediaQueryList,
  ev: MediaQueryListEvent,
) => void;

export type EventListener = (this: Window, ev: Event) => void;

export type BeforeUnloadEventListener = (
  this: Window,
  ev: BeforeUnloadEvent,
) => void;

export interface EventListenerUtil<T> {
  callBackFn: T;
  subscribe(callBackFn: T): void;
  unSubscribe(): void;
}

export interface RequestMetadata {
  startTime: string;
  endTime: string;
  responseTime: number | bigint;
}
