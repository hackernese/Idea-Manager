describe("template spec", () => {
  it("Scenario 1 Testing", () => {
    cy.visit("https://www.wikipedia.org/");
    cy.get("#searchInput").click().type("Hello world");
    cy.get("#search-form > fieldset > button").click();
    cy.url().should("contain", "awdawdawdawdawd");
  });
});
