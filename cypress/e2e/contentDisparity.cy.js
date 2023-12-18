import * as utils from "../support/utils";

const data = require("../fixtures/data.json");
const parser = new DOMParser();

describe("content disparity tests", () => {
  data.forEach((csEntry, index) => {
    let testId = utils.getTestId(index);

    it(`${testId} CS export matches displayed content for entry UID - ${csEntry.legacy_uid}`, () => {
      //get and parse response
      cy.request(`${Cypress.env("host")}${csEntry.url}`)
        .its("body")
        .then((response) => {
          const selectors = {
            summary: 'p[data-testid="article-summary"]',
            body: 'div[data-module="content"]',
          };
          const document = parser.parseFromString(response, "text/html");

          //match summary length
          const summary = document.querySelector(selectors.summary).innerHTML;
          const [pageSummary, csSummary] = utils.getSanitizedData(
            summary,
            csEntry.summary
          );

          const summaryDiff = pageSummary.length - csSummary.length
          expect(summaryDiff).to.be.equal(0);

          //match body length
          const body = document.querySelector(selectors.body).innerHTML;
          const [pageBody, csBody] = utils.getSanitizedData(
            body, 
            csEntry.body
          );

          const bodyDiff = pageBody.length - csBody.length
          expect(bodyDiff).to.be.equal(0);
        });
    });
  });
});
