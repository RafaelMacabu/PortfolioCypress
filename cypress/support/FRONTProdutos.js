import * as utilities from './utilities'

Cypress.Commands.add('cadastrarProdutoFront', (product) => {
    Cypress.env('productName',product + " " + utilities.createRandomString(5))

    cy.get('[data-testid="cadastrar-produtos"]').click()
    .get('[data-testid="nome"]').type(Cypress.env('productName'))
    .get('[data-testid="preco"]').type("699")
    .get('[data-testid="descricao"]').type("Esse produto é uma " + Cypress.env('productName'))
    .get('[data-testid="quantity"]').type("20")

    cy.intercept('POST','/produtos').as('cadastrandoProduto')
    cy.intercept('GET','/produtos').as('listaProduto')
    cy.get('[data-testid="cadastarProdutos"]').click()
    cy.wait('@cadastrandoProduto')
    cy.wait('@listaProduto')
    cy.xpath(`//td[text()='${Cypress.env('productName')}']`).should('exist')
})