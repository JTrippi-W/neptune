describe('Error Handling for Posts and Post', () => {
  it('shows an error message for Posts when the network request fails', () => {
    cy.intercept('GET', '/r/popular.json', {
      statusCode: 500,
      body: {
        message: 'Internal Server Error'
      }
    }).as('getPostsFail');

    cy.visit('/');

    cy.wait('@getPostsFail');

    cy.findByTestId('error-message').should('include.text', 'Error occurred: 500: "Internal Server Error"');
  });
});
