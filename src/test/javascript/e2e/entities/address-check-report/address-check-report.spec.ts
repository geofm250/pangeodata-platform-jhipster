import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { AddressCheckReportComponentsPage, AddressCheckReportUpdatePage } from './address-check-report.page-object';

describe('AddressCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let addressCheckReportUpdatePage: AddressCheckReportUpdatePage;
    let addressCheckReportComponentsPage: AddressCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AddressCheckReports', () => {
        navBarPage.goToEntity('address-check-report');
        addressCheckReportComponentsPage = new AddressCheckReportComponentsPage();
        expect(addressCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.addressCheckReport.home.title/);
    });

    it('should load create AddressCheckReport page', () => {
        addressCheckReportComponentsPage.clickOnCreateButton();
        addressCheckReportUpdatePage = new AddressCheckReportUpdatePage();
        expect(addressCheckReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.addressCheckReport.home.createOrEditLabel/);
        addressCheckReportUpdatePage.cancel();
    });

    it('should create and save AddressCheckReports', () => {
        addressCheckReportComponentsPage.clickOnCreateButton();
        addressCheckReportUpdatePage.setAddressVerifiedInput('addressVerified');
        expect(addressCheckReportUpdatePage.getAddressVerifiedInput()).toMatch('addressVerified');
        addressCheckReportUpdatePage.setIdAuthVerifiedByInput('idAuthVerifiedBy');
        expect(addressCheckReportUpdatePage.getIdAuthVerifiedByInput()).toMatch('idAuthVerifiedBy');
        addressCheckReportUpdatePage.setAddressVerifiedByInput('addressVerifiedBy');
        expect(addressCheckReportUpdatePage.getAddressVerifiedByInput()).toMatch('addressVerifiedBy');
        addressCheckReportUpdatePage.setAddressVerifiedDateInput('addressVerifiedDate');
        expect(addressCheckReportUpdatePage.getAddressVerifiedDateInput()).toMatch('addressVerifiedDate');
        addressCheckReportUpdatePage.setAddressRemarksInput('addressRemarks');
        expect(addressCheckReportUpdatePage.getAddressRemarksInput()).toMatch('addressRemarks');
        addressCheckReportUpdatePage.save();
        expect(addressCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
