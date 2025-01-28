import axios, { AxiosRequestConfig, Canceler } from 'axios';

export interface ServiceArg {
  url: AxiosRequestConfig['url'];
  method: AxiosRequestConfig['method'];
  headers?: AxiosRequestConfig['headers'];
  data?: any;
  onInit?: (canceler: Canceler) => void;
  cancelPrevReq?: boolean;
}

export class commonServiceAPI {
  static cancelMessage = 'Operation cancelled due to new request';
  static headers = {
    'Content-Type': 'application/json',
    accept: 'text/plain',
  };
  static commonServiceAPICanceler: any = {};
  static CRMAPICall = async (arg: ServiceArg) => {
    let { url, method, headers, data, onInit, cancelPrevReq = true } = arg;
    if (cancelPrevReq) {
      url &&
        commonServiceAPI.commonServiceAPICanceler[url] &&
        commonServiceAPI.commonServiceAPICanceler[url](
          commonServiceAPI.cancelMessage
        );
    }
    //API Request
    try {
      const CancelToken = axios.CancelToken;
      return axios({
        baseURL: url,
        method: method,
        headers: {
          ...commonServiceAPI.headers,
          ...headers,
        },
        cancelToken: new CancelToken((c) => {
          commonServiceAPI.commonServiceAPICanceler = c;
          onInit?.(c);
        }),
        data: data,
      });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn(error.message);
      } else {
        throw error;
      }
    }
  };
}
