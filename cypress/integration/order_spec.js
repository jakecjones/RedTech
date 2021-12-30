const BASE_URL = 'http://localhost:3000'

describe('Testing order steps', () => {
    it('Can add new order', () => {
        cy.visit(BASE_URL)

        cy.get('.MuiButton-root')
        .click()

        cy.get('.mb-1 > .MuiInputBase-root > .MuiInputBase-input')
        .type('automated-business-test')

        cy.get('.MuiDialogContentText-root > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiSelect-select')
        .click()

        cy.get('[data-value="SaleOrder"]')
        .click()

        cy.get('.MuiDialogActions-root > .MuiButton-contained')
        .click()

        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(6)')
        .should('contain', 'automated-business-test')
    })

    it('Can delete all orders', () => {
        cy.visit(BASE_URL)

        cy.get('.orders__list-actions > .MuiCheckbox-root > .PrivateSwitchBase-input')
        .click()

        cy.get('[data-testid="DeleteIcon"]')
        .click()

        cy.get('.no-results')

    })

    it('Can add new order', () => {
        cy.visit(BASE_URL)

        cy.get('.MuiButton-root')
        .click()

        cy.get('.mb-1 > .MuiInputBase-root > .MuiInputBase-input')
        .type('automated-business-test')

        cy.get('.MuiDialogContentText-root > .MuiFormControl-root > .MuiOutlinedInput-root > .MuiSelect-select')
        .click()

        cy.get('[data-value="SaleOrder"]')
        .click()

        cy.get('.MuiDialogActions-root > .MuiButton-contained')
        .click()

        cy.get('.MuiTableBody-root > .MuiTableRow-root > :nth-child(6)')
        .should('contain', 'automated-business-test')
    })

    it('Can delete single order', () => {
        cy.visit(BASE_URL)

        cy.get('.MuiTableBody-root > :nth-child(1) > :nth-child(1) > .MuiCheckbox-root > .PrivateSwitchBase-input')
        .click()

        cy.get('[data-testid="DeleteIcon"]')
        .click()

        cy.get('.no-results')
    })
  })