export class Catalog {

    productTitles() { return cy.get('.inventory_item_name') }

    productDescriptions() { return cy.get('.inventory_item_desc') }

    productPrices() { return cy.get('.inventory_item_price') }

    addToCartButtons() { return cy.get('[data-test^=add-to-cart]') }

    addItem(product) {
        cy.contains('.inventory_item', product).contains('ADD TO CART').click()
    }

    removeItem(product) {
        cy.contains('.inventory_item', product).contains('REMOVE').click()
    }

    removeFromCartButtons() { return cy.get('[data-test^=remove]') }

    shoppingCartBadge() { return cy.get('.shopping_cart_badge') }

    orderAz() { return cy.get('.product_sort_container').select('Name (A to Z)') }

    orderZa() { return cy.get('.product_sort_container').select('Name (Z to A)') }

    orderLohi() { return cy.get('.product_sort_container').select('Price (low to high)') }

    orderHilo() { return cy.get('.product_sort_container').select('Price (high to low)') }
}
