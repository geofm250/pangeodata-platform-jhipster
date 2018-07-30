import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { OrderFormComponentsPage, OrderFormUpdatePage } from './order-form.page-object';

describe('OrderForm e2e test', () => {
    let navBarPage: NavBarPage;
    let orderFormUpdatePage: OrderFormUpdatePage;
    let orderFormComponentsPage: OrderFormComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderForms', () => {
        navBarPage.goToEntity('order-form');
        orderFormComponentsPage = new OrderFormComponentsPage();
        expect(orderFormComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.orderForm.home.title/);
    });

    it('should load create OrderForm page', () => {
        orderFormComponentsPage.clickOnCreateButton();
        orderFormUpdatePage = new OrderFormUpdatePage();
        expect(orderFormUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.orderForm.home.createOrEditLabel/);
        orderFormUpdatePage.cancel();
    });

    it('should create and save OrderForms', () => {
        orderFormComponentsPage.clickOnCreateButton();
        orderFormUpdatePage.setFormTypeInput('formType');
        expect(orderFormUpdatePage.getFormTypeInput()).toMatch('formType');
        orderFormUpdatePage.setInputInput('input');
        expect(orderFormUpdatePage.getInputInput()).toMatch('input');
        orderFormUpdatePage.setValidInput('valid');
        expect(orderFormUpdatePage.getValidInput()).toMatch('valid');
        orderFormUpdatePage.setNameInput('name');
        expect(orderFormUpdatePage.getNameInput()).toMatch('name');
        orderFormUpdatePage.save();
        expect(orderFormUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
