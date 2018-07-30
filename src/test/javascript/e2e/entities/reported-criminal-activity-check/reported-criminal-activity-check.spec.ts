import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    ReportedCriminalActivityCheckComponentsPage,
    ReportedCriminalActivityCheckUpdatePage
} from './reported-criminal-activity-check.page-object';

describe('ReportedCriminalActivityCheck e2e test', () => {
    let navBarPage: NavBarPage;
    let reportedCriminalActivityCheckUpdatePage: ReportedCriminalActivityCheckUpdatePage;
    let reportedCriminalActivityCheckComponentsPage: ReportedCriminalActivityCheckComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ReportedCriminalActivityChecks', () => {
        navBarPage.goToEntity('reported-criminal-activity-check');
        reportedCriminalActivityCheckComponentsPage = new ReportedCriminalActivityCheckComponentsPage();
        expect(reportedCriminalActivityCheckComponentsPage.getTitle()).toMatch(
            /pangeodataJHipsterApp.reportedCriminalActivityCheck.home.title/
        );
    });

    it('should load create ReportedCriminalActivityCheck page', () => {
        reportedCriminalActivityCheckComponentsPage.clickOnCreateButton();
        reportedCriminalActivityCheckUpdatePage = new ReportedCriminalActivityCheckUpdatePage();
        expect(reportedCriminalActivityCheckUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.reportedCriminalActivityCheck.home.createOrEditLabel/
        );
        reportedCriminalActivityCheckUpdatePage.cancel();
    });

    it('should create and save ReportedCriminalActivityChecks', () => {
        reportedCriminalActivityCheckComponentsPage.clickOnCreateButton();
        reportedCriminalActivityCheckUpdatePage.setReportedCriminalActivityRecordFoundInput('reportedCriminalActivityRecordFound');
        expect(reportedCriminalActivityCheckUpdatePage.getReportedCriminalActivityRecordFoundInput()).toMatch(
            'reportedCriminalActivityRecordFound'
        );
        reportedCriminalActivityCheckUpdatePage.setReportedCriminalActivityVerifiedByInput('reportedCriminalActivityVerifiedBy');
        expect(reportedCriminalActivityCheckUpdatePage.getReportedCriminalActivityVerifiedByInput()).toMatch(
            'reportedCriminalActivityVerifiedBy'
        );
        reportedCriminalActivityCheckUpdatePage.setReportedCriminalActivityVerifiedDateInput('reportedCriminalActivityVerifiedDate');
        expect(reportedCriminalActivityCheckUpdatePage.getReportedCriminalActivityVerifiedDateInput()).toMatch(
            'reportedCriminalActivityVerifiedDate'
        );
        reportedCriminalActivityCheckUpdatePage.setReportedCriminalActivityRemarksInput('reportedCriminalActivityRemarks');
        expect(reportedCriminalActivityCheckUpdatePage.getReportedCriminalActivityRemarksInput()).toMatch(
            'reportedCriminalActivityRemarks'
        );
        reportedCriminalActivityCheckUpdatePage.save();
        expect(reportedCriminalActivityCheckUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
