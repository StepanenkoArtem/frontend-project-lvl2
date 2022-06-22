import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');

const yamlBefore = getFixturePath('before.yml');
const yamlAfter = getFixturePath('after.yml');

test('stylish formatter', () => {
  const expectedStylishDiff = readFileSync(getFixturePath('expected/stylish'), 'utf8');

  expect(genDiff(jsonBefore, jsonAfter)).toBe(expectedStylishDiff);
  expect(genDiff(yamlBefore, yamlAfter)).toBe(expectedStylishDiff);
});

test('plain formatter', () => {
  const expectedPlainDiff = readFileSync(getFixturePath('expected/plain'), 'utf8');

  expect(genDiff(jsonBefore, jsonAfter, 'plain')).toBe(expectedPlainDiff);
  expect(genDiff(yamlBefore, yamlAfter, 'plain')).toBe(expectedPlainDiff);
});

test('json formatter', () => {
  /* eslint-disable no-multi-str */
  const expectedJsonDiff = readFileSync(getFixturePath('expected/json'), 'utf8');

  expect(genDiff(jsonBefore, jsonAfter, 'json')).toBe(expectedJsonDiff);
  expect(genDiff(yamlBefore, yamlAfter, 'json')).toBe(expectedJsonDiff);
});
