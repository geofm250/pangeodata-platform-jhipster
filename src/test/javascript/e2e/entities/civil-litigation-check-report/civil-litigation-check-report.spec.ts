import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import {
    CivilLitigationCheckReportComponentsPage,
    CivilLitigationCheckReportUpdatePage
} from './civil-litigation-check-report.page-object';

describe('CivilLitigationCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let civilLitigationCheckReportUpdatePage: CivilLitigationCheckReportUpdatePage;
    let civilLitigationCheckReportComponentsPage: CivilLitigationCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load CivilLitigationCheckReports', () => {
        navBarPage.goToEntity('civil-litigation-check-report');
        civilLitigationCheckReportComponentsPage = new CivilLitigationCheckReportComponentsPage();
        expect(civilLitigationCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.civilLitigationCheckReport.home.title/);
    });

    it('should load create CivilLitigationCheckReport page', () => {
        civilLitigationCheckReportComponentsPage.clickOnCreateButton();
        civilLitigationCheckReportUpdatePage = new CivilLitigationCheckReportUpdatePage();
        expect(civilLitigationCheckReportUpdatePage.getPageTitle()).toMatch(
            /pangeodataJHipsterApp.civilLitigationCheckReport.home.createOrEditLabel/
        );
        civilLitigationCheckReportUpdatePage.cancel();
    });

    it('should create and save CivilLitigationCheckReports', () => {
        civilLitigationCheckReportComponentsPage.clickOnCreateButton();
        civilLitigationCheckReportUpdatePage.setCivilRecordFoundInput('civilRecordFound');
        expect(civilLitigationCheckReportUpdatePage.getCivilRecordFoundInput()).toMatch('civilRecordFound');
        civilLitigationCheckReportUpdatePage.setCivilFindingsInput('civilFindings');
        expect(civilLitigationCheckReportUpdatePage.getCivilFindingsInput()).toMatch('civilFindings');
        civilLitigationCheckReportUpdatePage.setCivilVerifiedByInput('civilVerifiedBy');
        expect(civilLitigationCheckReportUpdatePage.getCivilVerifiedByInput()).toMatch('civilVerifiedBy');
        civilLitigationCheckReportUpdatePage.setCivilVerifiedDateInput('civilVerifiedDate');
        expect(civilLitigationCheckReportUpdatePage.getCivilVerifiedDateInput()).toMatch('civilVerifiedDate');
        civilLitigationCheckReportUpdatePage.setCivilRemarksInput('civilRemarks');
        expect(civilLitigationCheckReportUpdatePage.getCivilRemarksInput()).toMatch('civilRemarks');
        civilLitigationCheckReportUpdatePage.save();
        expect(civilLitigationCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
