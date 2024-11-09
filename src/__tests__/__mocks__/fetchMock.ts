function fetchMock<T>(data: T, isRejected?: boolean) {
  return jest.fn().mockImplementation(() => {
    if (isRejected) {
      return Promise.reject(new Error('xyz'));
    }
    return Promise.resolve(data);
  });
}

export default fetchMock;
