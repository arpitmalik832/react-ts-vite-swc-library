import '@testing-library/jest-dom';

import {
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
} from '../commonUtils';
import { log } from '../logsUtils';

describe('commonUtils unit tests', () => {
  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  it('testing isNotInteger', () => {
    isNonInteger(0);
  });

  it('testing triggerCallback', () => {
    triggerCallback(x => {
      log(x);
    }, 'a');

    triggerCallback();
  });

  it('testing generateUniqSerial', () => {
    generateUniqSerial(10);
  });

  it('testing generateRandomString', () => {
    generateRandomString(10);
  });

  it('testing getMaskedValue', () => {
    getMaskedValue('test');
  });

  it('testing getEncodeURI', () => {
    getEncodedURI('https://xyz.com', '/abc');
  });

  it('testing scrollToTop', () => {
    scrollToTop();
  });

  it('testing copyToClipboard', () => {
    copyToClipboard('test');
  });

  it('testing copyToClipboard when it fails', () => {
    Object.defineProperty(window, 'navigator', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    copyToClipboard('test');
  });

  it('testing copyToClipboard when it fails', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: undefined,
      },
      writable: true,
      configurable: true,
    });

    copyToClipboard('test');
  });

  it('testing copyToClipboard when it fails', () => {
    Object.defineProperty(window, 'navigator', {
      value: {
        clipboard: {
          writeText: undefined,
        },
      },
      writable: true,
      configurable: true,
    });

    copyToClipboard('test');
  });

  it('testing downloadFileFromData', () => {
    // For text files
    downloadFileFromData('Hello, World!', 'hello.txt', 'text/plain');

    // For JSON files
    const jsonData = JSON.stringify({ key: 'value' });
    downloadFileFromData(jsonData, 'data.json', 'application/json');

    // For binary files (like images or PDFs)
    // Assuming you have the file data as an ArrayBuffer or Uint8Array
    const binaryData = new Uint8Array([
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xe2, 0xe3,
      0xcf, 0xd3, 0x0a, 0x31, 0x20, 0x30, 0x20, 0x6f, 0x62, 0x6a, 0x0a, 0x3c,
      0x3c, 0x2f, 0x54, 0x79, 0x70, 0x65, 0x2f, 0x43, 0x61, 0x74, 0x61, 0x6c,
      0x6f, 0x67, 0x2f, 0x50, 0x61, 0x67, 0x65, 0x73, 0x20, 0x32, 0x20, 0x30,
      0x20, 0x52, 0x3e, 0x3e, 0x0a, 0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a, 0x0a,
      // ... more bytes would follow in a real PDF
    ]);
    downloadFileFromData(binaryData);
  });

  it('isLocalhost unit test', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'localhost',
      },
    });
    isLocalhost();
  });

  it('isLocalhost unit test', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname: 'www.google.com',
      },
    });
    isLocalhost();
  });

  it('isLocalhost unit test', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname: '127.0.0.1',
      },
    });
    isLocalhost();
  });

  it('isLocalhost unit test', () => {
    Object.defineProperty(window, 'location', {
      value: {
        hostname: '[::1]',
      },
    });
    isLocalhost();
  });
});
