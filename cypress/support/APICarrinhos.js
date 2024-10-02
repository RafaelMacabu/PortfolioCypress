import * as utilities from './utilities'

Cypress.Commands.add('acharCarrinhos',() => {
    return cy.request({
      method: 'GET',
      url: '/carrinhos'
    })
})

Cypress.Commands.add('acharCarrinhosPorId',() => {
  cy.request({
    method: 'GET',
    url: `/carrinhos/${Cypress.env('cartId')}`
  }).as('response')

  cy.get('@response').then(response => {
    expect(response.body.produtos[0].idProduto).to.be.equal(Cypress.env('productId'))
  })
})

Cypress.Commands.add('cadastrarCarrinho',() => {
  cy.request({
    method: 'POST',
    url: '/carrinhos',
    body: {
      "produtos":[
        {
          "idProduto": Cypress.env('productId'),
          "quantidade": 1
        }
      ]
    }
  }).as('response')

  cy.get('@response').then(response => {
    expect(response.body._id).to.exist

    Cypress.env('cartId',response.body._id)
  })

  return cy.get('@response')
})

Cypress.Commands.add('concluirCompraCarrinho',() => {
  return cy.request({
    method: 'DELETE',
    url: `/carrinhos/concluir-compra`
  })
})