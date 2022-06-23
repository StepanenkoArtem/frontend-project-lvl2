import * as path from 'path';
import { readFileSync } from 'fs';

export default (filepath) => {
  const normalized = path.resolve(process.cwd(), filepath);
  return readFileSync(normalized);
};
