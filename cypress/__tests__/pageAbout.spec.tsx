import About from '../../src/app/about/page'
import React from 'react'

describe('<About />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<About />)

    // see: https://on.cypress.io/interacting-with-elements

    // find the link to the homepage
    cy.contains('a', 'Homepage').should('have.attr', 'href', '/')

    // find the heading
    cy.contains('h1', 'About Page').should('be.visible')
  })
})
