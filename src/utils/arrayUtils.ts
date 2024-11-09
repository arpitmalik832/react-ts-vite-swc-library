function deduplicate<T>(array: Array<T>): Array<T> {
  return [...new Set<T>(array)];
}

export { deduplicate };
