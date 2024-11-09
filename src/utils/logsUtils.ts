import { ENVS } from '../enums/app';

function log<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

function errorLog<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}

function warnLog<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.warn(...args);
  }
}

function debugLog<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.debug(...args);
  }
}

function traceLog<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.trace(...args);
  }
}

function tableLog<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.table(...args);
  }
}

function infoLog<T>(...args: T[]) {
  if (process.env.APP_ENV !== ENVS.PROD) {
    // eslint-disable-next-line no-console
    console.info(...args);
  }
}

export { log, errorLog, warnLog, debugLog, traceLog, tableLog, infoLog };
