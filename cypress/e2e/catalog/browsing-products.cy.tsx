/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { Catalog } from '../../page-objects/catalog';

describe('When browsing the catalog', () => {

    const login = new LoginAction()
    const catalog = new Catalog()

    beforeEach(() => {
        login.credentials('standard_user', 'secret_sauce')
    });

    context('All six products should be displayed', () => {

        it('Should show titles for 6 products', () => {
            catalog.productTitles().should('have.length', 6)
        })

        it('Should show descriptions for 6 products', () => {
            catalog.productDescriptions().should('have.length', 6)
        })

        it('Should show prices for 6 products', () => {
            catalog.productPrices().should('have.length', 12)
        })
    }) 

    context('The customer should be able to add any item to the cart', () => {

        it('Each product should have an Add To Cart button', () => {
            catalog.addToCartButtons().should('have.length', 6)
        }) 

        it('Adding an item to the cart should update the cart count', () => {            
            catalog.addItem('Sauce Labs Backpack')

            catalog.shoppingCartBadge().should('contain.text','1')
            catalog.addToCartButtons().should('have.length',5)
            catalog.removeFromCartButtons().should('have.length',1)
        })

        it('Adding two items to the cart', () => {
            catalog.addItem('Sauce Labs Backpack')
            catalog.addItem('Sauce Labs Bike Light')

            catalog.shoppingCartBadge().should('contain.text','2')
        })

        it('Adding two items to the cart then removing one', () => {
            catalog.addItem('Sauce Labs Backpack')
            catalog.addItem('Sauce Labs Bike Light')

            catalog.removeItem('Sauce Labs Backpack')

            catalog.shoppingCartBadge().should('contain.text','1')
            catalog.addToCartButtons().should('have.length',5)
            catalog.removeFromCartButtons().should('have.length',1)
        })
    })

    context('Ordering products based on selected field', () => {

        it('Should select "Name (A to Z)" value from dropdown', () => {
            catalog.orderAz().should('have.value', 'az')
        })

        it('Should select "Name (Z to A)" value from dropdown', () => {
            catalog.orderZa().should('have.value', 'za')
        })

        it('Should select "Price (low to high)" value from dropdown', () => {
            catalog.orderLohi().should('have.value', 'lohi')
        })

        it('Should select "Price (high to low)" value from dropdown', () => {
            catalog.orderHilo().should('have.value', 'hilo')
        })

        it('Should order items using "Name (Z to A)" ordering', () => {
            catalog.orderZa()

            catalog.productTitles().eq(0).should('contain.text', 'Test.allTheThings() T-Shirt (Red)')
            catalog.productTitles().eq(1).should('contain.text', 'Sauce Labs Onesie')
            catalog.productTitles().eq(2).should('contain.text', 'Sauce Labs Fleece Jacket')
            catalog.productTitles().eq(3).should('contain.text', 'Sauce Labs Bolt T-Shirt')
            catalog.productTitles().eq(4).should('contain.text', 'Sauce Labs Bike Light')
            catalog.productTitles().eq(5).should('contain.text', 'Sauce Labs Backpack')
        })
    })
})

