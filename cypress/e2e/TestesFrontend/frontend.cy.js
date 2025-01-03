/// <reference types="cypress" />

describe('FRONTEND Usuarios',() => {
    beforeEach(() => {
        cy.visit("https://front.serverest.dev")
        cy.cadastrarUsuarioFront("Rafael")
    })

    it('Mostrando um usuario', () => {
        cy.mockListaDeUsuarios('Stubson da Silva','EUSOUUMSTUB@stub.com','stubzudo123','mr.stub','1234')
        
        cy.verificacaoDoPrimeiroDaLista('Stubson da Silva','EUSOUUMSTUB@stub.com','stubzudo123','mr.stub')
    })

    afterEach(() => {
        cy.deletarUsuarioPeloEmail()
    })
})