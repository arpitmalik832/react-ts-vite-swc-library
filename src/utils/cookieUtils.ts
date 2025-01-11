const getCookie = (name: string) => {
  const b = document.cookie.match(`(^|[^;]+)\\s*${name}\\s*=\\s*([^;]+)`);
  return b ? decodeURIComponent(b.pop()!) : '';
};

const setCookie = (name: string, value: string, expTime?: Date | number) => {
  const expOn = expTime ? new Date(expTime) : new Date(2021, 11, 31);
  const expires = expOn.toUTCString();
  const path = '/';
  const cookie = `${name}=${value}; expires=${expires}; path=${path}; domain=.paytmmoney.com`;
  document.cookie = cookie;
};

const deleteCookie = (name: string) => {
  const expires = new Date().toUTCString();
  const path = '/';
  const cookie = `${name}=; expires=${expires}; path=${path}; domain=.paytmmoney.com`;
  const cookieOnCurrentDomain = `${name}=; expires=${expires}; path=${path};`;
  document.cookie = cookie;
  document.cookie = cookieOnCurrentDomain;
};

export { deleteCookie, getCookie, setCookie };
