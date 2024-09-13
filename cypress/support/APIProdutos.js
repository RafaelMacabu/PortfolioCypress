import * as utilities from './utilities'

let productName

Cypress.Commands.add('cadastrarProduto',(produto) => {
    productName = `${produto}${utilities.createRandomString(5)}`

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

      Cypress.env('productId',response.body._id)
    })
})

Cypress.Commands.add('editarProduto',(produto) => {
    productName = `${produto}${utilities.createRandomString(5)}`

    return cy.request({
        method: 'PUT',
        url: `/produtos/${Cypress.env('productId')}`,
        body: {
          "nome": productName,
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