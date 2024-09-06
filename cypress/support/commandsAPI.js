Cypress.Commands.add('getToken',(user,senha) => {
    cy.request({
        method:'POST',
        url:'/login',
        body:{
            "email":user,
            "password":senha
        }
    }).its('body.authorization').should('not.be.empty')
    .then(auth => {
        Cypress.env('auth',auth)
        return auth
    })
})

Cypress.Commands.overwrite('request',(originalFn, ...options) => {
    if(options.length == 1){
        if(Cypress.env('auth')){
            options[0].headers = {
                Authorization: `${Cypress.env('auth')}`
        }
    }
 }

    return originalFn(...options)
})