import { EventListener } from '../../types/types.d';

const load = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  callBackFn(...args: Parameters<EventListener>) {},
  subscribe(callBackFn: EventListener) {
    this.callBackFn = callBackFn;

    window.addEventListener('load', callBackFn);
  },
  unSubscribe() {
    window.removeEventListener('load', this.callBackFn);
  },
};

export default load;
