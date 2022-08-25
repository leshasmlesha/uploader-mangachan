import axios, { AxiosInstance } from 'axios';
import { JSDOM } from 'jsdom';
export class HttpClient {
  private readonly client: AxiosInstance;
  private cookies: string[];
  constructor(url: string) {
    this.client = axios.create({
      withCredentials: true,
      baseURL: url,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.167 YaBrowser/22.7.3.822 Yowser/2.5 Safari/537.36',
      },
    });
  }
  async post(url: string, params: Record<string, string>) {
    const res = await this.client.post<string>(url, params);
    return new JSDOM(res.data);
  }
  async postCookies(url: string, params: Record<string, string>) {
    const res = await this.client.post<string>(url, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    this.setCookies(res.headers['set-cookie']);
    return new JSDOM(res.data);
  }
  async get(url: string, params?: Record<string, string>) {
    const res = await this.client.get<string>(url, { params });
    return new JSDOM(res.data);
  }
  setCookies(value: string[]) {
    this.client.defaults.headers['Cookie'] = value;
    this.cookies = value;
  }
  export_cookies() {
    return this.cookies;
  }
}
