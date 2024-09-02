describe('API', () => {
  it('Login', () => {
    cy.request({
      method: 'POST',
      url: "/login",
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).as("response")
  })
})