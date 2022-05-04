describe('Show Book', () => {
  it('Shows details', () => {
    cy.server()
    cy.route('GET', '**/api/public/book/**', {
      authorFirstname: 'Jon',
      authorSurname: 'Doe',
      branchName: 'Branch 1',
      branchOrdering: 'Info',
      cond: 'Good',
      currency: 'EUR',
      genre: 'Crime',
      id: '0002af24-dd81-11eb-8407-00155d30f6b7',
      price: 2.5,
      releaseYear: 2021,
      shortDescription: 'desc',
      title: 'Title',
      branchCart: true,
    })
    cy.route('POST', '**/api/public/reservation/new', {
      msg: 'SUCCESS',
    })

    cy.visit('/article/id')

    cy.get('.btn_primary').click()
    cy.get('.badge .icon').click() // cart button
    cy.get('#surname').type('name')
    cy.get('#mail').type('mail@domain.tld')
    cy.get('#phone').type('123')
    cy.get('#notes').type('note')
    cy.get('.form').submit()

    cy.get('div.alert_success').should('exist')

    cy.get('.modal .btn').click()
    cy.get('.modal').should('not.exist')
  })
})
