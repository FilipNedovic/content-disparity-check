# Project Title

Content Disparity Check

## Description

Tool for comparing data between ContentStack export and content served on FE application.

Content from both sources (CS and FE) ) is being stripped of special characters (any non-alphanumeric character is considered "special" for this purpose, character decoding shold be a part of a different test suite) and whitespaces and compared by string length.

Entries which fail the test are being categorized by diff treshold into 4 buckets - low, medium, high and critical, and a report is produced. Current treshold values (found in `disparityReporter.js`) are placeholders and should be adjusted to the project requirements.

## Getting Started

### Dependencies

* Local machine must be connected to VPN.

### Installing

* Clone this repo
* Position via command line to the root of the project and run ``npm install``
* Place the CS export into `cypress/fixtures/` folder (script accepts only *json* format, for the time being).

### Executing program

* Tests are executed via command:

```
npm run e2e:disparity:check
```

Host should be either added to `cypress.config.js` or passed via `--env` argument during command call:

```
npm run e2e:disparity:check -- --env host=https://staging.test.com
```
