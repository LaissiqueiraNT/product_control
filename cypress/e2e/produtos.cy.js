// cypress/e2e/produtos.cy.js

describe('Cadastro de Produtos', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/login.html')
    cy.get('#email').type('admin@admin.com')
    cy.get('#senha').type('admin@123')
    cy.get('#btn-entrar').click()
    cy.url().should('include', 'produtos.html')
  })

  it('Deve abrir o modal de cadastro', () => {
    cy.get('#btn-adicionar').click()
    cy.get('#cadastro-produto').should('be.visible')
  })

  it('Deve mostrar erro ao tentar salvar vazio', () => {
    cy.get('#btn-adicionar').click()
    cy.get('#btn-salvar').click()
    cy.contains('Todos os campos são obrigatórios para o cadastro!').should('be.visible')
  })

  it('Deve cadastrar um produto com sucesso', () => {
    cy.get('#btn-adicionar').click()
    cy.get('#codigo').type('123')
    cy.get('#nome').type('Mouse Gamer')
    cy.get('#quantidade').type('10')
    cy.get('#valor').type('199.90')
    cy.get('#data').type('2024-06-30')
    cy.get('#btn-salvar').click()
    cy.get('table tbody tr').should('contain', 'Mouse Gamer')
  })

  it('Deve limpar e fechar modal ao clicar em sair', () => {
    cy.get('#btn-adicionar').click()
    cy.get('#codigo').type('000')
    cy.get('#btn-sair').click()
    cy.get('#cadastro-produto').should('not.be.visible')
  })

  it('Deve tentar cadastrar com valor inválido', () => {
    cy.get('#btn-adicionar').click()
    cy.get('#codigo').type('321')
    cy.get('#nome').type('Teclado')
    cy.get('#quantidade').type('5')
    cy.get('#valor').type('abc')
    cy.get('#data').type('2024-06-30')
    cy.get('#btn-salvar').click()
    cy.contains('Todos os campos são obrigatórios para o cadastro!').should('be.visible')
  })
})
