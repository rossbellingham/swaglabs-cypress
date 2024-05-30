export class ProductCatalog {

    products() { return cy.get('.inventory_item_name') }

    addToCartButtons() { return cy.get('[data-test^=add-to-cart]') }

    addItem(product) {
        cy.contains('.inventory_item', product).contains('Add to cart').click()
    }

    removeItem(product) {
        cy.contains('.inventory_item', product).contains('Remove').click()
    }

    removeFromCartButtons() { return cy.get('[data-test^=remove]') }

    shoppingCartBadge() { return cy.get('.shopping_cart_badge') }
}