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
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('tiago@tiagobernardes.com.br')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio quando preencido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Tiago')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('tiago@tiagobernardes.com.br')
    cy.get('#open-text-area').type('Teste!!!')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Tiago')
      .should('have.value', 'Tiago')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Bernardes')
      .should('have.value', 'Bernardes')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('tiago@tiagobernardes.com.br')
      .should('have.value', 'tiago@tiagobernardes.com.br')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('31999999999')
      .should('have.value', '31999999999')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})