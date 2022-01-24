#!/usr/bin/env node

import { Command } from 'commander';

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

const app = new Command();

app
  .option(help.flags, help.description)
  .option(version.flags, version.description)
  .option(format.flags, format.description)
  .description(DESCRIPTION);

app
  .argument('<firstFile>', 'First file for compare')
  .argument('<secondFile>', 'Second file for compare');

app.parse(process.argv);

const options = app.opts();

if (options.version) console.log(VERSION);
if (options.format) console.log(format.description);
if (options.help) console.log(app.help());
