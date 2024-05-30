/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { LoginPage } from '../../page-objects/login-page';
import { PageHeader } from '../../page-objects/page-header';

describe('Logging in', () => {

    const login = new LoginAction()
    const loginPage = new LoginPage()
    const pageHeader = new PageHeader()

    context('With a valid user account', () => {

        it('With valid credentials', () => {
            login.credentials('standard_user','secret_sauce')

            pageHeader.title().should('have.text', 'Products')
        })

        it('With an incorrect username', () => {
            login.credentials('INCORRECT','secret_sauce')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With an incorrect password', () => {
            login.credentials('standard_user','INCORRECT')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })
    })

    context('With a locked account', () => {

        it('With locked user credentials', () => {
            login.credentials('locked_out_user','secret_sauce')

            loginPage.errorMessage().should('contain', 'Sorry, this user has been locked out.')   
        })
    })

    context('Using special characters', () => {

        it('With an empty username', () => {

        })

        it('With an empty password', () => {
            
        })

        it('With a single-space username', () => {
            
        })

        it('With a single-space password', () => {
            
        })
    })
})