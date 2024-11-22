import { ENVS } from '../enums/app';
import { AllParams } from '../types/types.d';

const log = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
};

const errorLog = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};

const warnLog = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }
};

const debugLog = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }
};

const traceLog = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.trace(...args);
  }
};

const tableLog = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.table(...args);
  }
};

const infoLog = (...args: AllParams[]) => {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }
};

export { log, errorLog, warnLog, debugLog, traceLog, tableLog, infoLog };
