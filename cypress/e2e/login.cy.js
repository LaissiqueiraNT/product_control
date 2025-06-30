describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/login.html')
  })

  it('Deve logar com sucesso', () => {
    cy.get('#email').type('admin@admin.com')
    cy.get('#senha').type('admin@123')
    cy.get('#btn-entrar').click()
    cy.url().should('include', 'produtos.html?teste=123')
  })

  it('Deve exibir erro com email incorreto', () => {
    cy.get('#email').type('errado@email.com')
    cy.get('#senha').type('admin@123')
    cy.get('#btn-entrar').click()
    cy.contains('E-mail ou senha inválidos').should('be.visible')
  })

  it('Deve exibir erro com senha incorreta', () => {
    cy.get('#email').type('admin@admin.com')
    cy.get('#senha').type('errado')
    cy.get('#btn-entrar').click()
    cy.contains('E-mail ou senha inválidos').should('be.visible')
  })

  it('Deve exigir preenchimento dos campos', () => {
    cy.get('#btn-entrar').click()
    cy.contains('Informe usuário e senha, os campos não podem ser brancos.').should('be.visible')
  })
})