describe("Service worker reproduction tests", () => {
  it("intercepts fetch", () => {
    cy.visit("/");
    // do this to reload the page to ensure an active service worker
    cy.reload();

    cy.intercept("https://jsonplaceholder.typicode.com/todos/1", {
      fixture: "intercept",
    }).as("interceptRequest");
    cy.get("#interceptCall").click();

    cy.get("#paragraph").should("contain.text", "cypress intercept");
  });

  it("intercepts fetch handled by vanilla service worker", () => {
    cy.visit("/");
    // do this to reload the page to ensure an active service worker
    cy.reload();

    cy.intercept("https://jsonplaceholder.typicode.com/todos/1", {
      fixture: "intercept",
    }).as("serviceWorkerRequest");
    cy.get("#serviceWorkerCall").click();

    cy.get("#paragraph").should("contain.text", "cypress intercept");
  });
});
