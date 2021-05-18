import AsyncStorage from '@react-native-async-storage/async-storage';
import { REACT_NATIVE_BASE_URL } from '@env';

export default {
  baseUrl: REACT_NATIVE_BASE_URL,
  async get (url, queries = {}) {
    if (this === undefined || this === globalThis) {
      throw new TypeError('Invalid context for invocation. Do not destructure csrfetch methods.');
    }
    url = `${this.baseUrl}${url}?`;
    for (const query in queries) {
      url += `&${query}=${queries[query]}`;
    }
    return await (await window.fetch(url)).json();
  },
  async post (url, body, headers = {}) {
    if (this === undefined || this === globalThis) {
      throw new TypeError('Invalid context for invocation. Do not destructure csrfetch methods.');
    }
    url = `${this.baseUrl}${url}`;
    headers['Content-Type'] || (headers['Content-Type'] = 'application/json');
    headers['XSRF-Token'] = await AsyncStorage.getItem('token');
    return await (await window.fetch(url, { method: 'POST', headers, body })).json();
  },
  async put (url, body, headers = {}) {
    if (this === undefined || this === globalThis) {
      throw new TypeError('Invalid context for invocation. Do not destructure csrfetch methods.');
    }
    url = `${this.baseUrl}${url}`;
    headers['Content-Type'] || (headers['Content-Type'] = 'application/json');
    headers['XSRF-Token'] = await AsyncStorage.getItem('token');
    return await (await window.fetch(url, { method: 'PUT', headers, body })).json();
  },
  async patch (url, body, headers = {}) {
    if (this === undefined || this === globalThis) {
      throw new TypeError('Invalid context for invocation. Do not destructure csrfetch methods.');
    }
    url = `${this.baseUrl}${url}`;
    headers['Content-Type'] || (headers['Content-Type'] = 'application/json');
    headers['XSRF-Token'] = await AsyncStorage.getItem('token');
    return await (await window.fetch(url, { method: 'PATCH', headers, body })).json();
  },
  async delete (url, body, headers = {}) {
    if (this === undefined || this === globalThis) {
      throw new TypeError('Invalid context for invocation. Do not destructure csrfetch methods.');
    }
    url = `${this.baseUrl}${url}`;
    headers['Content-Type'] || (headers['Content-Type'] = 'application/json');
    headers['XSRF-Token'] = await AsyncStorage.getItem('token');
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
