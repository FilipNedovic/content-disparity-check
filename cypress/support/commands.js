Cypress.Commands.add("findByTestId", (id) => {
  return cy.get(`p[data-testid=${id}]`);
});

Cypress.Commands.add("findByModule", (module) => {
  return cy.get(`div[data-module=${module}]`);
});
