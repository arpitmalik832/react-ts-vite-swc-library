import { MQEventListener } from '../../types/types.d';

const preferredColorScheme = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  callBackFn(...args: Parameters<MQEventListener>) {},
  subscribe(callBackFn: MQEventListener) {
    this.callBackFn = callBackFn;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    callBackFn.call(mq, { matches: mq.matches } as MediaQueryListEvent);

    mq.addEventListener('change', callBackFn);
  },
  unSubscribe() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.callBackFn);
  },
};

export default preferredColorScheme;
