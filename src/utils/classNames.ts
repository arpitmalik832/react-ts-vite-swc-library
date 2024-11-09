function classnames(...args: (string | Array<string> | object)[]) {
  const classes = args.reduce<string[]>((acc, val) => {
    if (typeof val === 'string') {
      acc.push(val);
    } else if (Array.isArray(val)) {
      acc.push(...val);
    } else if (typeof val === 'object' && Object.keys(val as object).length) {
      Object.entries(val as object).forEach(([key, value]) => {
        if (typeof key === 'string' && value) {
          acc.push(key);
        }
      });
    }
    return acc;
  }, []);
  return classes.join(' ');
}

export default classnames;
