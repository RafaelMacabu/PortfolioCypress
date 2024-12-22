import * as utilities from './utilities'

let productName

Cypress.Commands.add('cadastrarProduto',(product) => {
  Cypress.env('productName',product + " " + utilities.createRandomString(5))

    cy.request({
      method: 'POST',
      url: '/produtos',
      body: {
        "nome": Cypress.env('productName'),
        "preco": 470,
        "descricao": "Mouse",
        "quantidade": 381
      }
    }).as('response')

    cy.get('@response').then(response => {
      expect(response.body._id).to.exist

      Cypress.env('productId',response.body._id)
    })

    return cy.get('@response')
})

Cypress.Commands.add('editarProduto',(product) => {
  Cypress.env('productName',product + " " + utilities.createRandomString(5))

    return cy.request({
        method: 'PUT',
        url: `/produtos/${Cypress.env('productId')}`,
        body: {
          "nome": Cypress.env('productName'),
          "preco": 69,
          "descricao": "Teclado",
          "quantidade": 420
        }
      })
})

Cypress.Commands.add('acharProdutos',() => {
    return cy.request({
        method: 'GET',
        url: '/produtos'
      })
})

Cypress.Commands.add('acharProdutoPorId',() => {
    return cy.request({
        method: 'GET',
        url: `/produtos/${Cypress.env('productId')}`
      })
})

Cypress.Commands.add('deletarProduto',() => {
    return cy.request({
        method: 'DELETE',
        url: `/produtos/${Cypress.env('productId')}`
      })
})

Cypress.Commands.add('deletarProdutoPeloNome',() => {
  cy.request({
    method: 'GET',
    url: '/produtos',
    qs: {
      "nome": Cypress.env('productName')
    }
  }).then(response => {
    expect(response.body.produtos[0]._id).to.exist

    cy.request({
      method: 'DELETE',
      url: `/produtos/${response.body.produtos[0]._id}`,
      auth: {
        bearer: Cypress.env('auth')
      }
    })
  })
})