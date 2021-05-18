import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_BASE_URL } from '@env';

const setHeaders = async headers => {
  headers['Content-Type'] || (headers['Content-Type'] = 'application/json');
  headers['XSRF-Token'] = await AsyncStorage.getItem('token');
};

const wrappedFetch = async (url, ...args) => {
  url = `${this.baseUrl}${url}?`;
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
  else if (args.length > 1);
  return await (await window.fetch(url, options)).json();
};

export default {
  baseUrl: REACT_NATIVE_BASE_URL,
  async get (url, queries = {}) {
    url = `${this.baseUrl}${url}?`;
    for (const query in queries) url += `&${query}=${queries[query]}`;
    return await (await window.fetch(url)).json();
  },
  async post (url, body, headers = {}) {
    url = `${this.baseUrl}${url}`;
    await setHeaders(headers);
    return await (await window.fetch(url, { method: 'POST', headers, body })).json();
  },
  async put (url, body, headers = {}) {
    url = `${this.baseUrl}${url}`;
    await setHeaders(headers);
    return await (await window.fetch(url, { method: 'PUT', headers, body })).json();
  },
  async patch (url, body, headers = {}) {
    url = `${this.baseUrl}${url}`;
    await setHeaders(headers);
    return await (await window.fetch(url, { method: 'PATCH', headers, body })).json();
  },
  async delete (url, body, headers = {}) {
    url = `${this.baseUrl}${url}`;
    await setHeaders(headers);
    return await (await window.fetch(url, { method: 'POST', headers, body })).json();
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
