import { plainToInstance } from 'class-transformer';
import fs from 'fs';
export class Credentials {
  /**
   * Требуется изменить на true
   */
  auth: boolean = false;
  /**
   * Логин
   */
  login: string = 'login';
  /**
   * Пароль
   */
  password: string = 'password';
}
export default function getConfig() {
  if (fs.existsSync('config.json')) {
    const data = plainToInstance(
      Credentials,
      JSON.parse(fs.readFileSync('config.json', { encoding: 'utf-8' })),
    );
    if (data.auth) {
      return data;
    } else {
      throw new Error(
        'Измените файл config.json, так же требуется изменить auth на true',
      );
    }
  } else {
    const data = new Credentials();
    fs.writeFileSync('config.json', JSON.stringify(data));
    throw new Error(
      'Измените файл config.json, так же требуется изменить auth на true',
    );
  }
}
