import * as utilities from './utilities'

let email
let senha

Cypress.Commands.add('cadastrarUsuarioFront', (user) => {
    Cypress.env('email', user + utilities.createRandomString(5) + '@qa.com.br')
    Cypress.env('senha', user + utilities.createRandomString(5))

    cy.get('[data-testid="cadastrar"]').click()
    cy.get('[data-testid="nome"]').type(user)
        .get('[data-testid="email"]').type(Cypress.env('email'))
        .get('[data-testid="password"]').type(Cypress.env('senha'))
        .get('[data-testid="checkbox"]').click()
        .get('[data-testid="cadastrar"]').click()

})

Cypress.Commands.add('loginUsuarioFront', () => {
    cy.get('[data-testid="email"]').type(Cypress.env('email'))
        .get('[data-testid="senha"]').type(Cypress.env('senha'))
        .get('[data-testid="entrar"]').click()

})

Cypress.Commands.add('loginUsuarioFrontPre', (nome) => {
    cy.get('[data-testid="email"]').type(nome + '@qa.com')
        .get('[data-testid="senha"]').type(nome + '123')
        .get('[data-testid="entrar"]').click()

})

Cypress.Commands.add('loginUsuarioFrontComDadosBackend', () => {
    cy.intercept('POST', '/login').as('login')

    cy.get('[data-testid="email"]').type(Cypress.env('email'))
        .get('[data-testid="senha"]').type(Cypress.env('senha'))
        .get('[data-testid="entrar"]').click()

    cy.wait('@login').then(({ request, response }) => {
        Cypress.env('auth', response.body.authorization.replace('Bearer ', ''))
    })
})

Cypress.Commands.add('deletarUsuarioFront', () => {
    cy.get('[data-testid="listar-usuarios"]').click()
    cy.xpath(`//td[text()='${Cypress.env('email')}']//following-sibling::td//div//button[@class = 'btn btn-danger']`).click().click()
})

Cypress.Commands.add('mockListaDeUsuarios', (nome, email, password, administrador) => {
    cy.url().should('contain', '/home')

    cy.intercept('GET', '/usuarios', req => {
        req.reply({
            body: {
                quantidade: 1,
                usuarios: [{
                    nome: nome,
                    email: email,
                    password: password,
                    administrador: administrador,
                    _id: "1234"
                }]
            }
        })
    })
    cy.get('[data-testid="listar-usuarios"]').click()
})

Cypress.Commands.add('verificarPrimeiroDaListaUsuarios', (nome, email, password, administrador) => {
    cy.get('h1').should('contain.text', 'Lista dos usuários')

    cy.xpath("//th[1][text()='Nome']/../../../tbody/tr[1]/td[1]").then(element => {
        expect(element.text()).to.be.equal(nome)
    })
    cy.xpath("//th[2][text()='Email']/../../../tbody/tr[1]/td[2]").then(element => {
        expect(element.text()).to.be.equal(email)
    })
    cy.xpath("//th[3][text()='Senha']/../../../tbody/tr[1]/td[3]").then(element => {
        expect(element.text()).to.be.equal(password)
    })
    cy.xpath("//th[4][text()='Administrador']/../../../tbody/tr[1]/td[4]").then(element => {
        expect(element.text()).to.be.equal(administrador)
    })
})

Cypress.Commands.add('verificarCadastroDeUsuario', () => {
    cy.url().should('contain', '/home')
    cy.get('[data-testid="cadastrar-usuarios"]').click()

    cy.get('h1').should('contain.text', 'Cadastro de usuários')

    cy.xpath("//label[@for ='nome']/following-sibling::input[@id='nome']").should('be.enabled')
    cy.xpath("//label[@for ='email']/following-sibling::input[@id='email']").should('be.enabled')
    cy.xpath("//label[@for ='password']/following-sibling::input[@id='password']").should('be.enabled')
    cy.xpath("//input[@id='administrador']/following-sibling::label[@for ='administrador']").should('not.be.selected')
    cy.xpath("//button[@data-testid='cadastrarUsuario']").should('be.enabled')
})





