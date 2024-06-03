/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { PageHeader } from '../../page-objects/page-header';
import { Catalog } from '../../page-objects/catalog';

describe('Clicking sidebar-menu buttons: "Close Menu", "All Items", "About", and "Reset App State"', () => {

    const login = new LoginAction()
    const header = new PageHeader()
    const catalog = new Catalog()

    beforeEach(() => {
        login.credentials('standard_user', 'secret_sauce')
    })

    context('Opening and closing sidebar-menu', () => {

        it('Opens the sidebar-menu', () => {
            header.openSidebarmenu()

            header.sidebarListContainer().children().should('have.length', 4)
        })

        it('Closes the sidebar-menu', () => {
            header.openSidebarmenu()

            header.sidebarListContainer().children().should('have.length', 4)

            header.closeSidebarmenu()

            header.sidebarListContainer().should('not.be.visible')
            header.sidebarOverlay().should('have.css', 'transform')
        })
    })

    context('Clicking "All Items"', () => {

        it('Hides the sidebar-menu revealing the product catalog', () => {
            header.openSidebarmenu()
            header.sidebarListContainer().should('be.visible')
            header.sidebarItem('All Items')

            catalog.productTitles().should('have.length', 6)
            catalog.productDescriptions().should('have.length', 6)
            catalog.productPrices().should('have.length', 6)
            header.sidebarOverlay().should('have.css', 'transform')
            header.sidebarListContainer().should('not.be.visible')
        })
    })

    context('Clicking "About"', () => {
        
        it('Navigates to saucelabs.com', () => {
            header.openSidebarmenu()

            header.aboutUrl().then(url => {
                cy.request(url!).should((response) => {
                    expect(response.status).to.eq(200)
                })
            })
        })
    })

    context('Clicking "Reset App State"', () => {

        it('Clears cart items', () => {
            catalog.addItem('Sauce Labs Backpack')
            catalog.addItem('Sauce Labs Bike Light')

            catalog.shoppingCartBadge().should('contain.text','2')

            header.openSidebarmenu()
            header.sidebarItem('Reset App State')
            header.closeSidebarmenu()

            catalog.shoppingCartBadge().should('not.exist')
        })
    })
})