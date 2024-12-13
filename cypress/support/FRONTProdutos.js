import * as utilities from './utilities'

let productName

Cypress.Commands.add('cadastrarProdutoFront', (product) => {
    productName = product + " " + utilities.createRandomString(5)

    cy.get('[data-testid="cadastrar-produtos"]').click()
    .get('[data-testid="nome"]').type(productName)
    .get('[data-testid="preco"]').type("699")
    .get('[data-testid="descricao"]').type("Esse produto é uma" + productName)
    .get('[data-testid="quantity"]').type("20")
    .get('[data-testid="cadastarProdutos"]').click()
})