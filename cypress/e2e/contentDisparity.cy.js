import { getTestId } from "cypress/support/utils";

const data = require("cypress/fixtures/inputData.json"),
  selectors = {
    fields: 'p[data-testid="article-summary"]',
    body: 'div[data-module="content"]',
  };

describe("content disparity tests", () => {
  data.forEach((csEntry, index) => {
    let testId = getTestId(index);

    it(`${testId} CS ${Object.keys(data)[0]} content matches FE, entry UID - ${
      csEntry.legacy_uid
    }`, () => {
      cy.matchFields(csEntry, selectors.summary, Object.keys(data)[0]);
    });

    it(`${testId} CS ${Object.keys(data)[1]} content matches FE, entry UID - ${
      csEntry.legacy_uid
    }`, () => {
      cy.matchFields(csEntry, selectors.body, Object.keys(data)[1]);
    });
  });
});
