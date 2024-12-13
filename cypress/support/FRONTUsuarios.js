import * as utilities from './utilities'

let email
let senha

Cypress.Commands.add('cadastrarUsuarioFront', (user) => {
    email = user + utilities.createRandomString(5) + '@qa.com.br'
    senha = user + utilities.createRandomString(5)

    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]').type(user)
        .get('[data-testid="email"]').type(email)
        .get('[data-testid="password"]').type(senha)
        .get('[data-testid="checkbox"]').click()
        .get('[data-testid="cadastrar"]').click()
})

Cypress.Commands.add('loginUsuarioFront', () => {
    cy.get('[data-testid="email"]').type(email)
        .get('[data-testid="senha"]').type(senha)
        .get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('loginUsuarioFrontComDadosBackend', () => {
    cy.get('[data-testid="email"]').type(Cypress.env('email'))
        .get('[data-testid="senha"]').type(Cypress.env('senha'))
        .get('[data-testid="entrar"]').click()
})

Cypress.Commands.add('deletarUsuarioFront', () => {
    cy.get('[data-testid="listar-usuarios"]').click()
    cy.xpath(`//td[text()='${email}']//following-sibling::td//div//button[@class = 'btn btn-danger']`).click()
})