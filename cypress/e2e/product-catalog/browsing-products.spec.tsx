/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { ProductCatalog } from '../../page-objects/product-catalog';

describe('When browsing the product catalog', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()

    beforeEach(() => {
        login.credentials('standard_user', 'secret_sauce')
    });

    context('All six products should be displayed', () => {

        it('Should show titles for 6 products', () => {
            productCatalog.products().should('have.length', 6)
        })
    }) 

    context('The customer should be able to add any item to the cart', () => {

        it('Each product should have an Add To Cart button', () => {
            productCatalog.addToCartButtons().should('have.length', 6)
        }) 

        it('Adding an item to the cart should update the cart count', () => {
            
            productCatalog.addItem('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text','1')
            productCatalog.addToCartButtons().should('have.length',5)
            productCatalog.removeFromCartButtons().should('have.length',1)
        })

        it('Adding two items to the cart', () => {

            productCatalog.addItem('Sauce Labs Backpack')
            productCatalog.addItem('Sauce Labs Bike Light')

            productCatalog.shoppingCartBadge().should('contain.text','2')
        })

        it('Adding two items to the cart then removing one', () => {

            productCatalog.addItem('Sauce Labs Backpack')
            productCatalog.addItem('Sauce Labs Bike Light')

            productCatalog.removeItem('Sauce Labs Backpack')

            productCatalog.shoppingCartBadge().should('contain.text','1')
            productCatalog.addToCartButtons().should('have.length',5)
            productCatalog.removeFromCartButtons().should('have.length',1)
        })
    })
})

