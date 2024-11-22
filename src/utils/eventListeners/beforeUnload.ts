import {
  BeforeUnloadEventListener,
  EventListenerUtil,
} from '../../types/types.d';

const beforeUnload: EventListenerUtil<BeforeUnloadEventListener> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  callBackFn(...args: Parameters<BeforeUnloadEventListener>): void {},
  subscribe(callBackFn: BeforeUnloadEventListener) {
    this.callBackFn = callBackFn;

    window.addEventListener('beforeunload', callBackFn);
  },
  unSubscribe() {
    window.removeEventListener('beforeunload', this.callBackFn);
  },
};

export default beforeUnload;
