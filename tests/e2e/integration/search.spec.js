describe('Choose branch', () => {
  it('Selects a branch', () => {
    cy.server()
    cy.route('GET', '**/api/public/branch/', {
      branches: [
        { id: '1', name: 'branch 1' },
        { id: '2', name: 'branch 2' },
      ],
    })
    cy.visit('/search')
    cy.get('main article section article span:nth(1)').click()
    cy.get('.dropdown-item:nth(0)').click()
    cy.url().should('include', 'branch=1')
  })
})

describe('Automatically choose a branch', () => {
  it('Shows home', () => {
    cy.server()
    cy.route('GET', '**/api/public/branch/', {
      branches: [{ id: '1', name: 'branch 1' }],
    })
    cy.visit('/search')
    cy.url().should('include', 'branch=1')
  })
})

describe('Search', () => {
  it('Shows home view', () => {
    cy.get('h3')
  })
})

describe('Find no book', () => {
  it('Shows list of books', () => {
    cy.server()
    cy.route('GET', '**/api/public/book/find?options=**', {
      books: [],
    })
    cy.get('input[type=search]').type('test')
    cy.url().should('include', 'term=test')
    cy.get('div.alert_warning')
  })
})

describe('Find books', () => {
  it('Shows list of books', () => {
    cy.get('button[type=reset].search_btn').click()
    cy.server()
    cy.route('GET', '**/api/public/book/find?options=**', {
      books: [
        {
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
        },
      ],
    })
    cy.get('input[type=search]').type('test')
    cy.url().should('include', 'term=test')
    cy.get('div').should('has.class', 'list')
    cy.get('div.alert_warning').should('not.exist')
  })
})
