describe('Individual Post Details', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads and displays details of a post', () => {
    cy.get('[data-testid="post-link"]').first().click();
    cy.url().should('include', '/post/');
    cy.get('[data-testid="post-content"]').should('exist');
  });
});
