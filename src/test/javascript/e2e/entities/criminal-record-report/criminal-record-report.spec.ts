import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { CriminalRecordReportComponentsPage, CriminalRecordReportUpdatePage } from './criminal-record-report.page-object';

describe('CriminalRecordReport e2e test', () => {
    let navBarPage: NavBarPage;
    let criminalRecordReportUpdatePage: CriminalRecordReportUpdatePage;
    let criminalRecordReportComponentsPage: CriminalRecordReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CriminalRecordReports', () => {
        navBarPage.goToEntity('criminal-record-report');
        criminalRecordReportComponentsPage = new CriminalRecordReportComponentsPage();
        expect(criminalRecordReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.criminalRecordReport.home.title/);
    });

    it('should load create CriminalRecordReport page', () => {
        criminalRecordReportComponentsPage.clickOnCreateButton();
        criminalRecordReportUpdatePage = new CriminalRecordReportUpdatePage();
        expect(criminalRecordReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.criminalRecordReport.home.createOrEditLabel/);
        criminalRecordReportUpdatePage.cancel();
    });

    it('should create and save CriminalRecordReports', () => {
        criminalRecordReportComponentsPage.clickOnCreateButton();
        criminalRecordReportUpdatePage.setRecordFoundInput('recordFound');
        expect(criminalRecordReportUpdatePage.getRecordFoundInput()).toMatch('recordFound');
        criminalRecordReportUpdatePage.setOffencesInput('offences');
        expect(criminalRecordReportUpdatePage.getOffencesInput()).toMatch('offences');
        criminalRecordReportUpdatePage.setVerifiedByInput('verifiedBy');
        expect(criminalRecordReportUpdatePage.getVerifiedByInput()).toMatch('verifiedBy');
        criminalRecordReportUpdatePage.setVerifiedDateInput('verifiedDate');
        expect(criminalRecordReportUpdatePage.getVerifiedDateInput()).toMatch('verifiedDate');
        criminalRecordReportUpdatePage.save();
        expect(criminalRecordReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
