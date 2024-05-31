export class PageHeader {

    title() { return cy.get('.product_label') }

    openSidemenu() { return cy.get('.bm-burger-button').contains('Open Menu').click() }

    sidebarList() { return cy.get('.bm-item-list') }

    sidebarItem(item) { return cy.contains('a', item).click() }
}