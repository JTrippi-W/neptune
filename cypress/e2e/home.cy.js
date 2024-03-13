describe('Home Page', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://www.reddit.com/r/popular.json', {
            delay: 500,
            fixture: 'redditMock.json' 
        }).as('getPopularPosts');
        cy.visit('/');
    });

    it('successfully loads and displays posts', () => {
        cy.wait('@getPopularPosts');
        cy.get('li').should('have.length.greaterThan', 0);
    });
});