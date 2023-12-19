import * as utils from "../support/utils"

const data = require("../fixtures/data.json");
const parser = new DOMParser();
const selectors = {
  summary: 'p[data-testid="article-summary"]',
  body: 'div[data-module="content"]',
};

describe("content disparity tests", () => {
  let diffToReport = [];

  data.forEach((csEntry, index) => {
    let testId = utils.getTestId(index);

    it(`${testId} CS content matches FE, entry UID - ${csEntry.legacy_uid}`, () => {
      cy.request(`${Cypress.env("host")}${csEntry.url}`)
        .its("body")
        .then((response) => {
          const document = parser.parseFromString(response, "text/html");

          const summary = document.querySelector(selectors.summary).innerHTML;
          const [pageSummary, csSummary] = utils.getSanitizedData(
            summary,
            csEntry.summary
          );

          const summaryDiff = pageSummary.length - csSummary.length;
          if (summaryDiff !== 0) {
            diffToReport.push(csEntry);
          }

          const body = document.querySelector(selectors.body).innerHTML;
          const [pageBody, csBody] = utils.getSanitizedData(body, csEntry.body);

          const bodyDiff = pageBody.length - csBody.length;
          if (bodyDiff !== 0) {
            diffToReport.push(csEntry);
          }

          expect(summaryDiff).to.be.equal(0);
          expect(bodyDiff).to.be.equal(0);
        });
    });
  });
});
