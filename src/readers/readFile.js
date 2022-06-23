import * as path from 'path';
import { readFileSync } from 'fs';

export default (filepath) => {
  const normalized = path.resolve(process.cwd(), filepath);
  try {
    return readFileSync(normalized);
  } catch (e) {
    console.log(`Cannot read file "${filepath}"`);
    throw e;
  }
};
