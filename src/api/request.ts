import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { Toast } from 'antd-mobile';
import { AxiosResponse } from 'axios';

import {
  IRequestParams,
  IRequestResponse
} from '@/types/global/request';

interface MyAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<any>;
  (url: string, config?: AxiosRequestConfig): Promise<any>;
}

export class Request {
  public static axiosInstance: MyAxiosInstance;

  public static init() {
    // 创建axios实例
    this.axiosInstance = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        Accept: "application/json",
        "content-type": "application/json"
      }
    });
    // 初始化拦截器
    this.initInterceptors();
  }

  // 初始化拦截器
  public static initInterceptors() {
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    this.axiosInstance.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      (error: any) => {
        Toast.show({
          icon: 'fail',
          content: error
        });
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      // 请求成功
      (response: AxiosResponse): IRequestResponse => {
        const {
          data: { code, message, data }
        } = response;
        if (response.status !== 200 || code !== 0) {
          Request.errorHandle(response, message);
        }
        return data;
      },
      // 请求失败
      (error: AxiosError): Promise<any> => {
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          Request.errorHandle(response as any); 
        } else {
          Toast.show({
            icon: 'fail',
            content: '网络连接异常,请稍后再试!'
          });
        }
        return Promise.reject(response?.data);
      }
    );
  }

  /**
   * http握手错误
   * @param res 响应回调,根据不同响应进行不同操作
   * @param message
   */
  private static errorHandle(res: IRequestResponse, message?: string) {
    // 状态码判断
    switch (res.status) {
      case 401:
        break;
      case 403:
        break;
      case 404:
        Toast.show({
          icon: 'fail',
          content: '请求的资源不存在'
        });
        break;
      default:
        // 错误信息判断
        message &&
          Toast.show({
            icon: 'fail',
            content: message
          });
    }
  }
}
