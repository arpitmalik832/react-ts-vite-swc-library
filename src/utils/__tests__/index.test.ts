import '@testing-library/jest-dom';

import * as e from '../index';

describe('index.ts exports', () => {
  it('snapshot test', () => {
    expect(e).toMatchSnapshot();
  });

  it('should export classNames', () => {
    expect(e).toHaveProperty('classNames');
  });

  it('should export reportWebVitals', () => {
    expect(e).toHaveProperty('reportWebVitals');
  });

  it('should export handleRequest', () => {
    expect(e).toHaveProperty('handleRequest');
  });

  it('should export addRequestInterceptor', () => {
    expect(e).toHaveProperty('addRequestInterceptor');
  });

  it('should export addResponseInterceptor', () => {
    expect(e).toHaveProperty('addResponseInterceptor');
  });

  it('should export deduplicate', () => {
    expect(e).toHaveProperty('deduplicate');
  });

  it('should export isNonInteger', () => {
    expect(e).toHaveProperty('isNonInteger');
  });

  it('should export triggerCallback', () => {
    expect(e).toHaveProperty('triggerCallback');
  });

  it('should export generateUniqSerial', () => {
    expect(e).toHaveProperty('generateUniqSerial');
  });

  it('should export generateRandomString', () => {
    expect(e).toHaveProperty('generateRandomString');
  });

  it('should export getMaskedValue', () => {
    expect(e).toHaveProperty('getMaskedValue');
  });

  it('should export downloadFileFromData', () => {
    expect(e).toHaveProperty('downloadFileFromData');
  });

  it('should export getEncodedURI', () => {
    expect(e).toHaveProperty('getEncodedURI');
  });

  it('should export scrollToTop', () => {
    expect(e).toHaveProperty('scrollToTop');
  });

  it('should export copyToClipboard', () => {
    expect(e).toHaveProperty('copyToClipboard');
  });

  it('should export isLocalhost', () => {
    expect(e).toHaveProperty('isLocalhost');
  });

  it('should export rgbToHex', () => {
    expect(e).toHaveProperty('rgbToHex');
  });

  it('should export rgbaToHex', () => {
    expect(e).toHaveProperty('rgbaToHex');
  });

  it('should export formatSecToYodaTime', () => {
    expect(e).toHaveProperty('formatSecToYodaTime');
  });

  it('should export convertGainFormat', () => {
    expect(e).toHaveProperty('convertGainFormat');
  });

  it('should export gcd', () => {
    expect(e).toHaveProperty('gcd');
  });

  it('should export getAspectRatio', () => {
    expect(e).toHaveProperty('getAspectRatio');
  });

  it('should export deleteCookie', () => {
    expect(e).toHaveProperty('deleteCookie');
  });

  it('should export setCookie', () => {
    expect(e).toHaveProperty('setCookie');
  });

  it('should export getCookie', () => {
    expect(e).toHaveProperty('getCookie');
  });

  it('should export isBrowser', () => {
    expect(e).toHaveProperty('isBrowser');
  });

  it('should export isDesktop', () => {
    expect(e).toHaveProperty('isDesktop');
  });

  it('should export isMobile', () => {
    expect(e).toHaveProperty('isMobile');
  });

  it('should export isMobileBrowser', () => {
    expect(e).toHaveProperty('isMobileBrowser');
  });

  it('should export log', () => {
    expect(e).toHaveProperty('log');
  });

  it('should export errorLog', () => {
    expect(e).toHaveProperty('errorLog');
  });

  it('should export warnLog', () => {
    expect(e).toHaveProperty('warnLog');
  });

  it('should export infoLog', () => {
    expect(e).toHaveProperty('infoLog');
  });

  it('should export debugLog', () => {
    expect(e).toHaveProperty('debugLog');
  });

  it('should export traceLog', () => {
    expect(e).toHaveProperty('traceLog');
  });

  it('should export tableLog', () => {
    expect(e).toHaveProperty('tableLog');
  });

  it('should export convertToArrayOfPairs', () => {
    expect(e).toHaveProperty('convertToArrayOfPairs');
  });

  it('should export renameKeys', () => {
    expect(e).toHaveProperty('renameKeys');
  });

  it('should export getQueryParam', () => {
    expect(e).toHaveProperty('getQueryParam');
  });

  it('should export processQueryParams', () => {
    expect(e).toHaveProperty('processQueryParams');
  });

  it('should export useDebounce', () => {
    expect(e).toHaveProperty('useDebounce');
  });

  it('should export useThrottle', () => {
    expect(e).toHaveProperty('useThrottle');
  });

  it('should export capitalizeFirstChar', () => {
    expect(e).toHaveProperty('capitalizeFirstChar');
  });

  it('should export isEqualsIgnoringCase', () => {
    expect(e).toHaveProperty('isEqualsIgnoringCase');
  });

  it('should export maskCharsExceptLastN', () => {
    expect(e).toHaveProperty('maskCharsExceptLastN');
  });

  it('should export getInitials', () => {
    expect(e).toHaveProperty('getInitials');
  });
});
