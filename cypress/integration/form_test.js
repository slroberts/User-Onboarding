describe("Form - testing User Onboarding form inputs", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("Add text to inputs and submit form", function () {
    cy.get('[data-cy="name"]')
      .type("Shomari Roberts")
      .should("have.value", "Shomari Roberts");
    cy.pause();
    cy.get('[data-cy="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
    cy.get('[data-cy="password"]').type("45").should("have.value", "45");
    cy.get('[data-cy="password"]')
      .type("1234abcd")
      .should("have.value", "451234abcd");
    cy.get('[data-cy="role"]')
      .select("frontend")
      .should("have.value", "frontend");
    cy.get("#terms").check({force: true}).should("be.checked");
    cy.get('[data-cy="submit"]').click();
  });

  it("Clear inputs and check for errors show errors ", function () {
    cy.get('[data-cy="name"]').type("Shomari Roberts").clear();
    cy.pause();
    cy.get('[data-cy="email"]').type("test@gmail.com").clear();
    cy.get('[data-cy="password"]').type("45").clear();
    cy.get("#terms").uncheck();
  });
});
