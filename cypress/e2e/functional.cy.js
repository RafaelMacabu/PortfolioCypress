describe('FUNCTIONAL', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
    })
    it('Visit', () => {
        cy.get('[data-testid="email"]').type("fulano@qa.com")
        .get('[data-testid="senha"]').type("teste")
        .get('[data-testid="entrar"]').click()
    })
})