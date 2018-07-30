import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { DefaultReportComponentsPage, DefaultReportUpdatePage } from './default-report.page-object';

describe('DefaultReport e2e test', () => {
    let navBarPage: NavBarPage;
    let defaultReportUpdatePage: DefaultReportUpdatePage;
    let defaultReportComponentsPage: DefaultReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load DefaultReports', () => {
        navBarPage.goToEntity('default-report');
        defaultReportComponentsPage = new DefaultReportComponentsPage();
        expect(defaultReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.defaultReport.home.title/);
    });

    it('should load create DefaultReport page', () => {
        defaultReportComponentsPage.clickOnCreateButton();
        defaultReportUpdatePage = new DefaultReportUpdatePage();
        expect(defaultReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.defaultReport.home.createOrEditLabel/);
        defaultReportUpdatePage.cancel();
    });

    it('should create and save DefaultReports', () => {
        defaultReportComponentsPage.clickOnCreateButton();
        defaultReportUpdatePage.setVerifiedByInput('verifiedBy');
        expect(defaultReportUpdatePage.getVerifiedByInput()).toMatch('verifiedBy');
        defaultReportUpdatePage.setFindingsInput('findings');
        expect(defaultReportUpdatePage.getFindingsInput()).toMatch('findings');
        defaultReportUpdatePage.setVerifiedDateInput('verifiedDate');
        expect(defaultReportUpdatePage.getVerifiedDateInput()).toMatch('verifiedDate');
        defaultReportUpdatePage.setRemarksInput('remarks');
        expect(defaultReportUpdatePage.getRemarksInput()).toMatch('remarks');
        defaultReportUpdatePage.save();
        expect(defaultReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
