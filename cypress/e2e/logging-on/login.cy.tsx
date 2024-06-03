/// <reference types='cypress'/>

import { LoginAction } from '../../actions/login';
import { LoginPage } from '../../page-objects/login-page';
import { PageHeader } from '../../page-objects/page-header';

const login = new LoginAction()
const loginPage = new LoginPage()
const pageHeader = new PageHeader()

describe('Logging in', () => {

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

        it.skip('With an empty username', () => {
            login.credentials('','secret_sauce')

            loginPage.errorMessage().should('contain', 'Epic sadface: Username is required') 
        })

        it.skip('With an empty password', () => {
            login.credentials('standard_user','')

            loginPage.errorMessage().should('contain', 'Epic sadface: Password is required') 
        })

        it('With a single-space username', () => {
            login.credentials(' ','secret_sauce')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With standard_user and single-space password', () => {
            login.credentials('standard_user',' ')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With locked_out_user and single-space password', () => {
            login.credentials('locked_out_user',' ')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With problem_user and single-space password', () => {
            login.credentials('problem_user',' ')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })

        it('With performance_glitch_user and single-space password', () => {
            login.credentials('performance_glitch_user',' ')

            loginPage.errorMessage().should('contain', 'Username and password do not match any user')
        })
    })
})

describe('Logging out', () => {

    beforeEach(() => {
        login.credentials('standard_user', 'secret_sauce')
        pageHeader.openSidebarmenu()
    })

    context('Logout clicked from sidebar menu within inventory.html', () => {

        it('Should logout and navigate back to landing page', () => {

            pageHeader.sidebarListContainer().should('have.length', 1)
            pageHeader.sidebarItem('Logout')

            loginPage.loginGraphic().should('be.visible')
            pageHeader.urlShouldBe('https://www.saucedemo.com/v1/index.html')
        })
    })
})