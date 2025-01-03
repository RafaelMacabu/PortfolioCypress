/// <reference types="cypress" />

describe('FUNCTIONAL Usuarios', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
    })

    it('Cadastrando um novo usuario', () => {
        cy.cadastrarUsuarioFront('Rafael')

        cy.get('.alert').should('contain','sucesso')
    })

    it('Fazendo login', () => {
        cy.loginUsuarioFront()

        cy.xpath("//p[@class='lead']").should('have.text','Este é seu sistema para administrar seu ecommerce.')
    })

    it('Tentando deletar o proprio usuario',() => {
        cy.loginUsuarioFront()
        cy.deletarUsuarioFront()
        
        cy.get('.alert').should('contain.text','Não é possível excluir o próprio usuário!')
    })

    after(() => {
        cy.deletarUsuarioPeloEmail()
    })
})

describe('FUNCTIONAL Produtos', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
        cy.cadastrarUsuario('Rafael')
        cy.loginUsuarioFrontComDadosBackend()
    })

    it('Cadastrando produto e verificando sua presenca',() => {
        cy.cadastrarProdutoFront('Placa')
    })

    afterEach(() => {
       cy.deletarProdutoPeloNome()
       cy.deletarUsuario()
    }) 
})