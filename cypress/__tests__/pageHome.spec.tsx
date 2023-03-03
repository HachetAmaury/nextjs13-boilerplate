import React from 'react'
import Home from '../../src/app/page'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)

    // see: https://on.cypress.io/interacting-with-elements

    // find the link to the about page
    cy.contains('a', 'About').should('have.attr', 'href', '/about')

    // find the heading
    cy.contains('h1', 'Welcome to Next.js!').should('be.visible')
  })
})
