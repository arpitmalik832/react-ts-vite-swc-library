import type { AllParams, VoidFunctionWithParams } from '../types/types';
import { errorLog } from './logsUtils';

const isNonInteger = <T>(val: T) =>
  val === '.' || !/^[0-9,]*$/.test(val as string);

const triggerCallback = (
  callback?: VoidFunctionWithParams,
  ...args: AllParams[]
) => {
  if (callback && typeof callback === 'function') {
    callback(...args);
  }
};

const generateUniqSerial = (base: number) =>
  'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, () => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(base);
  });

const generateRandomString = (len: number) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const getMaskedValue = (str: string) => `${str}`.replace(/.(?=.{4})/g, '*');

const downloadFileFromData = (
  fileData: BlobPart,
  fileName = 'file.pdf',
  contentType = 'application/pdf',
) => {
  const file = new Blob([fileData], { type: contentType });
  const url = window.URL.createObjectURL(file);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const getEncodedURI = (url: string, pathname: string) =>
  `redirect=${encodeURIComponent(url)}&pathname=${pathname.slice(1)}`;

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const copyToClipboard = (text: string, callback: VoidFunctionWithParams) => {
  navigator?.clipboard
    ?.writeText(text)
    .then(() => {
      callback();
    })
    .catch((e: DOMException) => {
      errorLog('Failed to copy: ', e);
    });
};

const isLocalhost = () =>
  Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 are considered localhost for IPv4.
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(
        window.location.hostname,
      ),
  );

export {
  isNonInteger,
  triggerCallback,
  generateUniqSerial,
  generateRandomString,
  getMaskedValue,
  downloadFileFromData,
  getEncodedURI,
  scrollToTop,
  copyToClipboard,
  isLocalhost,
};
