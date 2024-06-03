export class PageHeader {

    title() { return cy.get('.product_label') }

    openSidebarmenu() { return cy.get('.bm-burger-button').contains('Open Menu').click() }

    closeSidebarmenu() { return cy.get('.bm-cross-button').contains('Close Menu').click() }

    sidebarListContainer() { return cy.get('.bm-item-list') }

    sidebarItem(item) { return cy.contains('a', item).click() }

    sidebarOverlay() { return cy.get('.bm-overlay') }

    urlShouldBe(url) { return cy.url().should('contain', url) }

    aboutUrl() { return cy.get('#about_sidebar_link').invoke('attr', 'href') }
}