export class LoginPage {

    errorMessage() { return cy.get('[data-test=error]') }

    loginGraphic() { return cy.get('.bot_column') }

    urlShouldBe(url) { return cy.url().should('eq', url) }
}