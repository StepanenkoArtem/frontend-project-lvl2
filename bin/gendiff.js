#!/usr/bin/env node
import { Command } from 'commander';
import view from '../src/view.js';

const VERSION = '0.0.1';
const DESCRIPTION = 'Compares two configuration files and shows a difference.';
const app = new Command();

app
  .description(DESCRIPTION)
  .version(VERSION)
  .option('-f, --format <type>', 'Output format', 'stylish')
  .option('-h, --help', 'output usage information')
  .arguments('[filepath1], [filepath2]')
  .action((filepath1, filepath2, options) => {
    if (filepath1 && filepath2) {
      console.log(view(filepath1, filepath2, options.format));
      return;
    }
    if (options.help) {
      console.log(app.help());
      return;
    }
    console.log(app.description());
  })
  .parse(process.argv);
