describe('Subreddit Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('searches and navigates to a subreddit feed', () => {
    cy.get('[data-testid="subreddit-input"]').type('react{enter}');
    cy.url().should('include', '/r/');
    cy.get('[data-testid="posts-container"]').should('exist');
  });
});
