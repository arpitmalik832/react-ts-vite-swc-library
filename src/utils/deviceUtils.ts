function isBrowser() {
  return typeof window !== 'undefined';
}

const isMobile = {
  android() {
    return navigator.userAgent.match(/Android/i) ? 'android' : false;
  },
  iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? 'ios' : false;
  },
  any() {
    return this.android() || this.iOS();
  },
};

function isMobileBrowser() {
  return isBrowser() ? isMobile.any() : false;
}

function isDesktop() {
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export { isBrowser, isDesktop, isMobile, isMobileBrowser };
