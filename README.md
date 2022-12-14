# Загрузчик манги на Манга-тян

Загрузчик позволяет загружать мангу на манга-тян, имеет возможность расширения благадоря адаптерам.
Какие адаптеры в наличии:

- AdapterFile - обычный файловый адаптер.
- AdapterNigma - Адаптер для Nigma.
- AdapterJorogumo - Адаптер для Jorogumo.

Адаптеры в планах:

- [x] AdapterFile - обычный файловый адаптер.
- [x] AdapterNigma - Адаптер для Nigma.
- [x] AdapterJorogumo - Адаптер для Jorogumo(программа от создателя Anilabx(CrazyXacker))
- [ ] AdapterMWX - Адаптер для MangaWatcher

## Скачать

Можно скачать исполняемые файлы в [релизах](https://github.com/leshasmlesha/uploader-mangachan/releases/)

## Инструкция к сборке, запуске

Требуется NodeJS LTS

## Установка

Можно использовать Yarn или Npm:

Yarn:

```bash
# Включаем corepack - содержит в себе прочие менеджеры пакетов типа npm
$ corepack enable
# установка пакетов из package.json
$ yarn
```

Npm:

```bash
# установка пакетов из package.json
$ npm install
```

## Запуск DEV

Yarn:

```bash
# запуск
$ yarn start
```

Npm:

```bash
# запуск
$ npm run start
```

## Сборка prod

Yarn:

```bash
# сборка в dist
$ yarn build
# запуск prod
$ yarn start:prod
```

Npm:

```bash
# сборка в dist
$ npm run build
# запуск prod
$ npm run start:prod
```

## Сборка в exe

Yarn:

```bash
# Сборка в файлы лежащие в папке bundle
$ yarn pkg
```

Npm:

```bash
# Сборка в файлы лежащие в папке bundle
$ npm run pkg
```

## Разработка адаптеров

Адаптер должен реализовывать интерфейсы описанные в файлах [AdapterStatic.ts](./src/base/AdapterStatic.ts),[AdapterInstance.ts](./src/base/AdapterInstance.ts)
Пример можно посмотреть в папке [adapters](./src/adapters/)

## Планы

- [ ] watcher для программ
