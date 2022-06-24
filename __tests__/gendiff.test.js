import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import view from '../src/view.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');

const yamlBefore = getFixturePath('before.yml');
const yamlAfter = getFixturePath('after.yml');

test('stylish formatter', () => {
  const expectedStylishDiff = readFileSync(getFixturePath('expected/stylish.txt'), 'utf8');

  expect(view(jsonBefore, jsonAfter)).toBe(expectedStylishDiff);
  expect(view(yamlBefore, yamlAfter)).toBe(expectedStylishDiff);
});

test('plain formatter', () => {
  const expectedPlainDiff = readFileSync(getFixturePath('expected/plain.txt'), 'utf8');

  expect(view(jsonBefore, jsonAfter, 'plain')).toBe(expectedPlainDiff);
  expect(view(yamlBefore, yamlAfter, 'plain')).toBe(expectedPlainDiff);
});

test('json.txt formatter', () => {
  /* eslint-disable no-multi-str */
  const expectedJsonDiff = readFileSync(getFixturePath('expected/json.txt'), 'utf8');

  expect(view(jsonBefore, jsonAfter, 'json')).toBe(expectedJsonDiff);
  expect(view(yamlBefore, yamlAfter, 'json')).toBe(expectedJsonDiff);
});
