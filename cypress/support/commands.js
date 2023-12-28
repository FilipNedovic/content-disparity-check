import { getPreparedData } from "./utils";
const parser = new DOMParser();

Cypress.Commands.add("skipWhen", function (expression) {
  if (expression) {
    this.skip();
  }
});

Cypress.Commands.add("matchFields", (csEntry, selector, field) => {
  cy.skipWhen(!csEntry[field].length);

  cy.request(`${Cypress.env("host")}${csEntry.url}`)
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
