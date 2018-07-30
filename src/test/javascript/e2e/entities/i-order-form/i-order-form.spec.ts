import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { IOrderFormComponentsPage, IOrderFormUpdatePage } from './i-order-form.page-object';

describe('IOrderForm e2e test', () => {
    let navBarPage: NavBarPage;
    let iOrderFormUpdatePage: IOrderFormUpdatePage;
    let iOrderFormComponentsPage: IOrderFormComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load IOrderForms', () => {
        navBarPage.goToEntity('i-order-form');
        iOrderFormComponentsPage = new IOrderFormComponentsPage();
        expect(iOrderFormComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.iOrderForm.home.title/);
    });

    it('should load create IOrderForm page', () => {
        iOrderFormComponentsPage.clickOnCreateButton();
        iOrderFormUpdatePage = new IOrderFormUpdatePage();
        expect(iOrderFormUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.iOrderForm.home.createOrEditLabel/);
        iOrderFormUpdatePage.cancel();
    });

    it('should create and save IOrderForms', () => {
        iOrderFormComponentsPage.clickOnCreateButton();
        iOrderFormUpdatePage.save();
        expect(iOrderFormUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
