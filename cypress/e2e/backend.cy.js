/// <reference types="cypress" />

import '../support/commandsAPI'

function createRandomString(length) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

describe('API', () => {
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
        "nome": "Fulano da Silva",
        "email": `fulano${createRandomString(5)}@qa.com.br`,
        "password": "teste",
        "administrador": "true"
      }
    }).as('response')
    
    cy.get('@response').its('body.message').should('be.equal',"Cadastro realizado com sucesso")
    cy.get('@response').its('body._id').should('exist')
  })
})