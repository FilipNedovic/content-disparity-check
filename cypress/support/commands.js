import { getPreparedData, getNewUrl } from "../support/utils";
const parser = new DOMParser();

Cypress.Commands.add("findByTestId", (id) => {
  return cy.get(`p[data-testid=${id}]`);
});

Cypress.Commands.add("findByModule", (module) => {
  return cy.get(`div[data-module=${module}]`);
});

Cypress.Commands.add("skipWhen", (expression) => {
  if (expression) {
    this.skip();
  }
});

Cypress.Commands.add("matchFields", (csEntry, selector, field) => {
  cy.skipWhen(!csEntry[field].length);

  cy.request(`${Cypress.env("host")}${getNewUrl(csEntry.url)}`)
    .its("body")
    .then((response) => {
      const document = parser.parseFromString(response, "text/html"),
        element = document.querySelector(selector),
        [pageData, csData] = getPreparedData(
          !element ? null : element.innerHTML,
          csEntry[field]
        ),
        diff = csData.length - pageData.length;
      expect(diff).to.be.equal(0);
    });
});
