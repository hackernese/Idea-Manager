describe("template spec", () => {
	it("WTF", () => {
		cy.visit("https://www.wikipedia.org/");

		cy.get("#searchInput").click().type("Hello world");

		cy.get("#search-form > fieldset > button").click();

		cy.url().should("contain", "/wiki/wdwd");

		cy.contains('"Hello, World!" program by Brian Kernighan');
	});
});
