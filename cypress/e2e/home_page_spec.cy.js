describe('Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.url().should('include', '/');
    cy.get('h1').contains('Neptune');
  });

  it('displays posts feed on load', () => {
    cy.get('[data-testid="posts-container"]').should('exist');
  });
});
