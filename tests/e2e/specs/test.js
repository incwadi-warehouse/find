describe('Test Home', () => {
  it('show home', () => {
    cy.visit('/')
    cy.get('h3')
  })
})

describe('Test Search', () => {
  it('show search', () => {
    cy.get('input[type=search]').type('test')
    cy.url().should('include', 'term=test')
    cy.get('div').should('has.class', 'list')
  })
})
