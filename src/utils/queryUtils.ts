const getQueryParam = (query: string, param?: string) => {
  const urlSearchParams = new URLSearchParams(query);
  return param ? urlSearchParams.get(param) : urlSearchParams;
};

const processQueryParams = (searchString: string) => {
  const data = searchString.substring(1);
  const array = data.split('&');
  return array.reduce<Record<string, string>>((oldData, currentData) => {
    const split = currentData.split('=');
    const [key, value] = split;
    // eslint-disable-next-line no-param-reassign
    oldData[key] = value;
    return oldData;
  }, {});
};

export { getQueryParam, processQueryParams };
