import * as utils from "../support/utils";
const parser = new DOMParser();

Cypress.Commands.add("findByTestId", (id) => {
  return cy.get(`p[data-testid=${id}]`);
});

Cypress.Commands.add("findByModule", (module) => {
  return cy.get(`div[data-module=${module}]`);
});

Cypress.Commands.add("skipWhen", function (expression) {
  if (expression) {
    this.skip();
  }
});

Cypress.Commands.add("matchFields", (csEntry, selector, field) => {
  cy.request(`${Cypress.env("host")}${csEntry.url}`)
    .its("body")
    .then((response) => {
      const document = parser.parseFromString(response, "text/html"),
        element = document.querySelector(selector),
        [pageData, csData] = utils.getSanitizedData(
          !element ? null : element.innerHTML,
          csEntry[field]
        );

      cy.skipWhen(!csData.length);

      const diff = pageData.length - csData.length;
      expect(diff).to.be.equal(0);
    });
});
