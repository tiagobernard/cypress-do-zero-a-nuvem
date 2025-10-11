//LESSON 1
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //LESSON 2
  it('preenche os campos obrigatórios e envia o formulário.', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvxz', 10)
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('tiago@tiagobernardes.com.br')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('.button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('tiago@tiagobernardes,com.br')
    cy.get('.button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preencido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('tiago@tiagobernardes.com.br')
    cy.get('#open-text-area').type('Teste!!!')
    cy.get('#phone-checkbox').click()
    cy.get('.button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
})