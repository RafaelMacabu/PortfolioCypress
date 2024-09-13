import * as utilities from './utilities'

let email
let senha

Cypress.Commands.add('cadastrarUsuario',(user) => {
    email = user + utilities.createRandomString(5) + '@qa.com.br'
    senha = user + utilities.createRandomString(5)

    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          "nome": user,
          "email": email,
          "password": senha,
          "administrador": "true"
        }
      }).as('response')
  
      cy.get('@response').then(response => {
        expect(response.body.message).to.be.equal('Cadastro realizado com sucesso')
        expect(response.body._id).to.exist

        Cypress.env('userId',response.body._id)
      })
})

Cypress.Commands.add('getToken',() => {
    cy.request({
        method:'POST',
        url:'/login',
        body:{
            "email":email,
            "password":senha
        }
    }).its('body.authorization').should('not.be.empty')
    .then(auth => {
        Cypress.env('auth',auth)
        return auth
    })
})

Cypress.Commands.add('loginUsuario',(email,senha) => {
    cy.request({
        method:'POST',
        url:'/login',
        body:{
            "email":email,
            "password":senha
        }
    }).its('body.authorization').should('not.be.empty')
})

Cypress.Commands.add('editarUsuario',(user) => {
    email = user + utilities.createRandomString(5) + '@qa.com.br'
    senha = user + utilities.createRandomString(5)

    return cy.request({
        method: 'PUT',
        url: `/usuarios/${Cypress.env('userId')}`,
        body: {
          "nome": user,
          "email": email,
          "password": senha,
          "administrador": "true"
        }
      })
})

Cypress.Commands.add('acharUsuarios',() => {
    return cy.request({
        method: 'GET',
        url: `/usuarios`
      }).as('response')
})

Cypress.Commands.add('acharUsuarioPorId',() => {
    return cy.request({
        method: 'GET',
        url: `/usuarios/${Cypress.env('userId')}`
      }).as('response')
})

Cypress.Commands.add('deletarUsuario',() => {
    return cy.request({
        method:'DELETE',
        url:`/usuarios/${Cypress.env('userId')}`
    })
})