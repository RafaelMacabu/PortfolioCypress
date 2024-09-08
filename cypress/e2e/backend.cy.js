/// <reference types="cypress" />

import '../support/commandsAPI'
import * as utilities from '../support/utilities'

describe('API', () => {
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

  it('GET Usuarios com id', () => {
    cy.request({
      method: 'GET',
      url: `/usuarios/${userId}`
    }).as('response')

    cy.get('@response').then(response => {
      expect(response.body.nome).to.be.equal('Rafael Macabu')
      expect(response.body._id).to.be.equal(`${userId}`)
    })
  })

  it('DELETE Usuarios', () => {
    cy.request({
      method: 'DELETE',
      url: `/usuarios/${userId}`
    }).its('body.message').should('be.equal','Registro excluído com sucesso')
  })
})