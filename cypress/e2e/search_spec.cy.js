describe('Search Functionality', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully searches for posts', () => {
    cy.get('[data-testid="search-input"]').type('JavaScript{enter}');
    cy.url().should('include', '/search/');
    cy.get('[data-testid="search-results"]').should('have.length.at.least', 1);
  });
});
