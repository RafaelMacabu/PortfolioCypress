/// <reference types="cypress" />

describe('FRONTEND Usuarios', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
        cy.cadastrarUsuario("Rafael")
    })

    it('Verificando elementos da tela de cadastro', () => {
        cy.verificarCadastroDeUsuario()
    })

    it('Verificando elementos da tela de lista de usuários cadastrados', () => {
        cy.mockListaDeUsuarios('Stubson da Silva', 'EUSOUUMSTUB@stub.com', 'stubzudo123', 'mr.stub')

        cy.verificarPrimeiroDaListaUsuarios('Stubson da Silva', 'EUSOUUMSTUB@stub.com', 'stubzudo123', 'mr.stub')
    })

    afterEach(() => {
        cy.DELETEUsuariosPeloEmail()
    })
})

describe('FRONTEND Produtos', () => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
        cy.cadastrarUsuario("Rafael")
    })

    it('Verificando elementos da tela de cadastro de produto', () => {
        cy.verificarCadastroDeProduto()
    })

    it('Verificando elementos da tela de lista de produtos cadastrados', () => {
        cy.mockListaDeProdutos('Produto Stub', 'R$ 199.99', 'Sou um stub zé', '1000')

        cy.verificacaoDoPrimeiroDaListaProdutos('Produto Stub', 'R$ 199.99', 'Sou um stub zé', '1000')
    })

    afterEach(() => {
        cy.DELETEUsuariosPeloEmail()
    })
})