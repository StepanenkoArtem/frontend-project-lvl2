import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from "../src/gendiff.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
console.log(__filename);

test('true is true', () => {
  expect(
    genDiff(
      '__fixtures__/first.json',
      '__fixtures__/second.json',
      )
  ).toBe(true);
});
