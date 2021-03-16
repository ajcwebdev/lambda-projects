const name = "Paul"

describe(‘Form’, () => {
  it(‘can navigate to site’, () => {
    cy.visit(‘localhost:3000/pizza’)
  })
  it(‘can input name’, () => {
    cy.get(‘input[name=“name”]’).type(name).should(‘have.value’, name)
  })
  it(‘can submit user’, () => {
    cy.contains(‘Submit’).click()
  })
  it(‘can checkboxes’, () => {
    cy.get(‘[type=“checkbox”]’).check()
  })
});