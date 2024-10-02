/// <reference types="cypress" />

import '../../support/APIUsuarios'
import '../../support/APIProdutos'
import '../../support/APICarrinhos'
import * as utilities from '../../support/utilities'

describe('API Usuarios', () => {
  it('GET Usuarios', () => {
    cy.acharUsuarios().its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Usuarios', () => {
    cy.cadastrarUsuario('Rafael').its('body.message').should('be.equal',"Cadastro realizado com sucesso")
    cy.getToken()
  })
 
  it('PUT Usuarios', () => {
    cy.editarUsuario('Andre').as('response')

    cy.get('@response').then(response => {
      expect(response.body.message).to.be.equal('Registro alterado com sucesso')        
    })
  })

  it('GET Usuarios por ID', () => {
    cy.acharUsuarioPorId().as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.be.equal('Andre')
      expect(response.body._id).to.be.equal(`${Cypress.env('userId')}`)
    })
  })

  it('DELETE Usuarios', () => {
    cy.deletarUsuario().its('body.message').should('be.equal', 'Registro excluído com sucesso')
  })
})

describe('API Produtos', () => {
  before('Setup',() => {
    cy.cadastrarUsuario('Rafael')
    cy.getToken()
  })

  it('GET Produtos', () => {
    cy.acharProdutos().its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Produtos', () => {
    cy.cadastrarProduto('Bola').its('body.message').should('be.equal','Cadastro realizado com sucesso')
  })

  it('PUT Produtos', () => {
    cy.editarProduto('Quadrado').its("body.message").should("be.equal", 'Registro alterado com sucesso')
  })

  it('GET Produtos por ID', () => {
    cy.acharProdutoPorId().as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.contain("Quadrado")
      expect(response.body.preco).to.be.equal(69)
      expect(response.body.descricao).to.be.equal("Teclado")
      expect(response.body.quantidade).to.be.equal(420)
      expect(response.body._id).to.be.equal(`${Cypress.env('productId')}`)
    })
  })
  
  it('DELETE Produtos', () => {
    cy.deletarProduto().its('body.message').should('be.equal', 'Registro excluído com sucesso')
  })

  after('Cleanup',() => {
    cy.deletarUsuario()
  })
})

describe('API Carrinhos',() => {
  before('Setup',() => {
    cy.cadastrarUsuario('Rafael')
    cy.getToken()
    cy.cadastrarProduto('Garrafa')
  })

  it('GET Carrinhos',() => {
    cy.acharCarrinhos().its('body.quantidade').should('be.at.least',1)
  })

  it('POST Carrinhos',() => {
    cy.cadastrarCarrinho().its('body.message').should('be.equal',"Cadastro realizado com sucesso")
  })

  it('GET Carrinhos por ID',() => {
    cy.acharCarrinhosPorId().its('body.produtos[0].idProduto').should('exist')
  })

  it('DELETE Carrinhos',() => {
    cy.concluirCompraCarrinho().its('body.message').should('be.equal',"Registro excluído com sucesso")
  })

  after('Cleanup',() => {
    cy.deletarProduto()
    cy.deletarUsuario()
  })
})