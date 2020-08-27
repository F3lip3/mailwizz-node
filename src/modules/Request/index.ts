/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

import IConfig from '@config/mailwizz';
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

  public async get<T>(url: string): Promise<T> {
    this.method = 'GET';
    this.url = url;

    const response = await this.client.get<T>(url, {
      headers: {
        'X-MW-SIGNATURE': this.signIn(),
        'X-HTTP-Method-Override': this.method
      }
    });

    return response.data;
  }

  public async delete<T>(url: string): Promise<T> {
    this.method = 'DELETE';
    this.url = url;
    throw new Error('Method not implemented.');
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    this.method = 'POST';
    this.data = data;
    this.url = url;

    const encodedData = this.formUrlEncoded(data);
    const response = await this.client.post<T>(url, encodedData, {
      headers: {
        'X-MW-SIGNATURE': this.signIn(),
        'X-HTTP-Method-Override': this.method,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data;
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    this.method = 'PUT';
    this.data = data;
    this.url = url;

    const encodedData = this.formUrlEncoded(data);
    const response = await this.client.put<T>(url, encodedData, {
      headers: {
        'X-MW-SIGNATURE': this.signIn(),
        'X-HTTP-Method-Override': this.method,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.info('RESPONSE:', response);
    console.info('RESPONSE DATA:', response.data);

    return response.data;
  }

  private signIn(): string {
    const fullUrl = `${this.config.baseUrl}/${this.url}`;
    const separator = fullUrl.includes('?') ? '&' : '?';
    const params = encrypt.ksort({ ...this.defaultHeaders, ...this.data });

    const serializedParams = encrypt.serialize(params);
    const signature = `${this.method} ${fullUrl}${separator}${serializedParams}`;
    const hash = encrypt.hexEncode(this.config.secret, signature);

    return hash;
  }

  private formUrlEncoded(data: any): string {
    const params = encrypt.ksort({ ...data });
    const serializedParams = encrypt.serialize(params);

    return serializedParams;
  }
}
