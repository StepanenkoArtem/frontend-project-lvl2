### Hexlet tests and linter status:
[![Actions Status](https://github.com/StepanenkoArtem/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/StepanenkoArtem/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/3e6490a6bc269acffd55/maintainability)](https://codeclimate.com/github/StepanenkoArtem/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3e6490a6bc269acffd55/test_coverage)](https://codeclimate.com/github/StepanenkoArtem/frontend-project-lvl2/test_coverage)

# Difference Calculator

---
## The Command Line tool to find the difference between two files.

### Description:
This CLI tool allows you to compare two files and figure out what the difference.
JSON and YAML formats are supported.

### How to use:
Enter ```gendiff -h``` to view a small help for usage

```Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  Output format
  -h, --help           output usage information
```
[![asciicast](https://asciinema.org/a/5nzGp8B1TrYgfZGEerkft7Ze6.svg)](https://asciinema.org/a/5nzGp8B1TrYgfZGEerkft7Ze6)

You can use ```gendiff``` to find the difference both for flat and nested YAML/JSON files.

Usage with flat files:
[![asciicast](https://asciinema.org/a/yrGnLesyqo5Fj0leyUp2ba9XS.svg)](https://asciinema.org/a/yrGnLesyqo5Fj0leyUp2ba9XS)

Usage with 'nested' files
YAML:

[![asciicast](https://asciinema.org/a/Oth8TRHFITBjAdQf4quGBxSjY.svg)](https://asciinema.org/a/Oth8TRHFITBjAdQf4quGBxSjY)
and JSON:
[![asciicast](https://asciinema.org/a/0ctWO0brYkeaVA9dd5HVIxqgW.svg)](https://asciinema.org/a/0ctWO0brYkeaVA9dd5HVIxqgW)

By default the difference shows like GitHub diff as you can see on examples above.
There are two additional options you can apply to format the difference in another ways.

1) `--format plain` allows you to get difference like a plain descriptive 'human-readable' text.
   [![asciicast](https://asciinema.org/a/TsLiayP7gaKKSQw9HgaInETuz.svg)](https://asciinema.org/a/TsLiayP7gaKKSQw9HgaInETuz)

2) `--format json` allows to get the difference on JSON format and pass it to another apps/tools
   [![asciicast](https://asciinema.org/a/BT6RRITHuqh4n2hPJKEVcEPn2.svg)](https://asciinema.org/a/BT6RRITHuqh4n2hPJKEVcEPn2)
