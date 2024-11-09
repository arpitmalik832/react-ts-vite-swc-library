function getQueryParam(query: string, param?: string) {
  const urlSearchParams = new URLSearchParams(query);
  return param ? urlSearchParams.get(param) : urlSearchParams;
}

function processQueryParams(searchString: string) {
  const data = searchString.substring(1);
  const array = data.split('&');
  return array.reduce<{ [key: string]: string }>((oldData, currentData) => {
    const split = currentData.split('=');
    const [key, value] = split;
    // eslint-disable-next-line no-param-reassign
    oldData[key] = value;
    return oldData;
  }, {});
}

export { getQueryParam, processQueryParams };
