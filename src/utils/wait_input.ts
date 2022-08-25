import readline from 'readline';
export default function wait_input(question: string) {
  return new Promise<string>((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}
