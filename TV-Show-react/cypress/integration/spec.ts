describe('CRA', () => {
    it('shows learn link', function () {
      cy.visit('http://localhost:3000')
      cy.get('h4').should('be.visible')
        .and('have.text', 'Shows')
    })
  })