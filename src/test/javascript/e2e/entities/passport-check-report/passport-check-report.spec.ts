import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { PassportCheckReportComponentsPage, PassportCheckReportUpdatePage } from './passport-check-report.page-object';

describe('PassportCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let passportCheckReportUpdatePage: PassportCheckReportUpdatePage;
    let passportCheckReportComponentsPage: PassportCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load PassportCheckReports', () => {
        navBarPage.goToEntity('passport-check-report');
        passportCheckReportComponentsPage = new PassportCheckReportComponentsPage();
        expect(passportCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.passportCheckReport.home.title/);
    });

    it('should load create PassportCheckReport page', () => {
        passportCheckReportComponentsPage.clickOnCreateButton();
        passportCheckReportUpdatePage = new PassportCheckReportUpdatePage();
        expect(passportCheckReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.passportCheckReport.home.createOrEditLabel/);
        passportCheckReportUpdatePage.cancel();
    });

    it('should create and save PassportCheckReports', () => {
        passportCheckReportComponentsPage.clickOnCreateButton();
        passportCheckReportUpdatePage.setPassportVerifiedInput('passportVerified');
        expect(passportCheckReportUpdatePage.getPassportVerifiedInput()).toMatch('passportVerified');
        passportCheckReportUpdatePage.setDocumentAuthenticityVerifiedByInput('documentAuthenticityVerifiedBy');
        expect(passportCheckReportUpdatePage.getDocumentAuthenticityVerifiedByInput()).toMatch('documentAuthenticityVerifiedBy');
        passportCheckReportUpdatePage.setDocumentAuthenticityVerifiedDateInput('documentAuthenticityVerifiedDate');
        expect(passportCheckReportUpdatePage.getDocumentAuthenticityVerifiedDateInput()).toMatch('documentAuthenticityVerifiedDate');
        passportCheckReportUpdatePage.setDocumentAuthenticityRemarksInput('documentAuthenticityRemarks');
        expect(passportCheckReportUpdatePage.getDocumentAuthenticityRemarksInput()).toMatch('documentAuthenticityRemarks');
        passportCheckReportUpdatePage.save();
        expect(passportCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
