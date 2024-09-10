/// <reference types="cypress" />

import '../support/commandsAPI'
import * as utilities from '../support/utilities'

describe('API Usuarios', () => {
  let userId
  beforeEach(() => {
    cy.getToken('fulano@qa.com', 'teste')
  })

  it('GET Usuarios', () => {
    cy.request({
      method: 'GET',
      url: '/usuarios'
    }).its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Usuarios', () => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: {
        "nome": "Rafael Macabu",
        "email": `rafael${utilities.createRandomString(5)}@qa.com.br`,
        "password": "teste",
        "administrador": "true"
      }
    }).as('response')

    cy.get('@response').then(response => {
      expect(response.body.message).to.be.equal('Cadastro realizado com sucesso')
      expect(response.body._id).to.exist

      userId = response.body._id
    })
  })

  it('PUT Usuarios', () => {
    cy.request({
      method: 'PUT',
      url: `/usuarios/${userId}`,
      body: {
        "nome": "Macabu Rafael",
        "email": `rafael${utilities.createRandomString(5)}@qa.com.br`,
        "password": "teste",
        "administrador": "true"
      }
    }).its("body.message").should("be.equal", 'Registro alterado com sucesso')
  })

  it('GET Usuarios com id', () => {
    cy.request({
      method: 'GET',
      url: `/usuarios/${userId}`
    }).as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.be.equal('Macabu Rafael')
      expect(response.body._id).to.be.equal(`${userId}`)
    })
  })

  it('DELETE Usuarios', () => {
    cy.request({
      method: 'DELETE',
      url: `/usuarios/${userId}`
    }).its('body.message').should('be.equal', 'Registro excluído com sucesso')
  })
})

describe('API Produtos', () => {
  let productId
  let productName
  it('GET Produtos', () => {
    cy.request({
      method: 'GET',
      url: '/produtos'
    }).its('body.quantidade').should('be.at.least', 1)
  })

  it('POST Produtos', () => {
    productName = `Logitech MX${utilities.createRandomString(5)} Vertical`
    cy.request({
      method: 'POST',
      url: '/produtos',
      body: {
        "nome": productName,
        "preco": 470,
        "descricao": "Mouse",
        "quantidade": 381
      }
    }).as('response')

    cy.get('@response').then(response => {
      expect(response.body.message).to.be.equal('Cadastro realizado com sucesso')
      expect(response.body._id).to.exist

      productId = response.body._id
    })
  })

  it('PUT Produtos', () => {
    productName = `Positivo MX${utilities.createRandomString(5)} Horizontal`
    cy.request({
      method: 'PUT',
      url: `/produtos/${productId}`,
      body: {
        "nome": productName,
        "preco": 69,
        "descricao": "Teclado",
        "quantidade": 420
      }
    }).its("body.message").should("be.equal", 'Registro alterado com sucesso')
  })

  it('GET Produtos com id', () => {
    cy.request({
      method: 'GET',
      url: `/produtos/${productId}`
    }).as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.be.equal(productName)
      expect(response.body.preco).to.be.equal(69)
      expect(response.body.descricao).to.be.equal("Teclado")
      expect(response.body.quantidade).to.be.equal(420)
      expect(response.body._id).to.be.equal(`${productId}`)
    })
  })
  
  it('DELETE Produtos', () => {
    cy.request({
      method: 'DELETE',
      url: `/produtos/${productId}`
    }).its('body.message').should('be.equal', 'Registro excluído com sucesso')
  })
})