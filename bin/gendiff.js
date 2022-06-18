#!/usr/bin/env node
import { Command } from 'commander';
import _ from 'lodash';
import genDiff from '../src/gendiff.js';

const VERSION = '0.0.1';
const DESCRIPTION = 'Compares two configuration files and shows a difference.';
const app = new Command();

app
  .description(DESCRIPTION)
  .version(VERSION)
  .option('-f, --format <type>', 'Output format')
  .option('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv);

const { help, version, format } = app.opts();
const [before, after] = app.args;
if (help) console.log(app.help());
if (version) console.log(app.version);
if (_.isEmpty(app.args) && _.isEmpty(app.opts())) console.log(app.description());

app.parse(process.argv).action(console.log(genDiff(before, after, format)));
