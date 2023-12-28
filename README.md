# Project Title

Content Disparity Check

## Description

Tool for comparing data between content from legacy platform and content served on new FE application.

Content from both sources (legacy input and FE) ) is being stripped of special characters (any non-alphanumeric character is considered "special" for this purpose, character decoding shold be a part of a different test suite) and whitespaces and compared by string length.

Entries which fail the test are being categorized by diff treshold into 4 buckets - low, medium, high and critical, and a report is produced. Current treshold values (found in `disparityReporter.js`) are placeholders and should be adjusted to the project requirements.

Entries which don't have provided value for field in test (*null*, empty string) are being skipped and included in report.

## Getting Started

### Prerequisites

* Local machine must be connected to VPN

### Installing

* Clone this repo
* Position via command line to the root of the project and run ``npm install``
* Place the legacy input into `cypress/fixtures/` folder and name it `inputData.json` (script accepts only *json* format, for the time being)
* Place the CS export into `cypress/fixtures/` folder and name it `exportData.json`
  Export is being used to extract new URL and attach it to corresponding entry in `inputData.json`

### Executing program

* Tests are executed via command:

```
npm run e2e:disparity
```

Host should be either added to `cypress.config.js` or passed via `--env` argument during command call:

```
npm run e2e:disparity -- --env host=https://staging.test.com
```

With current configuration tests are being run in headless mode and executed in Chrome browser.

**INITIAL RUN - When running tests for the first time with fresh set of data tests should be run via following command:**

```
npm run e2e:disparity:prep-data
```

Data preparation can be lengthy step, depending on the data volume (~1h45m for 20k JSON entries) and needs to be performed only once on same test data as it transforms `inputData.json` file. Running it again with same set of files will result in cleaning input data.
