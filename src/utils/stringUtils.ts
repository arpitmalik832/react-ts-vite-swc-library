function isEqualsIgnoringCase(text1: string, text2: string) {
  return text1.localeCompare(text2, undefined, { sensitivity: 'base' }) === 0;
}

function capitalizeFirstChar(string: string) {
  const trimmedString = string && string.trim();
  return trimmedString
    ? trimmedString[0].toUpperCase() + trimmedString.slice(1).toLowerCase()
    : '';
}

function maskCharsExceptLastN(val: number | string, n = 4) {
  let new_string = '';
  const str = val.toString();
  for (let i = 0; i < str.length - n; i += 1) {
    new_string += '*';
  }
  new_string += str.substring(str.length - n);
  return new_string;
}

function getInitials(displayName: string) {
  const [firstName, lastName = ''] = displayName.split(' ');

  return displayName
    ? `${firstName.slice(0, 1).toUpperCase()}${lastName
        .slice(0, 1)
        .toUpperCase()}`
    : 'JD';
}

export {
  capitalizeFirstChar,
  isEqualsIgnoringCase,
  maskCharsExceptLastN,
  getInitials,
};
