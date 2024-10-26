/// <reference types="cypress" />

describe('FUNCTIONAL', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
    })

    it('Cadastrar um usuario', () => {
        cy.cadastrarUsuarioFront('Rafael')

        cy.get('.alert').should('contain','sucesso')
    })

    it('Login', () => {
        cy.loginUsuarioFront()
    })

    it('Deletar Usuario',() => {
        cy.loginUsuarioFront()
        cy.deletarUsuarioFront()
    })
})