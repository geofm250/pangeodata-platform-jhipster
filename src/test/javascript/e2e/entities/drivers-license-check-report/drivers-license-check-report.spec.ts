import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DriversLicenseCheckReportComponentsPage, DriversLicenseCheckReportUpdatePage } from './drivers-license-check-report.page-object';

describe('DriversLicenseCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let driversLicenseCheckReportUpdatePage: DriversLicenseCheckReportUpdatePage;
    let driversLicenseCheckReportComponentsPage: DriversLicenseCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DriversLicenseCheckReports', () => {
        navBarPage.goToEntity('drivers-license-check-report');
        driversLicenseCheckReportComponentsPage = new DriversLicenseCheckReportComponentsPage();
        expect(driversLicenseCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.driversLicenseCheckReport.home.title/);
    });

    it('should load create DriversLicenseCheckReport page', () => {
        driversLicenseCheckReportComponentsPage.clickOnCreateButton();
        driversLicenseCheckReportUpdatePage = new DriversLicenseCheckReportUpdatePage();
        expect(driversLicenseCheckReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.driversLicenseCheckReport.home.createOrEditLabel/
        );
        driversLicenseCheckReportUpdatePage.cancel();
    });

    it('should create and save DriversLicenseCheckReports', () => {
        driversLicenseCheckReportComponentsPage.clickOnCreateButton();
        driversLicenseCheckReportUpdatePage.setDriversLicenseVerifiedInput('driversLicenseVerified');
        expect(driversLicenseCheckReportUpdatePage.getDriversLicenseVerifiedInput()).toMatch('driversLicenseVerified');
        driversLicenseCheckReportUpdatePage.setDriversLicenseNumberInput('driversLicenseNumber');
        expect(driversLicenseCheckReportUpdatePage.getDriversLicenseNumberInput()).toMatch('driversLicenseNumber');
        driversLicenseCheckReportUpdatePage.setDriversLicenseStatusInput('driversLicenseStatus');
        expect(driversLicenseCheckReportUpdatePage.getDriversLicenseStatusInput()).toMatch('driversLicenseStatus');
        driversLicenseCheckReportUpdatePage.setDriverLicenseVerifiedByInput('driverLicenseVerifiedBy');
        expect(driversLicenseCheckReportUpdatePage.getDriverLicenseVerifiedByInput()).toMatch('driverLicenseVerifiedBy');
        driversLicenseCheckReportUpdatePage.setDriversLicenseVerifiedDateInput('driversLicenseVerifiedDate');
        expect(driversLicenseCheckReportUpdatePage.getDriversLicenseVerifiedDateInput()).toMatch('driversLicenseVerifiedDate');
        driversLicenseCheckReportUpdatePage.setDriversLicenseRemarksInput('driversLicenseRemarks');
        expect(driversLicenseCheckReportUpdatePage.getDriversLicenseRemarksInput()).toMatch('driversLicenseRemarks');
        driversLicenseCheckReportUpdatePage.save();
        expect(driversLicenseCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
