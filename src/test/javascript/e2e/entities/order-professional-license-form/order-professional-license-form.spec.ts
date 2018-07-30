import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    OrderProfessionalLicenseFormComponentsPage,
    OrderProfessionalLicenseFormUpdatePage
} from './order-professional-license-form.page-object';

describe('OrderProfessionalLicenseForm e2e test', () => {
    let navBarPage: NavBarPage;
    let orderProfessionalLicenseFormUpdatePage: OrderProfessionalLicenseFormUpdatePage;
    let orderProfessionalLicenseFormComponentsPage: OrderProfessionalLicenseFormComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load OrderProfessionalLicenseForms', () => {
        navBarPage.goToEntity('order-professional-license-form');
        orderProfessionalLicenseFormComponentsPage = new OrderProfessionalLicenseFormComponentsPage();
        expect(orderProfessionalLicenseFormComponentsPage.getTitle()).toMatch(
            /pangeodataJHipsterApp.orderProfessionalLicenseForm.home.title/
        );
    });

    it('should load create OrderProfessionalLicenseForm page', () => {
        orderProfessionalLicenseFormComponentsPage.clickOnCreateButton();
        orderProfessionalLicenseFormUpdatePage = new OrderProfessionalLicenseFormUpdatePage();
        expect(orderProfessionalLicenseFormUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.orderProfessionalLicenseForm.home.createOrEditLabel/
        );
        orderProfessionalLicenseFormUpdatePage.cancel();
    });

    it('should create and save OrderProfessionalLicenseForms', () => {
        orderProfessionalLicenseFormComponentsPage.clickOnCreateButton();
        orderProfessionalLicenseFormUpdatePage.setNameOfLicenseInput('nameOfLicense');
        expect(orderProfessionalLicenseFormUpdatePage.getNameOfLicenseInput()).toMatch('nameOfLicense');
        orderProfessionalLicenseFormUpdatePage.setTownInput('town');
        expect(orderProfessionalLicenseFormUpdatePage.getTownInput()).toMatch('town');
        orderProfessionalLicenseFormUpdatePage.setLicenseInstitutionInput('licenseInstitution');
        expect(orderProfessionalLicenseFormUpdatePage.getLicenseInstitutionInput()).toMatch('licenseInstitution');
        orderProfessionalLicenseFormUpdatePage.save();
        expect(orderProfessionalLicenseFormUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
