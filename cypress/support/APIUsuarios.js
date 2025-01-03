import * as utilities from './utilities'

let email
let senha

Cypress.Commands.add('cadastrarUsuario',(user) => {
    Cypress.env('email',user + utilities.createRandomString(5) + '@qa.com.br')
    Cypress.env('senha',user + utilities.createRandomString(5))
    
    cy.request({
        method: 'POST',
        url: '/usuarios',
        body: {
          "nome": user,
          "email": Cypress.env('email'),
          "password": Cypress.env('senha'),
          "administrador": "true"
        }
      }).as('response')
  
      cy.get('@response').then(response => {
        expect(response.body._id).to.exist
        Cypress.env('userId',response.body._id)
      })

      return cy.get('@response')
})

Cypress.Commands.add('getToken',() => {
    cy.request({
        method:'POST',
        url:'/login',
        body:{
            "email":Cypress.env('email'),
            "password":Cypress.env('senha')
        }
    }).its('body.authorization').should('not.be.empty')
    .then(auth => {
        Cypress.env('auth',auth)
        return auth
    })
})

Cypress.Commands.add('loginUsuario',(email,senha) => {
    return cy.request({
        method:'POST',
        url:'/login',
        body:{
            "email":Cypress.env('email'),
            "password":Cypress.env('senha')
        }
    })
})

Cypress.Commands.add('editarUsuario',(user) => {
    Cypress.env('email',user + utilities.createRandomString(5) + '@qa.com.br')
    Cypress.env('senha',user + utilities.createRandomString(5))

    return cy.request({
        method: 'PUT',
        url: `/usuarios/${Cypress.env('userId')}`,
        body: {
          "nome": user,
          "email": Cypress.env('email'),
          "password": Cypress.env('senha'),
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

Cypress.Commands.add('deletarUsuarioPeloEmail',() => {
    cy.request({
        method:'GET',
        url:'/usuarios',
        qs: {
            email:Cypress.env('email')
        }
    }).then(response => {
        cy.request({
            method:'DELETE',
            url:`/usuarios/${response.body.usuarios[0]._id}`
        })
    })
})

