/// <reference types="cypress" />

import * as utilities from '../../support/utilities'

describe('BACKEND API Usuarios', () => {
  it('GET Usuarios', () => {
    cy.GETUsuarios().its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Usuarios', () => {
    cy.POSTUsuarios('Rafael').its('body.message').should('be.equal', "Cadastro realizado com sucesso")
  })

  it('PUT Usuarios', () => {
    cy.getToken()
    cy.PUTUsuarios('Andre').its('body.message').should('be.equal','Registro alterado com sucesso')
  })

  it('GET Usuarios por ID', () => {
    cy.GETUsuariosPorId().as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.be.equal('Andre')
      expect(response.body._id).to.be.equal(`${Cypress.env('userId')}`)
    })
  })

  it('DELETE Usuarios', () => {
    cy.DELETEUsuarios().its('body.message').should('be.equal', 'Registro excluído com sucesso')
  })
})

describe('BACKEND API Produtos', () => {
  before('Setup', () => {
    cy.POSTUsuarios('Rafael')
    cy.getToken()
  })

  it('GET Produtos', () => {
    cy.GETProdutos().its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Produtos', () => {
    cy.POSTProdutos('Bola').its('body.message').should('be.equal', 'Cadastro realizado com sucesso')
  })

  it('PUT Produtos', () => {
    cy.PUTProdutos('Quadrado').its("body.message").should("be.equal", 'Registro alterado com sucesso')
  })

  it('GET Produtos por ID', () => {
    cy.GETProdutosPorId().as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.contain("Quadrado")
      expect(response.body.preco).to.be.equal(69)
      expect(response.body.descricao).to.be.equal("Teclado")
      expect(response.body.quantidade).to.be.equal(420)
      expect(response.body._id).to.be.equal(`${Cypress.env('productId')}`)
    })
  })

  it('DELETE Produtos', () => {
    cy.DELETEProdutos().its('body.message').should('be.equal', 'Registro excluído com sucesso')
  })

  after('Cleanup', () => {
    cy.DELETEUsuarios()
  })
})

describe('BACKEND API Carrinhos', () => {
  before('Setup', () => {
    cy.POSTUsuarios('Rafael')
    cy.getToken()
    cy.POSTProdutos('Garrafa')
  })

  it('GET Carrinhos', () => {
    cy.GETCarrinhos().its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Carrinhos', () => {
    cy.POSTCarrinhos().its('body.message').should('be.equal', "Cadastro realizado com sucesso")
  })

  it('GET Carrinhos por ID', () => {
    cy.GETCarrinhosPorId().its('body.produtos[0].idProduto').should('exist')
  })

  it('DELETE Carrinhos', () => {
    cy.DELETECarrinhosConcluir().its('body.message').should('be.equal', "Registro excluído com sucesso")
  })

  after('Cleanup', () => {
    cy.DELETEProdutos()
    cy.DELETEUsuarios()
  })
})