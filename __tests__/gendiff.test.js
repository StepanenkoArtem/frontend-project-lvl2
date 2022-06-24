import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['before.json', 'after.json', 'stylish', 'expected/stylish.txt'],
  ['before.json', 'after.json', 'plain', 'expected/plain.txt'],
  ['before.json', 'after.json', 'json', 'expected/json.txt'],
  ['before.yml', 'after.yml', 'stylish', 'expected/stylish.txt'],
  ['before.yml', 'after.yml', 'plain', 'expected/plain.txt'],
  ['before.yml', 'after.yml', 'json', 'expected/json.txt'],
])('gendiff (%s, %s) with output format %s', (firstFilepath, secondFilepath, outputFormat, expectedFixtureFilepath) => {
  const first = getFixturePath(firstFilepath);
  const second = getFixturePath(secondFilepath);
  const expected = readFileSync(getFixturePath(expectedFixtureFilepath), 'utf-8');
  expect(gendiff(first, second, outputFormat)).toBe(expected);
});
