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
<script id="asciicast-5nzGp8B1TrYgfZGEerkft7Ze6" src="https://asciinema.org/a/5nzGp8B1TrYgfZGEerkft7Ze6.js" async></script>

You can use ```gendiff``` to find the difference both for flat and nested YAML/JSON files.

Usage with flat files:
<script id="asciicast-yrGnLesyqo5Fj0leyUp2ba9XS" src="https://asciinema.org/a/yrGnLesyqo5Fj0leyUp2ba9XS.js" async></script>

Usage with 'nested' files
YAML:

<script id="asciicast-Oth8TRHFITBjAdQf4quGBxSjY" src="https://asciinema.org/a/Oth8TRHFITBjAdQf4quGBxSjY.js" async></script>

and JSON:
[![asciicast](https://asciinema.org/a/0ctWO0brYkeaVA9dd5HVIxqgW.svg)](https://asciinema.org/a/0ctWO0brYkeaVA9dd5HVIxqgW)

By default the difference shows like GitHub diff as you can see on examples above.
There are two additional options you can apply to format the difference in another ways.

1) `--format plain` allows you to get difference like a plain descriptive 'human-readable' text.
<script id="asciicast-TsLiayP7gaKKSQw9HgaInETuz" src="https://asciinema.org/a/TsLiayP7gaKKSQw9HgaInETuz.js" async></script>

2) `--format json` allows to get the difference on JSON format and pass it to another apps/tools
<script id="asciicast-BT6RRITHuqh4n2hPJKEVcEPn2" src="https://asciinema.org/a/BT6RRITHuqh4n2hPJKEVcEPn2.js" async></script>
