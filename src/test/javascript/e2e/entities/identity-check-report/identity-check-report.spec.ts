import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { IdentityCheckReportComponentsPage, IdentityCheckReportUpdatePage } from './identity-check-report.page-object';

describe('IdentityCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let identityCheckReportUpdatePage: IdentityCheckReportUpdatePage;
    let identityCheckReportComponentsPage: IdentityCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load IdentityCheckReports', () => {
        navBarPage.goToEntity('identity-check-report');
        identityCheckReportComponentsPage = new IdentityCheckReportComponentsPage();
        expect(identityCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.identityCheckReport.home.title/);
    });

    it('should load create IdentityCheckReport page', () => {
        identityCheckReportComponentsPage.clickOnCreateButton();
        identityCheckReportUpdatePage = new IdentityCheckReportUpdatePage();
        expect(identityCheckReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.identityCheckReport.home.createOrEditLabel/);
        identityCheckReportUpdatePage.cancel();
    });

    it('should create and save IdentityCheckReports', () => {
        identityCheckReportComponentsPage.clickOnCreateButton();
        identityCheckReportUpdatePage.setIdVerifiedInput('idVerified');
        expect(identityCheckReportUpdatePage.getIdVerifiedInput()).toMatch('idVerified');
        identityCheckReportUpdatePage.setIdAuthVerifiedByInput('idAuthVerifiedBy');
        expect(identityCheckReportUpdatePage.getIdAuthVerifiedByInput()).toMatch('idAuthVerifiedBy');
        identityCheckReportUpdatePage.setIdVerifiedDateInput('idVerifiedDate');
        expect(identityCheckReportUpdatePage.getIdVerifiedDateInput()).toMatch('idVerifiedDate');
        identityCheckReportUpdatePage.setIdRemarksInput('idRemarks');
        expect(identityCheckReportUpdatePage.getIdRemarksInput()).toMatch('idRemarks');
        identityCheckReportUpdatePage.save();
        expect(identityCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
