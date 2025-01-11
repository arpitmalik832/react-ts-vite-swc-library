const fetchMock = <T>(data: T, isRejected?: boolean) =>
  jest.fn().mockImplementation(() => {
    if (isRejected) {
      return Promise.reject(new Error('xyz'));
    }
    return Promise.resolve(data);
  });

export default fetchMock;
