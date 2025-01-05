import * as utilities from './utilities'

Cypress.Commands.add('cadastrarProdutoFront', (product) => {
    Cypress.env('productName', product + " " + utilities.createRandomString(5))

    cy.get('[data-testid="cadastrar-produtos"]').click()
        .get('[data-testid="nome"]').type(Cypress.env('productName'))
        .get('[data-testid="preco"]').type("699")
        .get('[data-testid="descricao"]').type("Esse produto é uma " + Cypress.env('productName'))
        .get('[data-testid="quantity"]').type("20")

    cy.intercept('POST', '/produtos').as('cadastrandoProduto')
    cy.intercept('GET', '/produtos').as('listaProduto')
    cy.get('[data-testid="cadastarProdutos"]').click()
    cy.wait('@cadastrandoProduto')
    cy.wait('@listaProduto')
    cy.xpath(`//td[text()='${Cypress.env('productName')}']`).should('exist')
})

Cypress.Commands.add('mockListaDeProdutos', (nome, preco, descricao, quantidade) => {
    cy.url().should('contain', '/home')

    cy.intercept('GET', '/produtos', req => {
        req.reply({
            body: {
                quantidade: 1,
                produtos: [{
                    nome: nome,
                    preco: preco,
                    descricao: descricao,
                    quantidade: quantidade,
                    _id: "1234"
                }]
            }
        })
    })

    cy.get('[data-testid="listar-produtos"]').click()
})

Cypress.Commands.add('verificacaoDoPrimeiroDaListaProdutos', (nome, preco, descricao, quantidade) => {
    cy.get('h1').should('contain.text', 'Lista dos Produtos')
    cy.xpath("//th[1][text()='Nome']/../../../tbody/tr[1]/td[1]").should('contain.text', nome)
    cy.xpath("//th[2][text()='Preço']/../../../tbody/tr[1]/td[2]").should('contain.text', preco)
    cy.xpath("//th[3][text()='Descrição']/../../../tbody/tr[1]/td[3]").should('contain.text', descricao)
    cy.xpath("//th[4][text()='Quantidade']/../../../tbody/tr[1]/td[4]").should('contain.text', quantidade)
})

Cypress.Commands.add('verificarCadastroDeProduto', () => {
    cy.url().should('contain', '/home')
    cy.get('[data-testid="cadastrar-produtos"]').click()

    cy.get('h1').should('contain.text', 'Cadastro de Produtos')

    cy.xpath("//label[@for ='nome']/following-sibling::input[@id='nome']").should('be.enabled')
    cy.xpath("//label[@for ='price']/following-sibling::input[@id='price']").should('be.enabled')
    cy.xpath("//label[@for ='description']/following-sibling::textarea[@id='description']").should('be.enabled')
    cy.xpath("//label[@for ='quantity']/following-sibling::input[@id='quantity']").should('be.enabled')
    cy.xpath("//label[@for ='imagem']/following-sibling::input[@id='imagem']").should('be.enabled')
    cy.xpath("//button[@data-testid='cadastarProdutos']").should('be.enabled')
})