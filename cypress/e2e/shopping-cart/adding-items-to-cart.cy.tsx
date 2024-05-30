/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { ProductCatalog } from '../../page-objects/product-catalog';
import { ShoppingCart } from '../../page-objects/shopping-cart';

describe('When placing items in the cart', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()
    const shoppingCart = new ShoppingCart()

    beforeEach(() => {
        login.credentials('standard_user', 'secret_sauce')
    })

    context('Adding a single item', () => {

        beforeEach( () => {
            productCatalog.addItem('Sauce Labs Backpack')
            shoppingCart.open()
        })

        it('should show the name of the item in the cart', () => {

            shoppingCart.items()
                .should('have.length', 1)
                .eq(0)
                .should('contain.text','Sauce Labs Backpack')
        })  
        
        it ('should show the price', () => {
            shoppingCart.itemPrice('Sauce Labs Backpack').should('contain.text', '$29.99')
        })

        it ('should show the description', () => {
            shoppingCart.itemDescription('Sauce Labs Backpack').should('contain.text', 'carry.allTheThings()')
        })

        it ('should show the quantity', () => {
            shoppingCart.itemQuantity('Sauce Labs Backpack').should('contain.text', '1')
        })
    })

    context('Adding several items', () => {

        it('Should show the details of the item in the cart', () => {

            productCatalog.addItem('Sauce Labs Backpack')
            productCatalog.addItem('Sauce Labs Bolt T-Shirt')

            shoppingCart.open()

            shoppingCart.items().should('have.length', 2)

            shoppingCart.items().eq(0).should('contain.text','Sauce Labs Backpack')
            shoppingCart.items().eq(1).should('contain.text','Bolt T-Shirt')

        })
    })

    context('Removing items from the cart', () => {

        beforeEach( () => {
            productCatalog.addItem('Sauce Labs Backpack')
            productCatalog.addItem('Sauce Labs Bolt T-Shirt')

            shoppingCart.open()
        })

        it('Should be removed from the cart list', () => {

            shoppingCart.removeButtonFor('Sauce Labs Backpack').click()

            shoppingCart.items()
                        .should('have.length', 1)
                        .eq(0)
                        .should('contain.text','Sauce Labs Bolt T-Shirt')
        })
    })
})