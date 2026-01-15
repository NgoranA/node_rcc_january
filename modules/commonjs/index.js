import * as format from './format.js';
import { realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const isMain = process.argv[1] && await realpath(fileURLToPath(import.meta.url)) === await realpath(process.argv[1]);

if (isMain) {
  const { default: pino } = await import('pino');
  const logger = pino();
  logger.info(format.upper('ES module executed directly'));
  process.stdin.resume();
}
export default (str) => {
  return format.upper(str.split('').reverse().join(''));
}

