describe("Service worker reproduction tests", () => {
  it("intercepts fetch", () => {
    cy.visit("/");

    cy.intercept("https://jsonplaceholder.typicode.com/todos/1", {
      fixture: "intercept",
    }).as("interceptRequest");
    cy.get("#interceptCall").click();

    cy.get("#paragraph").should("contain.text", "cypress intercept");
  });

  it("intercepts fetch handled by msw", () => {
    cy.visit("/");

    cy.intercept("https://jsonplaceholder.typicode.com/todos/1", {
      fixture: "intercept",
    }).as("mswRequest");
    cy.get("#interceptCall").click();
    cy.get("#paragraph").should("contain.text", "cypress intercept");

    cy.get("#clear").click();
    cy.get("#paragraph").should("contain.text", "");

    cy.get("#mswCall").click();
    cy.get("#paragraph").should("contain.text", "cypress intercept");
  });
});
