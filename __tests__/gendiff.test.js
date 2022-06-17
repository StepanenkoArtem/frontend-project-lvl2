import { test, expect } from '@jest/globals';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonBefore = getFixturePath('before.json');
const jsonAfter = getFixturePath('after.json');

test('stylish formatter', () => {
  const expectedStylishDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(genDiff(jsonBefore, jsonAfter)).toBe(expectedStylishDiff);
});

test('plain formatter', () => {
  const expectedPlainDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(genDiff(jsonBefore, jsonAfter, 'plain')).toBe(expectedPlainDiff);
});

test('json formatter', () => {
  /* eslint-disable no-multi-str */
  const expectedJsonDiff = '{\
"common":{"follow":{"status":"ADDED","after":false},"setting1":{"status":"UNCHANGED","before":"Value 1"},\
"setting2":{"status":"DELETED","before":200},"setting3":{"status":"MODIFIED","before":true,"after":null},\
"setting4":{"status":"ADDED","after":"blah blah"},"setting5":{"status":"ADDED","after":{"key5":"value5"}},\
"setting6":{"doge":{"wow":{"status":"MODIFIED","before":"","after":"so much"}},"key":{"status":"UNCHANGED",\
"before":"value"},"ops":{"status":"ADDED","after":"vops"}}},"group1":{"baz":{"status":"MODIFIED","before":\
"bas","after":"bars"},"foo":{"status":"UNCHANGED","before":"bar"},"nest":{"status":"MODIFIED","before":\
{"key":"value"},"after":"str"}},"group2":{"status":"DELETED","before":{"abc":12345,"deep":{"id":45}}},\
"group3":{"status":"ADDED","after":{"deep":{"id":{"number":45}},"fee":100500}}}';

  expect(genDiff(jsonBefore, jsonAfter, 'json')).toBe(expectedJsonDiff);
});
