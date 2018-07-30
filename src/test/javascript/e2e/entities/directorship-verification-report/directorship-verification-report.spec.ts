import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    DirectorshipVerificationReportComponentsPage,
    DirectorshipVerificationReportUpdatePage
} from './directorship-verification-report.page-object';

describe('DirectorshipVerificationReport e2e test', () => {
    let navBarPage: NavBarPage;
    let directorshipVerificationReportUpdatePage: DirectorshipVerificationReportUpdatePage;
    let directorshipVerificationReportComponentsPage: DirectorshipVerificationReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DirectorshipVerificationReports', () => {
        navBarPage.goToEntity('directorship-verification-report');
        directorshipVerificationReportComponentsPage = new DirectorshipVerificationReportComponentsPage();
        expect(directorshipVerificationReportComponentsPage.getTitle()).toMatch(
            /pangeodataJHipsterApp.directorshipVerificationReport.home.title/
        );
    });

    it('should load create DirectorshipVerificationReport page', () => {
        directorshipVerificationReportComponentsPage.clickOnCreateButton();
        directorshipVerificationReportUpdatePage = new DirectorshipVerificationReportUpdatePage();
        expect(directorshipVerificationReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.directorshipVerificationReport.home.createOrEditLabel/
        );
        directorshipVerificationReportUpdatePage.cancel();
    });

    it('should create and save DirectorshipVerificationReports', () => {
        directorshipVerificationReportComponentsPage.clickOnCreateButton();
        directorshipVerificationReportUpdatePage.setDirectorshipVerifiedInput('directorshipVerified');
        expect(directorshipVerificationReportUpdatePage.getDirectorshipVerifiedInput()).toMatch('directorshipVerified');
        directorshipVerificationReportUpdatePage.setDirectorshipFindingsInput('directorshipFindings');
        expect(directorshipVerificationReportUpdatePage.getDirectorshipFindingsInput()).toMatch('directorshipFindings');
        directorshipVerificationReportUpdatePage.setDirectorshipVerifiedByInput('directorshipVerifiedBy');
        expect(directorshipVerificationReportUpdatePage.getDirectorshipVerifiedByInput()).toMatch('directorshipVerifiedBy');
        directorshipVerificationReportUpdatePage.setDirectorshipVerifiedDateInput('directorshipVerifiedDate');
        expect(directorshipVerificationReportUpdatePage.getDirectorshipVerifiedDateInput()).toMatch('directorshipVerifiedDate');
        directorshipVerificationReportUpdatePage.save();
        expect(directorshipVerificationReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
