import isNil from 'lodash/isNil';
import { ContentType } from '../httpClient.types';

const defaultHeaders = (host: string = '') => ({
  'Accept': 'application/json,application/vnd.api+json',
  'Content-Type': ContentType.JSON,
});

const toUrlEncoded = (obj: object) => {
  const str = [];
  for (const p in obj) {
    if (obj.hasOwnProperty(p) && !isNil(obj[p])) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
  return str.join('&');
};

const sanitizeHeaders = (headers: Record<string, any>): Record<string, string> => {
  for (const key in headers) {
    if (!headers.hasOwnProperty(key)) {
      continue;
    }
    if (isNil(headers[key])) {
      delete headers[key];
    } else {
      headers[key] = headers[key].toString();
    }
  }
  return headers;
};

export const HttpClientHelper = {
  defaultHeaders,
  toUrlEncoded,
  sanitizeHeaders,
};
