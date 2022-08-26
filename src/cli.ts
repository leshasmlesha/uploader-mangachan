import inquirer, { QuestionCollection } from 'inquirer';
import { adapters, defaultAdapter } from './adapters';
import { Command, Option } from 'commander';
export interface Args {
  'search-id': boolean;
  adapter: string;
  work: string;
  interactive: boolean;
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
    default: 'files',
  });

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    adapter: options.adapter || answers.adapter,
    work: options.work || answers.work,
    'search-id': options['search-id'] || answers['search-id'],
  };
}
