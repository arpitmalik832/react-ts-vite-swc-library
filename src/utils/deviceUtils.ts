const isBrowser = () => typeof window !== 'undefined';

const isMobile = {
  android() {
    return /Android/i.test(navigator.userAgent) ? 'android' : false;
  },
  iOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'ios' : false;
  },
  any() {
    return this.android() || this.iOS();
  },
};

const isMobileBrowser = () => (isBrowser() ? isMobile.any() : false);

const isDesktop = () =>
  !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

export { isBrowser, isDesktop, isMobile, isMobileBrowser };
