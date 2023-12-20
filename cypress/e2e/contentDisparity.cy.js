import { getTestId } from "../support/utils";

const data = require("../fixtures/data.json"),
  selectors = {
    summary: 'p[data-testid="article-summary"]',
    body: 'div[data-module="content"]',
  };

describe("content disparity tests", () => {
  data.forEach((csEntry, index) => {
    let testId = getTestId(index);

    it(`${testId} CS summary content matches FE, entry UID - ${csEntry.legacy_uid}`, () => {
      cy.matchFields(csEntry, selectors.summary, "summary");
    });

    it(`${testId} CS body content matches FE, entry UID - ${csEntry.legacy_uid}`, () => {
      cy.matchFields(csEntry, selectors.body, "body");
    });
  });
});
