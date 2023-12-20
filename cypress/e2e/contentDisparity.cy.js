import * as utils from "../support/utils";

const data = require("../fixtures/data.json"),
  parser = new DOMParser(),
  selectors = {
    summary: 'p[data-testid="article-summary"]',
    body: 'div[data-module="content"]',
  };

describe("content disparity tests", () => {
  data.forEach((csEntry, index) => {
    let testId = utils.getTestId(index);

    it(`${testId} CS summary content matches FE, entry UID - ${csEntry.legacy_uid}`, () => {
      cy.request(`${Cypress.env("host")}${csEntry.url}`)
        .its("body")
        .then((response) => {
          const document = parser.parseFromString(response, "text/html"),
            summary = document.querySelector(selectors.summary),
            [pageSummary, csSummary] = utils.getSanitizedData(
              !summary ? null : summary.innerHTML,
              csEntry.summary
            );

          cy.skipWhen(!csSummary.length);

          const summaryDiff = pageSummary.length - csSummary.length;
          expect(summaryDiff).to.be.equal(0);
        });
    });

    it(`${testId} CS body content matches FE, entry UID - ${csEntry.legacy_uid}`, () => {
      cy.request(`${Cypress.env("host")}${csEntry.url}`)
        .its("body")
        .then((response) => {
          const document = parser.parseFromString(response, "text/html"),
            body = document.querySelector(selectors.body),
            [pageBody, csBody] = utils.getSanitizedData(
              !body ? null : body.innerHTML,
              csEntry.body
            );

          cy.skipWhen(!csBody.length);

          const bodyDiff = pageBody.length - csBody.length;
          expect(bodyDiff).to.be.equal(0);
        });
    });
  });
});
