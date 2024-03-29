import inquirer, { QuestionCollection } from 'inquirer';
import { adapters, defaultAdapter } from './adapters';
import { Command, Option } from 'commander';
export interface Args {
  'search-id': boolean;
  adapter: string;
  work: string;
  interactive: boolean;
  verbose: boolean;
  timeout: number;
  'timeout-error': number;
  'not-exception': boolean;
}
export function parseArgumentsIntoOptions(rawArgs: string[]): Args {
  const program = new Command();
  program
    .name('Загрузчик на манга-тан')
    .description('Позваляет загружать мангу на Манга-тян');
  program.addOption(
    new Option('-a, --adapter <type>', 'Можете выбрать один из адаптеров')
      .choices(adapters.map((adapter) => adapter.adapter))
      .default(defaultAdapter),
  );
  program.addOption(
    new Option(
      '-s, --search-id',
      'Поиск манги по ID(вместо Названия манги)',
    ).default(false),
  );
  program.addOption(
    new Option('-w, --work <dir>', 'Рабочая директория').default('files'),
  );
  program.addOption(
    new Option('-i, --interactive', 'Интерактивный выбор опций').default(false),
  );
  program.addOption(
    new Option(
      '-v, --verbose',
      'Подробный вывод логов, отключает progressbar',
    ).default(false),
  );
  program.addOption(
    new Option(
      '-t, --timeout <number>',
      'Добавить время ожидания между загрузками главы, секунды',
    ).default(0),
  );
  program.addOption(
    new Option(
      '-e, --timeout-error <number>',
      'Добавить время ожидания после ошибок, секунды',
    ).default(0),
  );

  program.addOption(
    new Option(
      '-nex, --not-exception',
      'После первой ошибки остановить выполнение(выкл)',
    ).default(false),
  );
  program.parse(rawArgs);
  return program.opts<Args>();
}
export async function promptForMissingOptions(options: Args): Promise<Args> {
  const questions: QuestionCollection<Args>[] = [];
  questions.push({
    type: 'list',
    name: 'adapter',
    message: 'Выберите адаптер',
    choices: adapters.map((adapter) => adapter.adapter),
    default: defaultAdapter,
  });
  questions.push({
    type: 'input',
    name: 'work',
    message: 'Введите наименование рабочей папки',
    default: 'files',
  });
  questions.push({
    type: 'confirm',
    name: 'search-id',
    message: 'Хотите ли вести поиск по ID',
    default: false,
  });

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    adapter: answers.adapter,
    work: answers.work,
    'search-id': answers['search-id'],
  };
}
