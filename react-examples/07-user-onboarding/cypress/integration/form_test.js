const name = "Paul"
const email = "Paul@beatles.com"
const password = "pw123456"

describe('Form', () => {
  it('can navigate to site', () => {
    cy.visit('localhost:3000')
  })

  it('can submit user', () => {
    cy.get('input[name="name"]').type(name).should('have.value', name)
    cy.get('input[name="email"]').type(email).should('have.value', email)
    cy.get('input[name="password"]').type(password).should('have.value', password)
    cy.get('input[name="tos"]').check().should('have.checked')
    cy.contains('Submit').click()
    cy.get('input[name="password"]').clear(password)
    cy.contains('required')

  })
});