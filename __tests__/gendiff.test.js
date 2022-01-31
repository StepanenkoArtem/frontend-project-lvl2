import { test, expect } from '@jest/globals';
import genDiff from "../src/gendiff.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('true is true', () => {
  const expected = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`
  expect(
    genDiff(
      getFixturePath('first.json'),
      getFixturePath('second.json'),
      )
  ).toBe(expected);
});
