const deduplicate = <T>(array: T[]): T[] => [...new Set<T>(array)];

export { deduplicate };
