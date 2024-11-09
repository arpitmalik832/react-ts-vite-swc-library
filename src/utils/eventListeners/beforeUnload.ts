import { BeforeUnloadEventListener } from '../../types/types.d';

const beforeUnload = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
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
