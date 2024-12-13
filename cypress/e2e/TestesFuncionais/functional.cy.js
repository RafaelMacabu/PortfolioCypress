/// <reference types="cypress" />

describe('FUNCTIONAL Usuarios', () => {
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

describe('FUNCTIONAL Produtos', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
        cy.cadastrarUsuario('Rafael')
        cy.loginUsuarioFrontComDadosBackend()
    })

    it.only('Cadastrar Produto',() => {
        cy.cadastrarProdutoFront('Placa')
    })

    afterEach(() => {
       cy.deletarUsuario()
    }) 
})