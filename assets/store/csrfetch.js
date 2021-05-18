import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_BASE_URL } from '@env';

const setHeaders = async headers => {
  headers['Content-Type'] || (headers['Content-Type'] = 'application/json');
  headers['XSRF-Token'] = await AsyncStorage.getItem('token');
};

const validateContext = context => {
  if (!context || context === globalThis) {
    throw new TypeError('Invalid context for invocation. Do not destructure csrfetch methods');
  } else return true;
};

const wrappedFetch = async (url, ...args) => {
  url = `${REACT_NATIVE_BASE_URL}${url}?`;
  const options = {};
  if (
    typeof args[0] === 'object' &&
    !Array.isArray(args[0]) &&
    args.length === 1
  ) {
    const queries = args[0];
    for (const query in queries) url += `&${query}=${queries[query]}`;
  } else if (
    typeof args[0] === 'object' &&
    Array.isArray(args[0]) &&
    args.length === 1
  ) throw new TypeError('GET request queries must be an object of the form { query: value }');
  else if (args.length > 1) {
    const method = args[0];
    const body = JSON.stringify(args[1]);
    const headers = args[2];
    setHeaders(headers);
    options.method = method;
    options.body = body;
    options.headers = headers;
  }
  return await (await window.fetch(url, options)).json();
};

export default {
  async get (url, queries = {}) {
    return await (async () => validateContext(this) &&
      await wrappedFetch(url, queries))();
  },
  async post (url, body, headers = {}) {
    return await (async () => validateContext(this) &&
      await wrappedFetch(url, 'POST', body, headers))();
  },
  async put (url, body, headers = {}) {
    return await (async () => validateContext(this) &&
      await wrappedFetch(url, 'PUT', body, headers))();
  },
  async patch (url, body, headers = {}) {
    return await (async () => validateContext(this) &&
      await wrappedFetch(url, 'PATCH', body, headers))();
  },
  async delete (url, body, headers = {}) {
    return await (async () => validateContext(this) &&
      await wrappedFetch(url, 'DELETE', body, headers))();
  }
};

export const restoreCSRF = async () => {
  try {
    const res = await window.fetch(`${REACT_NATIVE_BASE_URL}/api/csrf/restore`);
    const { token } = await res.json();
    await AsyncStorage.setItem('token', token);
  } catch (err) {
    await AsyncStorage.setItem('token', '');
  }
};
