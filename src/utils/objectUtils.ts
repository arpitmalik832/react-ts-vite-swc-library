const convertToArrayOfPairs = <T>(
  properties: Record<string, T> = {},
): [string, T][][] =>
  Object.entries(properties).reduce<[string, T][][]>((acc, curr, idx) => {
    if (idx % 2 === 0) {
      acc.push([curr]);
    } else {
      acc[Math.floor(idx / 2)].push(curr);
    }
    return acc;
  }, []);

const renameKeys = <T>(
  keysMap: Record<string, string>,
  obj: Record<string, T>,
) =>
  Object.keys(obj).reduce<Record<string, T>>(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {},
  );

export { convertToArrayOfPairs, renameKeys };
