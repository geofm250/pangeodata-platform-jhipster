import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { LicenseCheckReportComponentsPage, LicenseCheckReportUpdatePage } from './license-check-report.page-object';

describe('LicenseCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let licenseCheckReportUpdatePage: LicenseCheckReportUpdatePage;
    let licenseCheckReportComponentsPage: LicenseCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LicenseCheckReports', () => {
        navBarPage.goToEntity('license-check-report');
        licenseCheckReportComponentsPage = new LicenseCheckReportComponentsPage();
        expect(licenseCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.licenseCheckReport.home.title/);
    });

    it('should load create LicenseCheckReport page', () => {
        licenseCheckReportComponentsPage.clickOnCreateButton();
        licenseCheckReportUpdatePage = new LicenseCheckReportUpdatePage();
        expect(licenseCheckReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.licenseCheckReport.home.createOrEditLabel/);
        licenseCheckReportUpdatePage.cancel();
    });

    it('should create and save LicenseCheckReports', () => {
        licenseCheckReportComponentsPage.clickOnCreateButton();
        licenseCheckReportUpdatePage.setLicenseVerifiedInput('licenseVerified');
        expect(licenseCheckReportUpdatePage.getLicenseVerifiedInput()).toMatch('licenseVerified');
        licenseCheckReportUpdatePage.setLicRegistrationNumberInput('licRegistrationNumber');
        expect(licenseCheckReportUpdatePage.getLicRegistrationNumberInput()).toMatch('licRegistrationNumber');
        licenseCheckReportUpdatePage.setLicenseStatusInput('licenseStatus');
        expect(licenseCheckReportUpdatePage.getLicenseStatusInput()).toMatch('licenseStatus');
        licenseCheckReportUpdatePage.setLicVerifiedByInput('licVerifiedBy');
        expect(licenseCheckReportUpdatePage.getLicVerifiedByInput()).toMatch('licVerifiedBy');
        licenseCheckReportUpdatePage.setLicVerifiedDateInput('licVerifiedDate');
        expect(licenseCheckReportUpdatePage.getLicVerifiedDateInput()).toMatch('licVerifiedDate');
        licenseCheckReportUpdatePage.setLicRemarksInput('licRemarks');
        expect(licenseCheckReportUpdatePage.getLicRemarksInput()).toMatch('licRemarks');
        licenseCheckReportUpdatePage.save();
        expect(licenseCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
