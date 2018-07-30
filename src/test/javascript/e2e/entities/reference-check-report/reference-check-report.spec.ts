import { browser } from 'protractor';
import { NavBarPage } from './../../page-objects/jhi-page-objects';
import { ReferenceCheckReportComponentsPage, ReferenceCheckReportUpdatePage } from './reference-check-report.page-object';

describe('ReferenceCheckReport e2e test', () => {
    let navBarPage: NavBarPage;
    let referenceCheckReportUpdatePage: ReferenceCheckReportUpdatePage;
    let referenceCheckReportComponentsPage: ReferenceCheckReportComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ReferenceCheckReports', () => {
        navBarPage.goToEntity('reference-check-report');
        referenceCheckReportComponentsPage = new ReferenceCheckReportComponentsPage();
        expect(referenceCheckReportComponentsPage.getTitle()).toMatch(/pangeodataJHipsterApp.referenceCheckReport.home.title/);
    });

    it('should load create ReferenceCheckReport page', () => {
        referenceCheckReportComponentsPage.clickOnCreateButton();
        referenceCheckReportUpdatePage = new ReferenceCheckReportUpdatePage();
        expect(referenceCheckReportUpdatePage.getPageTitle()).toMatch(/pangeodataJHipsterApp.referenceCheckReport.home.createOrEditLabel/);
        referenceCheckReportUpdatePage.cancel();
    });

    it('should create and save ReferenceCheckReports', () => {
        referenceCheckReportComponentsPage.clickOnCreateButton();
        referenceCheckReportUpdatePage.setNameOfReferenceInput('nameOfReference');
        expect(referenceCheckReportUpdatePage.getNameOfReferenceInput()).toMatch('nameOfReference');
        referenceCheckReportUpdatePage.setDesignationOfReferenceInput('designationOfReference');
        expect(referenceCheckReportUpdatePage.getDesignationOfReferenceInput()).toMatch('designationOfReference');
        referenceCheckReportUpdatePage.setReferenceResponseInput('referenceResponse');
        expect(referenceCheckReportUpdatePage.getReferenceResponseInput()).toMatch('referenceResponse');
        referenceCheckReportUpdatePage.setResVerifiedDateInput('resVerifiedDate');
        expect(referenceCheckReportUpdatePage.getResVerifiedDateInput()).toMatch('resVerifiedDate');
        referenceCheckReportUpdatePage.save();
        expect(referenceCheckReportUpdatePage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});
