/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

import IConfig from '@config/mailwizz';
import IMailWizzEmptyResponse from '@modules/MailWizz/entities/IMailWizzEmptyResponse';
import IMailWizzResponse from '@modules/MailWizz/entities/IMailWizzResponse';
import encrypt from '@utils/encrypt';

import IRequest from './models/IRequest';

type MailWizzMethod = 'DELETE' | 'GET' | 'POST' | 'PUT';

interface IDictionary {
  [key: string]: string | number;
}

export default class Request implements IRequest {
  private client: AxiosInstance;

  private data: any;

  private defaultHeaders: IDictionary;

  private method: MailWizzMethod;

  private params: any;

  private url: string;

  constructor(private config: IConfig) {
    this.defaultHeaders = {
      'X-MW-PUBLIC-KEY': config.publicKey,
      'X-MW-TIMESTAMP': parseInt((new Date().valueOf() / 1000).toString(), 10),
      'X-MW-REMOTE-ADDR': ''
    };

    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: this.defaultHeaders
    });
  }

  public async get<T = any, R = IMailWizzResponse<T>>(
    url: string,
    params?: any
  ): Promise<R> {
    this.method = 'GET';
    this.data = {};
    this.params = params;
    this.url = url;

    const headers = { 'X-MW-SIGNATURE': this.signIn() };
    const response = await this.client.get<R>(url, {
      headers,
      params
    });

    return {
      ...response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  public async delete(url: string): Promise<IMailWizzEmptyResponse> {
    this.method = 'DELETE';
    this.data = {};
    this.params = {};
    this.url = url;

    const headers = {
      'X-MW-SIGNATURE': this.signIn(),
      'X-HTTP-Method-Override': this.method
    };

    const response = await this.client.delete(url, { headers });

    return {
      ...response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  public async post<T = any, R = IMailWizzResponse<T>>(
    url: string,
    data?: any
  ): Promise<R> {
    this.method = 'POST';
    this.data = data;
    this.params = {};
    this.url = url;

    const headers = {
      'X-MW-SIGNATURE': this.signIn(),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const encodedData = this.formUrlEncoded(data);
    const response = await this.client.post<R>(url, encodedData, { headers });

    return {
      ...response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  public async put<T = any, R = IMailWizzResponse<T>>(
    url: string,
    data?: any
  ): Promise<R> {
    this.method = 'PUT';
    this.data = data;
    this.params = {};
    this.url = url;

    const headers = {
      'X-MW-SIGNATURE': this.signIn(),
      'X-HTTP-Method-Override': this.method,
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const encodedData = this.formUrlEncoded(data);
    const response = await this.client.put<R>(url, encodedData, { headers });

    return {
      ...response.data,
      status: response.status,
      statusText: response.statusText
    };
  }

  private signIn(): string {
    const fullUrl = `${this.config.baseUrl}/${this.url}`;
    const separator = fullUrl.includes('?') ? '&' : '?';
    const params = encrypt.ksort({
      ...this.defaultHeaders,
      ...this.data
    });

    const serializedParams = encrypt.serialize({ ...this.params, ...params });
    const signature = `${this.method} ${fullUrl}${separator}${serializedParams}`;
    const hash = encrypt.hexEncode(this.config.secret, signature);

    // console.info('-> sign in signature:', signature);

    return hash;
  }

  private formUrlEncoded(data: any): string {
    const params = encrypt.ksort({ ...data });
    const serializedParams = encrypt.serialize(params);

    return serializedParams;
  }
}
