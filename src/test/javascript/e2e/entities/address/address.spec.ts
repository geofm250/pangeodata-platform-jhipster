import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AddressComponentsPage, AddressUpdatePage } from './address.page-object';

describe('Address e2e test', () => {
    let navBarPage: NavBarPage;
    let addressUpdatePage: AddressUpdatePage;
    let addressComponentsPage: AddressComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.address.home.title/);
    });

    it('should load create Address page', () => {
        addressComponentsPage.clickOnCreateButton();
        addressUpdatePage = new AddressUpdatePage();
        expect(addressUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.address.home.createOrEditLabel/);
        addressUpdatePage.cancel();
    });

    it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressUpdatePage.setCurrentInput('current');
        expect(addressUpdatePage.getCurrentInput()).toMatch('current');
        addressUpdatePage.setStartDateInput('startDate');
        expect(addressUpdatePage.getStartDateInput()).toMatch('startDate');
        addressUpdatePage.setCountryInput('country');
        expect(addressUpdatePage.getCountryInput()).toMatch('country');
        addressUpdatePage.setEndDateInput('endDate');
        expect(addressUpdatePage.getEndDateInput()).toMatch('endDate');
        addressUpdatePage.setTownInput('town');
        expect(addressUpdatePage.getTownInput()).toMatch('town');
        addressUpdatePage.setAddress1Input('address1');
        expect(addressUpdatePage.getAddress1Input()).toMatch('address1');
        addressUpdatePage.setAddress2Input('address2');
        expect(addressUpdatePage.getAddress2Input()).toMatch('address2');
        addressUpdatePage.setPostalCodeInput('postalCode');
        expect(addressUpdatePage.getPostalCodeInput()).toMatch('postalCode');
        addressUpdatePage.setProvinceInput('province');
        expect(addressUpdatePage.getProvinceInput()).toMatch('province');
        addressUpdatePage.save();
        expect(addressUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
