/// <reference types="cypress" />

describe('e2e tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const typeOnCell = (cell: string, value: string) => {
    cy.get(`[data-testid="edit-btn-${cell}"]`).click()
    cy.get(`[data-testid="input-cell-${cell}"]`).clear()
    cy.get(`[data-testid="input-cell-${cell}"]`).type(value)
    cy.get(`[data-testid="input-cell-${cell}"]`).blur()
    cy.get(`[data-testid="input-cell-${cell}"]`).should('have.value', value)
  }

  it('should be able to add row', () => {
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })

    cy.get('[data-testid="table-rows"]').children().should('have.length', 3)
  })

  it('should be able to remove row', () => {
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })

    cy.get('[data-testid="remove-row-btn"]').click({ force: true })

    cy.get('[data-testid="table-rows"]').children().should('have.length', 1)
  })

  it('should be able to do calculations', () => {
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })

    typeOnCell('A1', '10')
    typeOnCell('B1', '10')
    typeOnCell('C1', '10')

    typeOnCell('A2', '20')
    typeOnCell('B2', '20')
    typeOnCell('C2', '20')

    typeOnCell('A3', '30')
    typeOnCell('B3', '30')
    typeOnCell('C3', '30')

    typeOnCell('A2', '=A1+B2')
    cy.get('[data-testid="input-cell-A2"]').should('have.value', '30')
    typeOnCell('B2', '=C3/B1')
    cy.get('[data-testid="input-cell-B2"]').should('have.value', '3')
    cy.get('[data-testid="input-cell-A2"]').should('have.value', '13')
    typeOnCell('C1', '=B3*A1+A3/C3')
    cy.get('[data-testid="input-cell-C1"]').should('have.value', '301')
    typeOnCell('A3', '=A2+B2')
    cy.get('[data-testid="input-cell-A3"]').should('have.value', '16')
  })

  it('should not be able to reference own cell', () => {
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })

    typeOnCell('A1', '10')
    typeOnCell('B1', '10')
    typeOnCell('C1', '10')

    typeOnCell('A2', '20')
    typeOnCell('B2', '20')
    typeOnCell('C2', '20')

    typeOnCell('A3', '30')
    typeOnCell('B3', '30')
    typeOnCell('C3', '30')

    typeOnCell('B2', '=B2')

    cy.get('[data-testid="cell-B2"]')
      .should('have.attr', 'class')
      .and('contain', 'border-[#AF3434]')
  })

  it('should not be able to reference a cell that references the current cell', () => {
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })

    typeOnCell('A1', '10')
    typeOnCell('B1', '10')
    typeOnCell('C1', '10')

    typeOnCell('A2', '20')
    typeOnCell('B2', '20')
    typeOnCell('C2', '20')

    typeOnCell('A3', '30')
    typeOnCell('B3', '30')
    typeOnCell('C3', '30')

    typeOnCell('A2', '=B2+A1')
    typeOnCell('B2', '=A2+C1')

    cy.get('[data-testid="cell-B2"]')
      .should('have.attr', 'class')
      .and('contain', 'border-[#AF3434]')
  })

  it('should display error o cell when referencing a cell which row was removed', () => {
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })
    cy.get('[data-testid="add-row-btn"]').click({ force: true })

    typeOnCell('A1', '10')
    typeOnCell('B1', '10')
    typeOnCell('C1', '10')

    typeOnCell('A2', '20')
    typeOnCell('B2', '20')
    typeOnCell('C2', '20')

    typeOnCell('A3', '30')
    typeOnCell('B3', '30')
    typeOnCell('C3', '30')

    typeOnCell('A1', '=B2')
    typeOnCell('B2', '=C3')

    cy.get('[data-testid="remove-row-btn"]').click({ force: true })

    cy.get('[data-testid="cell-B2"]')
      .should('have.attr', 'class')
      .and('contain', 'border-[#AF3434]')

    cy.get('[data-testid="remove-row-btn"]').click({ force: true })

    cy.get('[data-testid="cell-A1"]')
      .should('have.attr', 'class')
      .and('contain', 'border-[#AF3434]')
  })
})
