import axios, { AxiosInstance } from 'axios';
import { JSDOM } from 'jsdom';
/**
 * Http клиент
 */
export class HttpClient {
  /**
   * Внутренний клиент Axios
   */
  private readonly client: AxiosInstance;
  private cookies: string[];
  /**
   * Создает http клиент
   * @param url Url сайта
   */
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
  /**
   * Делает post запрос
   * @param url страница
   * @param params post параметры
   * @returns Возвращает DOM html
   */
  async post(url: string, params: Record<string, string>) {
    const res = await this.client.post<string>(url, params);
    return new JSDOM(res.data);
  }
  /**
   * Делает post запрос формате формы
   * @param url страница
   * @param params форма
   * @returns Возвращает DOM html
   */
  async form(url: string, params: FormData) {
    const res = await this.client.post<string>(url, params);
    return new JSDOM(res.data);
  }
  /**
   * Делает post запрос с сохранение куков
   * @param url страница
   * @param params post параметры
   * @returns Возвращает DOM html
   */
  async postCookies(url: string, params: Record<string, string>) {
    const res = await this.client.post<string>(url, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    this.setCookies(res.headers['set-cookie']);
    return new JSDOM(res.data);
  }
  /**
   * Делает get запрос
   * @param url страница
   * @param params get параметры
   * @returns Возвращает DOM html
   */
  async get(url: string, params?: Record<string, string>) {
    const res = await this.client.get<string>(url, { params });
    return new JSDOM(res.data);
  }
  /**
   * Устанавливает куки
   * @param value куки
   */
  setCookies(value: string[]) {
    this.client.defaults.headers['Cookie'] = value;
    this.cookies = value;
  }
  /**
   * Экспорт куков
   */
  export_cookies() {
    return this.cookies;
  }
}
