#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';

const VERSION = '0.0.1';
const DESCRIPTION = 'Compares two configuration files and shows a difference.';

const format = {
  flags: '-f, --format <type>',
  description: 'Output format',
};

const help = {
  flags: '-h, --help',
  description: 'output usage information',
};

const version = {
  flags: '-V, --version',
  description: 'output the version number',
};

const getFileContent = (path) => {
  try {
    return JSON.parse(readFileSync(path));
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File not found!');
    } else {
      throw err;
    }
  }
};

const genDiff = (path1, path2) => {
  const firstFileContent = getFileContent(path1);
  const secondFileContent = getFileContent(path2);

  if (!firstFileContent || !secondFileContent) return;
  console.log(firstFileContent);
  console.log(secondFileContent);
};

const app = new Command();

app
  .option(help.flags, help.description)
  .option(version.flags, version.description)
  .option(format.flags, format.description)
  .description(DESCRIPTION)
  .arguments('<filepath1> <filepath2>')
  .action(genDiff);

app.parse(process.argv);

const options = app.opts();

if (options.version) console.log(VERSION);
if (options.format) console.log(format.description);
if (options.help) console.log(app.help());
