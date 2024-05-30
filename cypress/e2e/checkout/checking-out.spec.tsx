/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { CheckoutConfirmation } from '../../page-objects/checkout-confirmation';
import { CheckoutInformation } from '../../page-objects/checkout-information';
import { CheckoutOverview } from '../../page-objects/checkout-overview';
import { ProductCatalog } from '../../page-objects/product-catalog';
import { ShoppingCart } from '../../page-objects/shopping-cart';

describe('Adding items to cart', () => {

    const login = new LoginAction()
    const productCatalog = new ProductCatalog()
    const shoppingCart = new ShoppingCart()
    const checkoutInformation = new CheckoutInformation()
    const checkoutOverview = new CheckoutOverview()
    const checkoutConfirmation = new CheckoutConfirmation()

    beforeEach(() => {

        login.credentials('standard_user', 'secret_sauce')

        productCatalog.addItem('Sauce Labs Backpack')
        productCatalog.addItem('Sauce Labs Bolt T-Shirt')

        shoppingCart.open()
    })

    context('Checking out with items in the cart', () => {

        beforeEach(() => {
            shoppingCart.checkout()
        })

        it('Tries to checkout with missing personal information', () => {

            checkoutInformation.formData('', '', '')
            
            checkoutInformation.error().should('be.visible')
        })

        it('Shows cart items in overview', () => {

            checkoutInformation.formData('Sally','Shopper','ABC123')
            
            checkoutOverview.items().should('have.length',2)
        })        

        it('Displays correct message after checkout', () => {

            checkoutInformation.formData('Sally','Shopper','ABC123')            
            checkoutOverview.finishCheckout()

            checkoutConfirmation.message().should('contain','THANK YOU FOR YOUR ORDER')
        })        
    })
})