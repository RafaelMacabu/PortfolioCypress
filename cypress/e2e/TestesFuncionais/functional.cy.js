/// <reference types="cypress" />

describe('FUNCTIONAL Usuarios', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
    })

    it('Cadastrando um novo usuário', () => {
        cy.cadastrarUsuario('Rafael')

        cy.get('.alert').should('contain', 'sucesso')
    })

    it('Fazendo login com esse novo usuário', () => {
        cy.loginUsuario()

        cy.xpath("//p[@class='lead']").should('have.text', 'Este é seu sistema para administrar seu ecommerce.')
    })

    it('Tentando deletar o próprio usuário', () => {
        cy.loginUsuario()
        cy.deletarUsuario()

        cy.get('.alert').should('contain.text', 'Não é possível excluir o próprio usuário!')
    })

    after(() => {
        cy.DELETEUsuariosPeloEmail()
    })

    afterEach(() => {
        cy.screenshot()
    })
})

describe('FUNCTIONAL Produtos', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
        cy.POSTUsuarios('Rafael')
        cy.loginUsuarioComDadosBackend()
    })

    it('Cadastrando produto e verificando sua presença na lista', () => {
        cy.cadastrarProduto('Placa')
    })

    afterEach(() => {
        cy.screenshot()
        cy.DELETEProdutosPeloNome()
        cy.deletarUsuario()
    })
})