window.URL.createObjectURL = (img: Blob | MediaSource) =>
  img instanceof Blob || img instanceof MediaSource ? 'mocked-url' : '';
