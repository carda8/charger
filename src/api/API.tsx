import {TEST_NAME} from '@env';
import axios, {AxiosRequestConfig} from 'axios';

const baseURL =
  'https://q2mutgmq82.execute-api.ap-northeast-2.amazonaws.com/dev/';

const axiosConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  timeout: 5000,
  timeoutErrorMessage: '###### API REQ/REP TIMEOUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'test-token-123',
  },
  transformRequest: (data, headers) => {
    // data.encodeJson = true;
    if (data) console.log('API REQ data', data);
    const parsedData = JSON.stringify(data);
    return parsedData;
  },
  transformResponse: data => {
    if (data) {
      const parsedReq = JSON.parse(data);
      return parsedReq;
    }
  },
};

export const API = axios.create(axiosConfig);
