import * as utils from "../support/utils";

const data = require("../fixtures/data.json");

describe("content disparity tests", () => {
  data.forEach((csEntry, index) => {
    let testId = utils.getTestId(index);

    it(`${testId} CS export matches displayed content for entry UID - ${csEntry.legacy_uid}`, () => {
      cy.intercept({
        method: "GET",
        url: csEntry.url,
      }).as("contentPage");

      //visit entry page
      cy.visit(`${Cypress.env("host")}${csEntry.url}`);
      cy.wait("@contentPage").then((interception) => {
        expect(interception.response.statusCode).to.be.equal(200);
      });

      //match summary
      cy.findByTestId("article-summary").then((summary) => {
        let [pageData, csData] = utils.getSanitizedData(
          summary,
          csEntry.summary
        );
        expect(pageData).to.be.equal(csData);
      });

      //match body content
      cy.findByModule("content").then((body) => {
        let [pageData, csData] = utils.getSanitizedData(
          body,
          csEntry.body
        );
        expect(pageData).to.be.equal(csData);
      });
    });
  });
});
