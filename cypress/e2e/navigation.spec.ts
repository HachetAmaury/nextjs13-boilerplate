describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="about"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/about')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('About Page')
  })

  it('should navigate to the home page', () => {
    cy.visit('http://localhost:3000/about')

    // Find a link with an href attribute containing "/" and click it
    cy.get('a[href*="/"]').click()

    // The new url should include "/"
    cy.url().should('include', '/')

    // The new page should contain an h1 with "Home page"
    cy.get('h1').contains('Welcome to Next.js!')
  })
})

export {}
