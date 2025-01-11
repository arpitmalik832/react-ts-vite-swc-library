// Polyfill TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

window.URL.createObjectURL = (img: Blob | MediaSource) =>
  img instanceof Blob || img instanceof MediaSource ? 'mocked-url' : '';
