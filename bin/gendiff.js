#!/usr/bin/env node

import { Command } from 'commander';

const DESCRIPTION = 'Compares two configuration files and shows a difference.';
const VERSION = '0.0.1';

const app = new Command();

app.option('-V, --version', VERSION).option('-h, --help', DESCRIPTION);

app.parse(process.argv);

const options = app.opts();

if (options.version) {
  console.log(version);
}
if (options.help) {
  console.log(app.help());
}
